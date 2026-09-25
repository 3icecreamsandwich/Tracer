begin;
alter table public.user_roles drop constraint user_roles_role_check;
alter table public.user_roles add constraint user_roles_role_check
  check (role in ('student', 'teacher', 'admin', 'super'));

-- Only an administrator can enroll the verified, existing account. A recreated
-- account with the same email does not inherit the privilege.
create table private.super_account (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null check (email = '3icecreamsandwich@gmail.com'),
  singleton boolean not null default true unique check (singleton)
);
alter table private.super_account enable row level security;
revoke all on private.super_account from public, anon, authenticated;

create function private.enforce_super_account()
returns trigger language plpgsql security definer set search_path = ''
as $function$
begin
  if new.role = 'super' and not exists (
    select 1 from private.super_account s join auth.users u on u.id = s.user_id
    where s.user_id = new.user_id and lower(u.email) = s.email
      and u.email_confirmed_at is not null
  ) then
    raise exception 'Super account is restricted' using errcode = '42501';
  end if;
  return new;
end;
$function$;
revoke all on function private.enforce_super_account() from public, anon, authenticated;
create trigger enforce_super_account before insert or update on public.user_roles
for each row execute function private.enforce_super_account();

-- Revoke the role if the enrolled identity changes its email.
create function private.revoke_changed_super_account()
returns trigger language plpgsql security definer set search_path = ''
as $function$
begin
  if lower(new.email) is distinct from '3icecreamsandwich@gmail.com'
     or new.email_confirmed_at is null then
    update public.user_roles set role = 'teacher' where user_id = new.id and role = 'super';
  end if;
  return new;
end;
$function$;
revoke all on function private.revoke_changed_super_account() from public, anon, authenticated;
create trigger revoke_changed_super_account after update of email, email_confirmed_at on auth.users
for each row execute function private.revoke_changed_super_account();

CREATE OR REPLACE FUNCTION public.create_tracer_class(requested_name text, requested_subject text DEFAULT NULL::text, requested_section text DEFAULT NULL::text, requested_school_year text DEFAULT NULL::text, requested_timezone text DEFAULT 'UTC'::text)
 RETURNS TABLE(class_id uuid, class_name text, subject text, section text, school_year text, timezone text, join_code text, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
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
      and ur.role in ('teacher', 'admin', 'super')
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
$function$
;
CREATE OR REPLACE FUNCTION public.join_tracer_class(requested_code text)
 RETURNS TABLE(class_id uuid, class_name text, subject text, section text, school_year text, timezone text, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
      and ur.role in ('student', 'super')
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
$function$
;

alter policy tracer_classes_insert on public.classes with check (
  created_by = (select auth.uid()) and exists (
    select 1 from public.user_roles ur where ur.user_id = (select auth.uid())
      and ur.role in ('teacher', 'admin', 'super')
  )
);
alter policy tracer_classes_delete on public.classes using (
  created_by = (select auth.uid()) and exists (
    select 1 from public.user_roles ur where ur.user_id = (select auth.uid())
      and ur.role in ('teacher', 'admin', 'super')
  )
);
-- Support deployments that installed the stricter repository RLS baseline.
do $block$
begin
  if to_regprocedure('private.user_has_role(uuid,text)') is not null then
    execute $definition$
      create or replace function private.user_has_role(target_user_id uuid, expected_role text)
      returns boolean language sql stable security definer set search_path = pg_catalog
      as $body$
        select exists (
          select 1 from public.user_roles ur where ur.user_id = target_user_id
          and (ur.role = expected_role or (ur.role = 'admin' and expected_role = 'teacher')
            or (ur.role = 'super' and expected_role in ('student', 'teacher')))
        );
      $body$
    $definition$;
  end if;
end;
$block$;
commit;
