-- Repair class joining and give late-joining students access to all existing
-- published assignments in the same transaction.

begin;

create or replace function public.join_tracer_class(requested_code text)
returns table (
  class_id uuid,
  class_name text,
  subject text,
  section text,
  school_year text,
  timezone text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
  normalized_code text;
  matched_class public.classes%rowtype;
  membership_status text;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if not exists (
    select 1
    from public.user_roles as ur
    where ur.user_id = current_user_id
      and ur.role = 'student'
  ) then
    raise exception 'Student account required' using errcode = '42501';
  end if;

  normalized_code := pg_catalog.upper(
    pg_catalog.regexp_replace(coalesce(requested_code, ''), '[^A-Za-z0-9]', '', 'g')
  );
  if normalized_code !~ '^[A-F0-9]{10}$' then
    raise exception 'Class code not found' using errcode = 'P0002';
  end if;

  select c.* into matched_class
  from public.classes as c
  where c.join_code = normalized_code
    and c.archived_at is null;

  if matched_class.id is null then
    raise exception 'Class code not found' using errcode = 'P0002';
  end if;

  insert into public.class_memberships (
    class_id,
    user_id,
    role,
    status,
    joined_at
  )
  values (
    matched_class.id,
    current_user_id,
    'student',
    'active',
    pg_catalog.now()
  )
  on conflict on constraint class_memberships_pkey do nothing;

  select cm.status into membership_status
  from public.class_memberships as cm
  where cm.class_id = matched_class.id
    and cm.user_id = current_user_id;

  if membership_status <> 'active' then
    raise exception 'Class membership is not active' using errcode = '42501';
  end if;

  insert into public.assignment_recipients (
    assignment_id,
    student_id,
    assigned_at,
    status
  )
  select
    assignment.id,
    current_user_id,
    pg_catalog.now(),
    'assigned'
  from public.assignments as assignment
  where assignment.class_id = matched_class.id
    and assignment.status = 'published'
  on conflict on constraint assignment_recipients_pkey do nothing;

  return query
  select
    matched_class.id,
    matched_class.name,
    matched_class.subject,
    matched_class.section,
    matched_class.school_year,
    matched_class.timezone,
    matched_class.created_at;
end;
$function$;

revoke all on function public.join_tracer_class(text) from public, anon;
grant execute on function public.join_tracer_class(text) to authenticated;

commit;
