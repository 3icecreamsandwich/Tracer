-- Supabase enables pg-safeupdate for API roles. Capacity sync must scope
-- its update even when disabling every currently active quota group.
begin;
create or replace function public.tracer_ai_gateway(p_action text, p_args jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  u uuid := (p_args->>'owner')::uuid; rid uuid := (p_args->>'requestId')::uuid;
  sid uuid := (p_args->>'sessionId')::uuid;
  mon date := date_trunc('month',now() at time zone 'UTC')::date;
  used_n integer; reserved_n integer; rate_n integer; retry integer := 60;
  item jsonb; r ai_private.requests%rowtype; g ai_private.groups%rowtype;
  chosen record; pressure_now boolean; recovering timestamptz; best double precision;
  estimate integer := greatest(1,coalesce((p_args->>'tokens')::integer,1));
  gid text; kid text; code integer; charged_now boolean;
begin
  -- Serialize the short admission transactions across isolates; no locks are
  -- held during provider I/O. Also makes cooldown and group choice atomic.
  perform pg_advisory_xact_lock(72590319);
  -- Lazy crash recovery plus periodic maintenance use the same cleanup path.
  update ai_private.requests set status='failed' where status='pending' and lease_until <= now();
  update ai_private.requests set result=null where expires_at <= now() and result is not null;
  delete from ai_private.sessions where seen_at < now() - interval '1 day';
  if p_action = 'sync' then
    update ai_private.groups set enabled=false where enabled=true;
    for item in select * from jsonb_array_elements(p_args->'candidates') loop
      insert into ai_private.groups(id,config,enabled) values(item->>'group',item,true)
        on conflict(id) do update set config=excluded.config, enabled=true;
      insert into ai_private.keys(id,group_id) values(item->>'id',item->>'group') on conflict(id) do update set group_id=excluded.group_id;
    end loop;
    return '{}'::jsonb;
  end if;
  update ai_private.groups set minute_at=date_trunc('minute',now()),minute_requests=0,minute_tokens=0 where minute_at < date_trunc('minute',now());
  update ai_private.groups set day_at=(date_trunc('day',now() at time zone coalesce(config->>'resetTimezone','UTC')) at time zone coalesce(config->>'resetTimezone','UTC')),day_requests=0,day_tokens=0 where day_at < (date_trunc('day',now() at time zone coalesce(config->>'resetTimezone','UTC')) at time zone coalesce(config->>'resetTimezone','UTC'));
  select max(least(
      greatest(0,1.0-day_requests::numeric/(config->>'rpd')::numeric),
      greatest(0,1.0-minute_requests::numeric/(config->>'rpm')::numeric),
      greatest(0,1.0-day_tokens::numeric/(config->>'tpd')::numeric),
      greatest(0,1.0-minute_tokens::numeric/(config->>'tpm')::numeric),
      greatest(0,1.0-(select count(*) from ai_private.requests a where a.status='pending' and a.group_id=groups.id)::numeric/(config->>'concurrency')::numeric))) into best
    from ai_private.groups where enabled and cooldown_until <= now()
    and (config->>'verifiedUntil')::timestamptz > now()
    and exists(select 1 from ai_private.keys k where k.group_id=groups.id and not k.disabled and k.model_cooldown<=now());
  select pressure,recovery_at into pressure_now,recovering from ai_private.state where id=true;
  if coalesce(best,0) < 0.2 then pressure_now:=true; recovering:=null;
  elsif pressure_now and best > 0.4 then
    recovering:=coalesce(recovering,now());
    if recovering <= now()-interval '5 minutes' then pressure_now:=false; recovering:=null; end if;
  else recovering:=null;
  end if;
  update ai_private.state set pressure=pressure_now,recovery_at=recovering where id=true;
  if p_action='maintenance' then return '{}'::jsonb; end if;
  if u is null or not exists(select 1 from auth.users where id=u) then raise exception 'Unknown account'; end if;
  insert into ai_private.months(owner,month) values(u,mon) on conflict do nothing;
  select used into used_n from ai_private.months where owner=u and month=mon;
  select count(*) into reserved_n from ai_private.requests where owner=u and month=mon and status='pending' and not charged;
  if p_action = 'usage' then
    return jsonb_build_object('limit',65,'used',used_n,'reserved',reserved_n,'remaining',greatest(0,65-used_n-reserved_n),
      'resetsAt',((mon+interval '1 month')::timestamp at time zone 'UTC'),'available',coalesce(best,0)>0,'throttled',pressure_now,'retryAfter',case when pressure_now then 60 else 0 end);
  end if;
  select * into r from ai_private.requests where owner=u and id=rid for update;
  if p_action = 'status' then
    if r.id is null then return jsonb_build_object('error','not_found'); end if;
    return jsonb_build_object('status',r.status,'charged',r.charged,'text',r.result,'expiresAt',r.expires_at);
  end if;
  if p_action = 'reserve' then
    if r.id is not null then return jsonb_build_object('error','duplicate','status',r.status,'text',r.result); end if;
    if used_n+reserved_n>=65 then return jsonb_build_object('error','monthly_limit'); end if;
    if exists(select 1 from ai_private.requests where owner=u and status='pending') then return jsonb_build_object('error','concurrent'); end if;
    select count(*) into rate_n from ai_private.requests where owner=u and created_at>now()-interval '1 minute';
    if rate_n >= (case when pressure_now then 1 else 3 end) then return jsonb_build_object('error','throttled'); end if;
    if coalesce(best,0)<=0 then return jsonb_build_object('error','unavailable'); end if;
    insert into ai_private.requests(owner,id,session_id,month,operation) values(u,rid,sid,mon,p_args->>'operation');
    return jsonb_build_object('ok',true);
  end if;
  if r.id is null or r.status <> 'pending' then return jsonb_build_object('error','not_pending'); end if;
  if p_action = 'claim' then
    if r.attempts>=3 then return jsonb_build_object('error','attempts_exhausted'); end if;
    -- Headroom is the bottleneck of request/token windows and active leases.
    -- A session preference only wins among currently admissible candidates.
    select k.id as key_id,q.id as group_id, q.config, least(
      1.0-q.minute_requests::numeric/(q.config->>'rpm')::numeric,
      1.0-q.day_requests::numeric/(q.config->>'rpd')::numeric,
      1.0-q.minute_tokens::numeric/(q.config->>'tpm')::numeric,
      1.0-q.day_tokens::numeric/(q.config->>'tpd')::numeric,
      1.0-(select count(*) from ai_private.requests a where a.status='pending' and a.group_id=q.id)::numeric/(q.config->>'concurrency')::numeric) as headroom
    into chosen from ai_private.keys k join ai_private.groups q on q.id=k.group_id
    where q.enabled and not k.disabled and k.model_cooldown<=now() and q.cooldown_until<=now()
      and (q.config->>'verifiedUntil')::timestamptz>now()
      and k.id in (select jsonb_array_elements_text(p_args->'candidateIds'))
      and q.minute_requests < (q.config->>'rpm')::integer and q.day_requests < (q.config->>'rpd')::integer
      and q.minute_tokens+estimate <= (q.config->>'tpm')::bigint and q.day_tokens+estimate <= (q.config->>'tpd')::bigint
      and estimate <= (q.config->>'context')::integer
      and (select count(*) from ai_private.requests a where a.status='pending' and a.group_id=q.id)<(q.config->>'concurrency')::integer
    order by exists(select 1 from ai_private.sessions s where s.owner=u and s.id=r.session_id and s.key_id=k.id and s.seen_at>now()-interval '30 minutes') desc,
      headroom desc,(k.id='GROQ_KEY_0') desc,k.id asc limit 1;
    if not found then return jsonb_build_object('error','unavailable'); end if;
    update ai_private.groups set minute_requests=minute_requests+1,day_requests=day_requests+1,minute_tokens=minute_tokens+estimate,day_tokens=day_tokens+estimate where id=chosen.group_id;
    update ai_private.requests set attempts=attempts+1,group_id=chosen.group_id,key_id=chosen.key_id,reserved_tokens=estimate,claim_minute=(select minute_at from ai_private.groups where id=chosen.group_id),claim_day=(select day_at from ai_private.groups where id=chosen.group_id) where owner=u and id=rid;
    insert into ai_private.sessions(owner,id,key_id) values(u,r.session_id,chosen.key_id) on conflict(owner,id) do update set key_id=excluded.key_id,seen_at=now();
    return jsonb_build_object('keyId',chosen.key_id,'attempt',r.attempts+1);
  end if;
  if p_action='report' then
    code:=coalesce((p_args->>'status')::integer,0);
    if code=401 then update ai_private.keys set disabled=true where id=r.key_id;
    elsif code in(403,404) then update ai_private.keys set model_cooldown=now()+interval '1 hour' where id=r.key_id;
    elsif code=429 then
      retry:=greatest(60,least(86400,coalesce((p_args->>'retryAfter')::integer,60)));
      update ai_private.groups set cooldown_until=now()+make_interval(secs=>retry) where id=r.group_id;
    elsif code>=500 or code=408 then update ai_private.groups set cooldown_until=now()+interval '30 seconds' where id=r.group_id;
    end if;
    -- Use actual token usage if available; otherwise retain the conservative reservation.
    if p_args->>'tokens' is not null and code=0 then
      update ai_private.groups set minute_tokens=case when minute_at=r.claim_minute then greatest(0,minute_tokens-r.reserved_tokens+estimate) else minute_tokens end,day_tokens=case when day_at=r.claim_day then greatest(0,day_tokens-r.reserved_tokens+estimate) else day_tokens end where id=r.group_id;
    end if;
    -- Only tighten locally verified ceilings using provider observations.
    if p_args->>'remainingDayRequests' is not null then
      update ai_private.groups set day_requests=greatest(day_requests,(config->>'rpd')::integer-greatest(0,(p_args->>'remainingDayRequests')::integer)) where id=r.group_id;
    end if;
    if p_args->>'remainingMinuteTokens' is not null then
      update ai_private.groups set minute_tokens=greatest(minute_tokens,(config->>'tpm')::bigint-greatest(0,(p_args->>'remainingMinuteTokens')::bigint)) where id=r.group_id;
    end if;
    update ai_private.requests set group_id=null,key_id=null,reserved_tokens=0 where owner=u and id=rid;
    return '{}'::jsonb;
  end if;
  if p_action in('charge','finish') then
    charged_now:=r.charged or coalesce((p_args->>'charge')::boolean,false);
    if charged_now and not r.charged then update ai_private.months set used=used+1 where owner=u and month=r.month; end if;
    update ai_private.requests set charged=charged_now,
      status=case when p_action='finish' then case when coalesce((p_args->>'success')::boolean,false) then 'complete' else 'failed' end else status end,
      result=case when p_action='finish' then left(p_args->>'text',262144) else result end,
      expires_at=case when p_action='finish' then now()+interval '10 minutes' else expires_at end,
      group_id=case when p_action='finish' then null else group_id end,key_id=case when p_action='finish' then null else key_id end
      where owner=u and id=rid;
    return '{}'::jsonb;
  end if;
  raise exception 'Unsupported AI accounting action';
end $$;
revoke all on function public.tracer_ai_gateway(text,jsonb) from public, anon, authenticated;
grant execute on function public.tracer_ai_gateway(text,jsonb) to service_role;
commit;
