-- Classroom dashboard operations for Tracer.
--
-- Adds a teacher-visible join code and two narrow RPCs:
--   * create_tracer_class creates the class and its teacher membership atomically.
--   * join_tracer_class lets a student join by code without exposing all classes.

begin;

alter table public.classes
  add column if not exists join_code text;

create unique index if not exists classes_active_join_code_idx
  on public.classes (join_code)
  where archived_at is null;

create index if not exists classes_created_by_idx
  on public.classes (created_by);

do $constraints$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'classes_join_code_format_check'
      and conrelid = 'public.classes'::regclass
  ) then
    alter table public.classes
      add constraint classes_join_code_format_check
      check (join_code is null or join_code ~ '^[A-F0-9]{10}$');
  end if;
end
$constraints$;

drop policy if exists "tracer_classes_insert" on public.classes;
create policy "tracer_classes_insert"
on public.classes for insert to authenticated
with check (
  created_by = (select auth.uid())
  and exists (
    select 1
    from public.user_roles as ur
    where ur.user_id = (select auth.uid())
      and ur.role in ('teacher', 'admin')
  )
);

create or replace function public.create_tracer_class(
  requested_name text,
  requested_subject text default null,
  requested_section text default null,
  requested_school_year text default null,
  requested_timezone text default 'UTC'
)
returns table (
  class_id uuid,
  class_name text,
  subject text,
  section text,
  school_year text,
  timezone text,
  join_code text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
  generated_code text;
  created_class public.classes%rowtype;
  generation_attempt integer := 0;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if not exists (
    select 1
    from public.user_roles as ur
    where ur.user_id = current_user_id
      and ur.role in ('teacher', 'admin')
  ) then
    raise exception 'Teacher account required' using errcode = '42501';
  end if;
  if nullif(pg_catalog.btrim(requested_name), '') is null then
    raise exception 'Class name is required' using errcode = '22023';
  end if;
  if pg_catalog.length(pg_catalog.btrim(requested_name)) > 120 then
    raise exception 'Class name is too long' using errcode = '22023';
  end if;

  loop
    generation_attempt := generation_attempt + 1;
    generated_code := pg_catalog.upper(
      pg_catalog.encode(extensions.gen_random_bytes(5), 'hex')
    );

    begin
      insert into public.classes (
        name,
        subject,
        section,
        school_year,
        timezone,
        join_code,
        join_code_hash,
        created_by
      )
      values (
        pg_catalog.btrim(requested_name),
        nullif(pg_catalog.btrim(requested_subject), ''),
        nullif(pg_catalog.btrim(requested_section), ''),
        nullif(pg_catalog.btrim(requested_school_year), ''),
        coalesce(nullif(pg_catalog.btrim(requested_timezone), ''), 'UTC'),
        generated_code,
        pg_catalog.encode(extensions.digest(generated_code, 'sha256'), 'hex'),
        current_user_id
      )
      returning * into created_class;
      exit;
    exception
      when unique_violation then
        if generation_attempt >= 8 then
          raise exception 'Could not generate a unique class code' using errcode = '54000';
        end if;
    end;
  end loop;

  insert into public.class_memberships (
    class_id,
    user_id,
    role,
    status,
    joined_at
  )
  values (
    created_class.id,
    current_user_id,
    'teacher',
    'active',
    pg_catalog.now()
  );

  return query
  select
    created_class.id,
    created_class.name,
    created_class.subject,
    created_class.section,
    created_class.school_year,
    created_class.timezone,
    created_class.join_code,
    created_class.created_at;
end;
$function$;

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
-- This RPC must look up a class before the caller is a member and can pass the
-- classes SELECT policy. Keep it narrowly granted and validate auth + role here.
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
  -- Use the named constraint because the RETURNS TABLE `class_id` output
  -- parameter is also a PL/pgSQL variable.
  on conflict on constraint class_memberships_pkey do nothing;

  select cm.status into membership_status
  from public.class_memberships as cm
  where cm.class_id = matched_class.id
    and cm.user_id = current_user_id;

  if membership_status <> 'active' then
    raise exception 'Class membership is not active' using errcode = '42501';
  end if;

  -- Assignments snapshot their recipient list when they are published. A
  -- student joining later must receive the same access without requiring the
  -- teacher to remove and reassign every set.
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

revoke all on function public.create_tracer_class(text, text, text, text, text)
  from public, anon;
grant execute on function public.create_tracer_class(text, text, text, text, text)
  to authenticated;

revoke all on function public.join_tracer_class(text) from public, anon;
grant execute on function public.join_tracer_class(text) to authenticated;

commit;
