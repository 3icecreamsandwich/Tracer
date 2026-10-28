-- Run only in tracer-ai-test. Synthetic users and all accounting changes roll
-- back together. No provider credentials or real prompts enter this test.
begin;
do $$
declare
  u uuid := gen_random_uuid(); other_u uuid := gen_random_uuid();
  sid uuid := gen_random_uuid(); rid uuid := gen_random_uuid(); other_rid uuid;
  args jsonb; response jsonb; capacities jsonb;
begin
  insert into auth.users(id) values(u),(other_u);
  capacities := jsonb_build_array(
    jsonb_build_object('id','GROQ_KEY_0','group','groq:staging-check','provider','groq','model','fixture','rpm',100,'rpd',1000,'tpm',100000,'tpd',1000000,'concurrency',10,'context',100000,'verifiedUntil','2099-01-01T00:00:00Z'),
    jsonb_build_object('id','GROQ_KEY_1','group','groq:staging-check','provider','groq','model','fixture','rpm',100,'rpd',1000,'tpm',100000,'tpd',1000000,'concurrency',10,'context',100000,'verifiedUntil','2099-01-01T00:00:00Z')
  );
  perform public.tracer_ai_gateway('sync',jsonb_build_object('candidates',capacities));
  args := jsonb_build_object('owner',u,'requestId',rid,'sessionId',sid,'operation','chat');
  if public.tracer_ai_gateway('reserve',args)->>'ok' is distinct from 'true' then raise exception 'reserve failed'; end if;
  if public.tracer_ai_gateway('reserve',args)->>'error' is distinct from 'duplicate' then raise exception 'idempotency failed'; end if;
  if public.tracer_ai_gateway('reserve',args||jsonb_build_object('requestId',gen_random_uuid()))->>'error' is distinct from 'concurrent' then raise exception 'concurrency failed'; end if;
  response := public.tracer_ai_gateway('claim',args||jsonb_build_object('tokens',100,'candidateIds',jsonb_build_array('GROQ_KEY_0','GROQ_KEY_1')));
  if response->>'keyId' is distinct from 'GROQ_KEY_0' then raise exception 'tie preference failed'; end if;
  perform public.tracer_ai_gateway('charge',args||'{"charge":true}'::jsonb);
  perform public.tracer_ai_gateway('charge',args||'{"charge":true}'::jsonb);
  perform public.tracer_ai_gateway('finish',args||'{"charge":true,"success":true,"text":"synthetic check"}'::jsonb);
  if (public.tracer_ai_gateway('usage',args)->>'used')::int is distinct from 1 then raise exception 'exactly-once charge failed'; end if;
  if public.tracer_ai_gateway('status',args||jsonb_build_object('owner',other_u))->>'error' is distinct from 'not_found' then raise exception 'owner isolation failed'; end if;
  update ai_private.requests set expires_at=now()-interval '1 second' where owner=u;
  if public.tracer_ai_gateway('status',args)->>'text' is not null then raise exception 'result expiry failed'; end if;

  other_rid := gen_random_uuid(); args := args||jsonb_build_object('requestId',other_rid);
  perform public.tracer_ai_gateway('reserve',args);
  perform public.tracer_ai_gateway('finish',args||'{"charge":false,"success":false}'::jsonb);
  if (public.tracer_ai_gateway('usage',args)->>'used')::int is distinct from 1 then raise exception 'refund failed'; end if;
  args := args||jsonb_build_object('requestId',gen_random_uuid());
  perform public.tracer_ai_gateway('reserve',args);
  update ai_private.requests set lease_until=now()-interval '1 second' where owner=u and status='pending';
  if (public.tracer_ai_gateway('usage',args)->>'reserved')::int is distinct from 0 then raise exception 'crash recovery failed'; end if;

  update ai_private.requests set created_at=now()-interval '2 minutes' where owner=u;
  update ai_private.months set used=64 where owner=u;
  args := args||jsonb_build_object('requestId',gen_random_uuid());
  if public.tracer_ai_gateway('reserve',args)->>'ok' is distinct from 'true' then raise exception 'final allowance reservation failed'; end if;
  perform public.tracer_ai_gateway('finish',args||'{"charge":true,"success":true,"text":"last"}'::jsonb);
  if public.tracer_ai_gateway('reserve',args||jsonb_build_object('requestId',gen_random_uuid()))->>'error' is distinct from 'monthly_limit' then raise exception 'monthly cap failed'; end if;
  update ai_private.months set month=(month-interval '1 month')::date where owner=u;
  if (public.tracer_ai_gateway('usage',args)->>'used')::int is distinct from 0 then raise exception 'month rollover failed'; end if;

  args := jsonb_build_object('owner',other_u,'requestId',gen_random_uuid(),'sessionId',sid,'operation','chat');
  perform public.tracer_ai_gateway('reserve',args);
  perform public.tracer_ai_gateway('claim',args||jsonb_build_object('tokens',100,'candidateIds',jsonb_build_array('GROQ_KEY_0','GROQ_KEY_1')));
  perform public.tracer_ai_gateway('report',args||'{"status":401}'::jsonb);
  if public.tracer_ai_gateway('claim',args||jsonb_build_object('tokens',100,'candidateIds',jsonb_build_array('GROQ_KEY_0','GROQ_KEY_1')))->>'keyId' is distinct from 'GROQ_KEY_1' then raise exception 'invalid credential isolation failed'; end if;
  perform public.tracer_ai_gateway('report',args||'{"status":429,"retryAfter":120}'::jsonb);
  if public.tracer_ai_gateway('claim',args||jsonb_build_object('tokens',100,'candidateIds',jsonb_build_array('GROQ_KEY_0','GROQ_KEY_1')))->>'error' is distinct from 'unavailable' then raise exception 'shared quota cooldown failed'; end if;

  if has_function_privilege('anon','public.tracer_ai_gateway(text,jsonb)','EXECUTE') or has_function_privilege('authenticated','public.tracer_ai_gateway(text,jsonb)','EXECUTE') then raise exception 'client facade access leaked'; end if;
  if exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='ai_private' and c.relkind='r' and (not c.relrowsecurity or has_table_privilege('anon',c.oid,'SELECT') or has_table_privilege('authenticated',c.oid,'SELECT'))) then raise exception 'private tables exposed'; end if;
end $$;
rollback;
select 'passed' as staging_accounting_checks, 'all synthetic changes rolled back' as cleanup;
