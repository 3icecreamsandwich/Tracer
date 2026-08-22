-- Replace the reporting function after correcting NULLIF SQL syntax.

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
