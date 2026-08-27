-- Persist millisecond-precise assigned Match results and expose the six fastest
-- completed students to active recipients of the same assignment.

begin;

alter table public.attempts
  add column if not exists duration_ms integer,
  add column if not exists completed boolean not null default false;

do $constraints$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'attempts_duration_ms_check'
      and conrelid = 'public.attempts'::regclass
  ) then
    alter table public.attempts
      add constraint attempts_duration_ms_check
      check (duration_ms is null or duration_ms between 0 and 604800000);
  end if;
end
$constraints$;

create index if not exists attempts_match_leaderboard_idx
  on public.attempts (assignment_id, duration_ms, submitted_at, student_id)
  where mode = 'match'
    and completed
    and duration_ms is not null
    and status in ('submitted', 'graded');

create or replace function public.submit_tracer_assignment_attempt(
  requested_assignment_id uuid,
  requested_client_attempt_id uuid,
  requested_mode text,
  requested_started_at timestamptz,
  requested_submitted_at timestamptz,
  requested_score_earned numeric,
  requested_score_possible numeric,
  requested_duration_seconds integer,
  requested_duration_ms integer,
  requested_completed boolean
)
returns table (attempt_id uuid, attempt_number integer, submitted_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
  normalized_mode text := pg_catalog.lower(pg_catalog.btrim(requested_mode));
  effective_attempt_limit integer;
  existing_attempt public.attempts%rowtype;
  created_attempt public.attempts%rowtype;
  next_attempt_number integer;
  timestamp_duration_ms numeric;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if requested_assignment_id is null or requested_client_attempt_id is null then
    raise exception 'Assignment and client attempt IDs are required' using errcode = '22023';
  end if;
  if normalized_mode is null
    or normalized_mode not in ('flashcards', 'practice', 'match', 'test') then
    raise exception 'Unsupported study mode' using errcode = '22023';
  end if;
  if requested_started_at is null or requested_submitted_at is null
    or requested_submitted_at < requested_started_at
    or requested_submitted_at > pg_catalog.now() + interval '5 minutes' then
    raise exception 'Attempt timestamps are invalid' using errcode = '22023';
  end if;
  if requested_score_possible is null or requested_score_possible < 0
    or requested_score_earned is null or requested_score_earned < 0
    or requested_score_earned > requested_score_possible then
    raise exception 'Attempt score is invalid' using errcode = '22023';
  end if;
  if requested_duration_seconds is null
    or requested_duration_seconds < 0
    or requested_duration_seconds > 604800
    or requested_duration_ms is null
    or requested_duration_ms < 0
    or requested_duration_ms > 604800000
    or requested_completed is null then
    raise exception 'Attempt duration is invalid' using errcode = '22023';
  end if;

  timestamp_duration_ms := pg_catalog.date_part(
    'epoch', requested_submitted_at - requested_started_at
  ) * 1000;
  if pg_catalog.abs(timestamp_duration_ms - requested_duration_ms) > 2000 then
    raise exception 'Attempt duration does not match its timestamps' using errcode = '22023';
  end if;
  if normalized_mode = 'match' and requested_completed and requested_score_possible <= 0 then
    raise exception 'A completed match must include attempts' using errcode = '22023';
  end if;

  select att.*
  into existing_attempt
  from public.attempts as att
  where att.student_id = current_user_id
    and att.client_attempt_id = requested_client_attempt_id;

  if found then
    if existing_attempt.assignment_id <> requested_assignment_id then
      raise exception 'Client attempt ID belongs to another assignment' using errcode = '23505';
    end if;
    return query
    select existing_attempt.id, existing_attempt.attempt_number, existing_attempt.submitted_at;
    return;
  end if;

  select coalesce(ar.attempt_limit_override, a.attempt_limit)
  into effective_attempt_limit
  from public.assignments as a
  join public.assignment_recipients as ar
    on ar.assignment_id = a.id
   and ar.student_id = current_user_id
   and ar.status = 'assigned'
  join public.class_memberships as student_membership
    on student_membership.class_id = a.class_id
   and student_membership.user_id = current_user_id
   and student_membership.role = 'student'
   and student_membership.status = 'active'
  where a.id = requested_assignment_id
    and a.status = 'published'
    and (a.available_at is null or a.available_at <= requested_started_at)
    and (
      a.closes_at is null
      or requested_started_at <= a.closes_at
      or requested_submitted_at <= a.closes_at
    )
    and (a.mode = 'any' or a.mode = normalized_mode);

  if not found then
    raise exception 'Assignment is unavailable to this student' using errcode = '42501';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(current_user_id::text || ':' || requested_assignment_id::text, 0)
  );

  if effective_attempt_limit is not null and (
    select pg_catalog.count(*)
    from public.attempts as att
    where att.student_id = current_user_id
      and att.assignment_id = requested_assignment_id
      and att.status in ('submitted', 'graded')
  ) >= effective_attempt_limit then
    raise exception 'Attempt limit reached' using errcode = '42501';
  end if;

  select coalesce(pg_catalog.max(att.attempt_number), 0) + 1
  into next_attempt_number
  from public.attempts as att
  where att.student_id = current_user_id
    and att.assignment_id = requested_assignment_id;

  insert into public.attempts (
    assignment_id, student_id, attempt_number, status, started_at, submitted_at,
    last_activity_at, score_earned, score_possible, duration_seconds,
    duration_ms, completed, client_attempt_id, mode
  )
  values (
    requested_assignment_id, current_user_id, next_attempt_number, 'submitted',
    requested_started_at, requested_submitted_at, requested_submitted_at,
    requested_score_earned, requested_score_possible, requested_duration_seconds,
    requested_duration_ms, requested_completed, requested_client_attempt_id,
    normalized_mode
  )
  returning * into created_attempt;

  return query
  select created_attempt.id, created_attempt.attempt_number, created_attempt.submitted_at;
