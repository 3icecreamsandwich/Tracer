-- Account-scoped study data is stored for at most fourteen days.
create table public.study_daily_time (
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid not null,
  study_day date not null,
  seconds integer not null check (seconds between 0 and 86400),
  primary key (user_id, device_id, study_day)
);
create table public.study_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  id uuid not null,
  set_id text not null,
  mode text not null check (mode in ('practice', 'test', 'match', 'flashcards')),
  started_at timestamptz not null,
  ended_at timestamptz not null,
  duration_seconds integer not null check (duration_seconds between 0 and 14400),
  correct_count integer not null check (correct_count >= 0),
  attempted_count integer not null check (attempted_count >= correct_count),
  primary key (user_id, id)
);
create index study_sessions_user_ended_idx on public.study_sessions (user_id, ended_at desc);
alter table public.study_daily_time enable row level security;
alter table public.study_sessions enable row level security;
revoke all on public.study_daily_time, public.study_sessions from anon, authenticated;
grant select, insert, update, delete on public.study_daily_time, public.study_sessions to authenticated;
create policy study_time_owner on public.study_daily_time for all to authenticated
  using ((select auth.uid()) = user_id and study_day >= current_date - 13)
  with check ((select auth.uid()) = user_id and study_day >= current_date - 13 and study_day <= current_date + 1);
create policy study_session_owner on public.study_sessions for all to authenticated
  using ((select auth.uid()) = user_id and ended_at >= now() - interval '14 days')
  with check ((select auth.uid()) = user_id and ended_at >= now() - interval '14 days' and ended_at <= now() + interval '1 day');

create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule('tracer-study-retention', '15 * * * *', $$
  delete from public.study_sessions where ended_at < now() - interval '14 days';
  delete from public.study_daily_time where study_day < current_date - 13;
$$);

-- Popularity is based on distinct device/day opens, not publication recency.
create schema if not exists private;
create table private.published_set_opens (
  set_id uuid not null references public.published_sets(id) on delete cascade,
  device_id uuid not null,
  opened_on date not null default current_date,
  primary key (set_id, device_id, opened_on)
);
revoke all on private.published_set_opens from public, anon, authenticated;
create function public.record_published_set_open(p_set_id uuid, p_device_id uuid)
returns void language sql security definer set search_path = '' as $$
  insert into private.published_set_opens (set_id, device_id)
  select id, p_device_id from public.published_sets where id = p_set_id
  on conflict do nothing;
$$;
revoke all on function public.record_published_set_open(uuid, uuid) from public;
grant execute on function public.record_published_set_open(uuid, uuid) to anon, authenticated;
create function public.popular_published_sets()
returns table (topic text, id uuid, title text, description text, publisher_name text,
 publisher_username text, publisher_is_dev boolean, tags text[], allow_copying boolean,
 card_count integer, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
  with popularity as (
    select s.id, count(o.set_id) as opens from public.published_sets s
    left join private.published_set_opens o on o.set_id = s.id group by s.id
  ), topics as (
    select tag, sum(p.opens) as opens, count(*) as set_count
    from public.published_sets s join popularity p on p.id = s.id
    cross join lateral unnest(s.tags) tag
    where tag = any(array['world-language','english','history','math','science','coding'])
    group by tag order by opens desc, set_count desc, tag limit 4
  ), ranked as (
    select t.tag, t.opens as topic_opens, t.set_count, s.*, p.opens,
      row_number() over (partition by t.tag order by p.opens desc, s.created_at desc, s.id desc) as rank
    from topics t join public.published_sets s on t.tag = any(s.tags)
    join popularity p on p.id = s.id
  )
  select r.tag, r.id, r.title, r.description, r.publisher_name, r.publisher_username,
    r.publisher_is_dev, r.tags, r.allow_copying, r.card_count, r.created_at
  from ranked r where r.rank <= 8 order by r.topic_opens desc, r.set_count desc, r.tag, r.rank;
$$;
revoke all on function public.popular_published_sets() from public;
grant execute on function public.popular_published_sets() to anon, authenticated;
