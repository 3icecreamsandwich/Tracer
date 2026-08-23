-- Scored classroom study sessions and teacher progress reporting.
--
-- `attempts.assignment_id` remains the normalized path to a class. Keeping
-- class_id out of attempts avoids a duplicated relationship that could drift.

begin;

alter table public.attempts
  add column if not exists mode text;

do $constraints$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'attempts_mode_check'
      and conrelid = 'public.attempts'::regclass
  ) then
    alter table public.attempts
      add constraint attempts_mode_check
      check (mode is null or mode in ('flashcards', 'practice', 'match', 'test'));
  end if;
end
$constraints$;

create index if not exists attempts_assignment_student_submitted_idx
  on public.attempts (assignment_id, student_id, submitted_at desc)
  where status in ('submitted', 'graded');

create or replace function public.submit_tracer_assignment_attempt(
  requested_assignment_id uuid,
  requested_client_attempt_id uuid,
  requested_mode text,
  requested_started_at timestamptz,
  requested_submitted_at timestamptz,
  requested_score_earned numeric,
  requested_score_possible numeric,
  requested_duration_seconds integer
)
returns table (
  attempt_id uuid,
  attempt_number integer,
  submitted_at timestamptz
)
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
  if requested_score_possible is null or requested_score_possible <= 0
    or requested_score_earned is null or requested_score_earned < 0
    or requested_score_earned > requested_score_possible then
    raise exception 'Attempt score is invalid' using errcode = '22023';
  end if;
  if requested_duration_seconds is null
    or requested_duration_seconds < 0
    or requested_duration_seconds > 604800 then
    raise exception 'Attempt duration is invalid' using errcode = '22023';
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
    and (a.closes_at is null or requested_submitted_at <= a.closes_at)
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
    assignment_id,
    student_id,
    attempt_number,
    status,
    started_at,
    submitted_at,
    last_activity_at,
    score_earned,
    score_possible,
    duration_seconds,
    client_attempt_id,
    mode
  )
  values (
    requested_assignment_id,
    current_user_id,
    next_attempt_number,
    'submitted',
    requested_started_at,
    requested_submitted_at,
    requested_submitted_at,
    requested_score_earned,
    requested_score_possible,
    requested_duration_seconds,
    requested_client_attempt_id,
    normalized_mode
  )
  returning * into created_attempt;

  return query
  select created_attempt.id, created_attempt.attempt_number, created_attempt.submitted_at;
end;
$function$;

revoke all on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer
) from public, anon;
grant execute on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer
) to authenticated;

create or replace function public.list_tracer_class_progress(requested_class_id uuid)
returns table (
  student_id uuid,
  display_name text,
  assignment_id uuid,
  assignment_title text,
  attempt_id uuid,
  mode text,
  score_earned numeric,
  score_possible numeric,
  accuracy_percent numeric,
  submitted_at timestamptz,
  duration_seconds integer,
  attempt_count bigint,
  best_accuracy_percent numeric
)
language plpgsql
stable
security invoker
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
    from public.class_memberships as teacher_membership
    where teacher_membership.class_id = requested_class_id
      and teacher_membership.user_id = current_user_id
      and teacher_membership.role = 'teacher'
      and teacher_membership.status = 'active'
  ) then
    raise exception 'Teacher access required' using errcode = '42501';
  end if;

  return query
  select
    student_membership.user_id,
    profile.display_name,
    assignment.id,
    assignment.title,
    latest_attempt.id,
    latest_attempt.mode,
    latest_attempt.score_earned,
    latest_attempt.score_possible,
    latest_attempt.accuracy_percent,
    latest_attempt.submitted_at,
    latest_attempt.duration_seconds,
    coalesce(attempt_summary.attempt_count, 0),
    attempt_summary.best_accuracy_percent
  from public.class_memberships as student_membership
  join public.profiles as profile
    on profile.id = student_membership.user_id
  join public.assignments as assignment
    on assignment.class_id = student_membership.class_id
   and assignment.status = 'published'
  join public.assignment_recipients as recipient
    on recipient.assignment_id = assignment.id
   and recipient.student_id = student_membership.user_id
   and recipient.status = 'assigned'
  left join lateral (
    select
      attempt.id,
      attempt.mode,
      attempt.score_earned,
      attempt.score_possible,
      attempt.submitted_at,
      attempt.duration_seconds,
      pg_catalog.round(
        (attempt.score_earned / nullif(attempt.score_possible, 0)) * 100,
        2
      ) as accuracy_percent
    from public.attempts as attempt
    where attempt.assignment_id = assignment.id
      and attempt.student_id = student_membership.user_id
      and attempt.status in ('submitted', 'graded')
    order by attempt.submitted_at desc, attempt.created_at desc
    limit 1
  ) as latest_attempt on true
  left join lateral (
    select
      pg_catalog.count(*) as attempt_count,
      pg_catalog.round(
        pg_catalog.max(
          (attempt.score_earned / nullif(attempt.score_possible, 0)) * 100
        ),
        2
      ) as best_accuracy_percent
    from public.attempts as attempt
    where attempt.assignment_id = assignment.id
      and attempt.student_id = student_membership.user_id
      and attempt.status in ('submitted', 'graded')
  ) as attempt_summary on true
  where student_membership.class_id = requested_class_id
    and student_membership.role = 'student'
    and student_membership.status = 'active'
  order by profile.display_name, assignment.created_at desc;
end;
$function$;

revoke all on function public.list_tracer_class_progress(uuid) from public, anon;
grant execute on function public.list_tracer_class_progress(uuid) to authenticated;

commit;