end;
$function$;

revoke all on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) from public, anon;
grant execute on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) to authenticated;

create or replace function private.list_tracer_assignment_match_leaderboard(
  requested_assignment_id uuid
)
returns table (
  leaderboard_rank bigint,
  student_id uuid,
  display_name text,
  avatar_path text,
  duration_ms integer,
  submitted_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if not exists (
    select 1
    from public.assignments as assignment
    join public.assignment_recipients as recipient
      on recipient.assignment_id = assignment.id
     and recipient.student_id = current_user_id
     and recipient.status = 'assigned'
    join public.class_memberships as membership
      on membership.class_id = assignment.class_id
     and membership.user_id = current_user_id
     and membership.role = 'student'
     and membership.status = 'active'
    where assignment.id = requested_assignment_id
      and assignment.status = 'published'
  ) then
    raise exception 'Assignment access required' using errcode = '42501';
  end if;

  return query
  with best_by_student as (
    select distinct on (attempt.student_id)
      attempt.student_id,
      attempt.duration_ms,
      attempt.submitted_at
    from public.attempts as attempt
    join public.assignment_recipients as recipient
      on recipient.assignment_id = attempt.assignment_id
     and recipient.student_id = attempt.student_id
     and recipient.status = 'assigned'
    where attempt.assignment_id = requested_assignment_id
      and attempt.mode = 'match'
      and attempt.completed
      and attempt.duration_ms is not null
      and attempt.status in ('submitted', 'graded')
    order by attempt.student_id, attempt.duration_ms, attempt.submitted_at
  )
  select
    pg_catalog.row_number() over (
      order by best.duration_ms, best.submitted_at, best.student_id
    ),
    best.student_id,
    profile.display_name,
    profile.avatar_path,
    best.duration_ms,
    best.submitted_at
  from best_by_student as best
  join public.profiles as profile on profile.id = best.student_id
  order by best.duration_ms, best.submitted_at, best.student_id
  limit 6;
end;
$function$;

revoke all on function private.list_tracer_assignment_match_leaderboard(uuid)
  from public, anon;
grant execute on function private.list_tracer_assignment_match_leaderboard(uuid)
  to authenticated;

create or replace function public.list_tracer_assignment_match_leaderboard(
  requested_assignment_id uuid
)
returns table (
  leaderboard_rank bigint,
  student_id uuid,
  display_name text,
  avatar_path text,
  duration_ms integer,
  submitted_at timestamptz
)
language sql
stable
security invoker
set search_path = ''
as $function$
  select *
  from private.list_tracer_assignment_match_leaderboard(requested_assignment_id);
$function$;

revoke all on function public.list_tracer_assignment_match_leaderboard(uuid)
  from public, anon;
grant execute on function public.list_tracer_assignment_match_leaderboard(uuid)
  to authenticated;

commit;
