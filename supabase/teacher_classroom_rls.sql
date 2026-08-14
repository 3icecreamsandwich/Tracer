-- Tracer teacher/classroom Row Level Security baseline for Supabase.
--
-- Prerequisites (all in public):
--   profiles, subscriptions, classes, class_memberships, sets, set_versions,
--   assignments, assignment_recipients, attempts, attempt_answers, set_assets
--
-- Assumptions:
--   * profiles.id and all user columns reference auth.users.id.
--   * every published assignment has explicit assignment_recipients rows.
--   * set_versions are immutable.
--   * clients cannot write billing state, grades, or teacher overrides directly.
--   * the private Storage bucket is named set-assets.
--
-- Apply with the Supabase SQL Editor or as a migration after the tables above
-- exist. Run this first in a development project and test every role boundary.

begin;

do $prerequisites$
declare
  missing_table text;
begin
  foreach missing_table in array array[
    'profiles',
    'subscriptions',
    'classes',
    'class_memberships',
    'sets',
    'set_versions',
    'assignments',
    'assignment_recipients',
    'attempts',
    'attempt_answers',
    'set_assets'
  ]
  loop
    if pg_catalog.to_regclass('public.' || missing_table) is null then
      raise exception 'Missing prerequisite table: public.%', missing_table;
    end if;
  end loop;
end
$prerequisites$;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- SECURITY DEFINER is intentional here: these helpers inspect RLS-protected
-- relationship tables without recursively invoking their policies. They live
-- in a non-exposed schema, bind authorization to auth.uid(), use a locked
-- search_path, and receive only explicit EXECUTE grants below.

create or replace function private.is_class_member(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.class_memberships as cm
      where cm.class_id = target_class_id
        and cm.user_id = (select auth.uid())
        and cm.status = 'active'
    );
$function$;

create or replace function private.is_class_teacher(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.class_memberships as cm
      where cm.class_id = target_class_id
        and cm.user_id = (select auth.uid())
        and cm.role = 'teacher'
        and cm.status = 'active'
    );
$function$;

create or replace function private.can_manage_class(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.classes as c
      where c.id = target_class_id
        and (
          c.created_by = (select auth.uid())
          or exists (
            select 1
            from public.class_memberships as cm
            where cm.class_id = c.id
              and cm.user_id = (select auth.uid())
              and cm.role = 'teacher'
              and cm.status = 'active'
          )
        )
    );
$function$;

create or replace function private.shares_class_with(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.class_memberships as mine
      join public.class_memberships as theirs
        on theirs.class_id = mine.class_id
      where mine.user_id = (select auth.uid())
        and mine.status = 'active'
        and theirs.user_id = target_user_id
        and theirs.status = 'active'
    );
$function$;

create or replace function private.can_read_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.assignments as a
      where a.id = target_assignment_id
        and (
          a.created_by = (select auth.uid())
          or exists (
            select 1
            from public.class_memberships as cm
            where cm.class_id = a.class_id
              and cm.user_id = (select auth.uid())
              and cm.role = 'teacher'
              and cm.status = 'active'
          )
          or (
            a.status in ('published', 'closed')
            and exists (
              select 1
              from public.assignment_recipients as ar
              where ar.assignment_id = a.id
                and ar.student_id = (select auth.uid())
                and ar.status = 'assigned'
            )
          )
        )
    );
$function$;

create or replace function private.can_manage_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.assignments as a
      where a.id = target_assignment_id
        and (
          a.created_by = (select auth.uid())
          or exists (
            select 1
            from public.class_memberships as cm
            where cm.class_id = a.class_id
              and cm.user_id = (select auth.uid())
              and cm.role = 'teacher'
              and cm.status = 'active'
          )
        )
    );
$function$;

create or replace function private.can_start_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.assignments as a
      join public.assignment_recipients as ar
        on ar.assignment_id = a.id
      where a.id = target_assignment_id
        and ar.student_id = (select auth.uid())
        and ar.status = 'assigned'
        and a.status = 'published'
        and (a.available_at is null or a.available_at <= pg_catalog.now())
        and (a.closes_at is null or a.closes_at > pg_catalog.now())
    );
$function$;

create or replace function private.can_read_set_version(target_version_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.set_versions as sv
      join public.sets as s on s.id = sv.set_id
      where sv.id = target_version_id
        and (
          s.owner_id = (select auth.uid())
          or s.visibility = 'public'
          or exists (
            select 1
            from public.assignments as a
            where a.set_version_id = sv.id
              and (
                a.created_by = (select auth.uid())
                or exists (
                  select 1
                  from public.class_memberships as cm
                  where cm.class_id = a.class_id
                    and cm.user_id = (select auth.uid())
                    and cm.role = 'teacher'
                    and cm.status = 'active'
                )
                or (
                  a.status in ('published', 'closed')
                  and exists (
                    select 1
                    from public.assignment_recipients as ar
                    where ar.assignment_id = a.id
                      and ar.student_id = (select auth.uid())
                      and ar.status = 'assigned'
                  )
                )
              )
          )
        )
    );
$function$;

create or replace function private.owns_set_version(target_version_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.set_versions as sv
      join public.sets as s on s.id = sv.set_id
      where sv.id = target_version_id
        and s.owner_id = (select auth.uid())
    );
$function$;

create or replace function private.can_grade_attempt(target_attempt_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.attempts as att
      join public.assignments as a on a.id = att.assignment_id
      where att.id = target_attempt_id
        and (
          a.created_by = (select auth.uid())
          or exists (
            select 1
            from public.class_memberships as cm
            where cm.class_id = a.class_id
              and cm.user_id = (select auth.uid())
              and cm.role = 'teacher'
              and cm.status = 'active'
          )
        )
    );
$function$;

revoke all on function private.is_class_member(uuid) from public;
revoke all on function private.is_class_teacher(uuid) from public;
revoke all on function private.can_manage_class(uuid) from public;
revoke all on function private.shares_class_with(uuid) from public;
revoke all on function private.can_read_assignment(uuid) from public;
revoke all on function private.can_manage_assignment(uuid) from public;
revoke all on function private.can_start_assignment(uuid) from public;
revoke all on function private.can_read_set_version(uuid) from public;
revoke all on function private.owns_set_version(uuid) from public;
revoke all on function private.can_grade_attempt(uuid) from public;
grant execute on function private.is_class_member(uuid) to authenticated;
grant execute on function private.is_class_teacher(uuid) to authenticated;
grant execute on function private.can_manage_class(uuid) to authenticated;
grant execute on function private.shares_class_with(uuid) to authenticated;
grant execute on function private.can_read_assignment(uuid) to authenticated;
grant execute on function private.can_manage_assignment(uuid) to authenticated;
grant execute on function private.can_start_assignment(uuid) to authenticated;
grant execute on function private.can_read_set_version(uuid) to authenticated;
grant execute on function private.owns_set_version(uuid) to authenticated;
grant execute on function private.can_grade_attempt(uuid) to authenticated;

-- Data API privileges and RLS are separate. Grant only operations for which a
-- policy exists; sensitive mutations remain server/RPC-only.

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.subscriptions from anon, authenticated;
revoke all on table public.classes from anon, authenticated;
revoke all on table public.class_memberships from anon, authenticated;
revoke all on table public.sets from anon, authenticated;
revoke all on table public.set_versions from anon, authenticated;
revoke all on table public.assignments from anon, authenticated;
revoke all on table public.assignment_recipients from anon, authenticated;
revoke all on table public.attempts from anon, authenticated;
revoke all on table public.attempt_answers from anon, authenticated;
revoke all on table public.set_assets from anon, authenticated;

grant select, insert on table public.profiles to authenticated;
grant update (display_name, avatar_path, timezone, locale, updated_at)
  on table public.profiles to authenticated;
grant select on table public.subscriptions to authenticated;
grant select, insert, delete on table public.classes to authenticated;
grant update (
  name, subject, section, school_year, timezone, join_code_hash,
  archived_at, updated_at
) on table public.classes to authenticated;
grant select, insert, delete on table public.class_memberships to authenticated;
grant update (role, status, joined_at)
  on table public.class_memberships to authenticated;
grant select, insert, delete on table public.sets to authenticated;
grant update (
  title, description, subject, visibility, current_version_id, source_type,
  archived_at, updated_at
) on table public.sets to authenticated;
grant select, insert on table public.set_versions to authenticated;
grant select, insert, delete on table public.assignments to authenticated;
grant update (
  class_id, set_version_id, title, instructions, mode, status, available_at,
  due_at, closes_at, attempt_limit, time_limit_seconds, shuffle_questions,
  show_answers_after_submit, show_score_after_submit, settings, published_at,
  updated_at
) on table public.assignments to authenticated;
grant select, insert, delete on table public.assignment_recipients to authenticated;
grant update (due_at_override, attempt_limit_override, status)
  on table public.assignment_recipients to authenticated;
grant select on table public.attempts to authenticated;
grant select on table public.attempt_answers to authenticated;
grant select, insert on table public.set_assets to authenticated;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.classes enable row level security;
alter table public.class_memberships enable row level security;
alter table public.sets enable row level security;
alter table public.set_versions enable row level security;
alter table public.assignments enable row level security;
alter table public.assignment_recipients enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.set_assets enable row level security;

-- Re-applying this script replaces only policies owned by this script.

drop policy if exists "tracer_profiles_select" on public.profiles;
drop policy if exists "tracer_profiles_insert" on public.profiles;
drop policy if exists "tracer_profiles_update" on public.profiles;
create policy "tracer_profiles_select"
on public.profiles for select to authenticated
using (
  id = (select auth.uid())
  or (select private.shares_class_with(id))
);
create policy "tracer_profiles_insert"
on public.profiles for insert to authenticated
with check (id = (select auth.uid()));
create policy "tracer_profiles_update"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "tracer_subscriptions_select" on public.subscriptions;
create policy "tracer_subscriptions_select"
on public.subscriptions for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "tracer_classes_select" on public.classes;
drop policy if exists "tracer_classes_insert" on public.classes;
drop policy if exists "tracer_classes_update" on public.classes;
drop policy if exists "tracer_classes_delete" on public.classes;
create policy "tracer_classes_select"
on public.classes for select to authenticated
using (
  created_by = (select auth.uid())
  or (select private.is_class_member(id))
);
create policy "tracer_classes_insert"
on public.classes for insert to authenticated
with check (created_by = (select auth.uid()));
create policy "tracer_classes_update"
on public.classes for update to authenticated
using ((select private.can_manage_class(id)))
with check ((select private.can_manage_class(id)));
create policy "tracer_classes_delete"
on public.classes for delete to authenticated
using (created_by = (select auth.uid()));

drop policy if exists "tracer_memberships_select" on public.class_memberships;
drop policy if exists "tracer_memberships_insert" on public.class_memberships;
drop policy if exists "tracer_memberships_update" on public.class_memberships;
drop policy if exists "tracer_memberships_delete" on public.class_memberships;
create policy "tracer_memberships_select"
on public.class_memberships for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_class_teacher(class_id))
);
create policy "tracer_memberships_insert"
on public.class_memberships for insert to authenticated
with check (
  (select private.is_class_teacher(class_id))
  or (
    user_id = (select auth.uid())
    and role = 'teacher'
    and (select private.can_manage_class(class_id))
  )
);
create policy "tracer_memberships_update"
on public.class_memberships for update to authenticated
using ((select private.is_class_teacher(class_id)))
with check ((select private.is_class_teacher(class_id)));
create policy "tracer_memberships_delete"
on public.class_memberships for delete to authenticated
using ((select private.is_class_teacher(class_id)));

drop policy if exists "tracer_sets_select" on public.sets;
drop policy if exists "tracer_sets_insert" on public.sets;
drop policy if exists "tracer_sets_update" on public.sets;
drop policy if exists "tracer_sets_delete" on public.sets;
create policy "tracer_sets_select"
on public.sets for select to authenticated
using (
  owner_id = (select auth.uid())
  or visibility = 'public'
  or (
    current_version_id is not null
    and (select private.can_read_set_version(current_version_id))
  )
);
create policy "tracer_sets_insert"
on public.sets for insert to authenticated
with check (owner_id = (select auth.uid()));
create policy "tracer_sets_update"
on public.sets for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));
create policy "tracer_sets_delete"
on public.sets for delete to authenticated
using (owner_id = (select auth.uid()));

drop policy if exists "tracer_set_versions_select" on public.set_versions;
drop policy if exists "tracer_set_versions_insert" on public.set_versions;
create policy "tracer_set_versions_select"
on public.set_versions for select to authenticated
using ((select private.can_read_set_version(id)));
create policy "tracer_set_versions_insert"
on public.set_versions for insert to authenticated
with check (
  created_by = (select auth.uid())
  and exists (
    select 1
    from public.sets as s
    where s.id = set_id
      and s.owner_id = (select auth.uid())
  )
);

drop policy if exists "tracer_assignments_select" on public.assignments;
drop policy if exists "tracer_assignments_insert" on public.assignments;
drop policy if exists "tracer_assignments_update" on public.assignments;
drop policy if exists "tracer_assignments_delete" on public.assignments;
create policy "tracer_assignments_select"
on public.assignments for select to authenticated
using ((select private.can_read_assignment(id)));
create policy "tracer_assignments_insert"
on public.assignments for insert to authenticated
with check (
  created_by = (select auth.uid())
  and (select private.is_class_teacher(class_id))
  and (select private.can_read_set_version(set_version_id))
);
create policy "tracer_assignments_update"
on public.assignments for update to authenticated
using ((select private.can_manage_assignment(id)))
with check (
  (select private.is_class_teacher(class_id))
  and (select private.can_read_set_version(set_version_id))
);
create policy "tracer_assignments_delete"
on public.assignments for delete to authenticated
using (
  status = 'draft'
  and (select private.can_manage_assignment(id))
);

drop policy if exists "tracer_recipients_select" on public.assignment_recipients;
drop policy if exists "tracer_recipients_insert" on public.assignment_recipients;
drop policy if exists "tracer_recipients_update" on public.assignment_recipients;
drop policy if exists "tracer_recipients_delete" on public.assignment_recipients;
create policy "tracer_recipients_select"
on public.assignment_recipients for select to authenticated
using (
  student_id = (select auth.uid())
  or (select private.can_manage_assignment(assignment_id))
);
create policy "tracer_recipients_insert"
on public.assignment_recipients for insert to authenticated
with check (
  (select private.can_manage_assignment(assignment_id))
  and exists (
    select 1
    from public.assignments as a
    join public.class_memberships as cm on cm.class_id = a.class_id
    where a.id = assignment_id
      and cm.user_id = student_id
      and cm.role = 'student'
      and cm.status = 'active'
  )
);
create policy "tracer_recipients_update"
on public.assignment_recipients for update to authenticated
using ((select private.can_manage_assignment(assignment_id)))
with check ((select private.can_manage_assignment(assignment_id)));
create policy "tracer_recipients_delete"
on public.assignment_recipients for delete to authenticated
using ((select private.can_manage_assignment(assignment_id)));

drop policy if exists "tracer_attempts_select" on public.attempts;
drop policy if exists "tracer_attempts_insert" on public.attempts;
create policy "tracer_attempts_select"
on public.attempts for select to authenticated
using (
  student_id = (select auth.uid())
  or (select private.can_manage_assignment(assignment_id))
);

-- Attempts and answers have no client write policies. Use transactional
-- RPC/Edge Function operations for start_attempt, save_answer, submit_attempt,
-- automatic grading, and teacher overrides. Those operations must derive
-- auth.uid() server-side and validate question membership and attempt limits.

drop policy if exists "tracer_attempt_answers_select" on public.attempt_answers;
create policy "tracer_attempt_answers_select"
on public.attempt_answers for select to authenticated
using (
  exists (
    select 1
    from public.attempts as att
    where att.id = attempt_id
      and (
        att.student_id = (select auth.uid())
        or (select private.can_manage_assignment(att.assignment_id))
      )
  )
);

drop policy if exists "tracer_set_assets_select" on public.set_assets;
drop policy if exists "tracer_set_assets_insert" on public.set_assets;
create policy "tracer_set_assets_select"
on public.set_assets for select to authenticated
using ((select private.can_read_set_version(set_version_id)));
create policy "tracer_set_assets_insert"
on public.set_assets for insert to authenticated
with check (
  uploaded_by = (select auth.uid())
  and (select private.owns_set_version(set_version_id))
);

-- Storage metadata is policy-controlled here, but file writes/deletes must go
-- through the Supabase Storage API rather than direct SQL writes.

drop policy if exists "tracer_storage_set_assets_select" on storage.objects;
drop policy if exists "tracer_storage_set_assets_insert" on storage.objects;
drop policy if exists "tracer_storage_set_assets_update" on storage.objects;
drop policy if exists "tracer_storage_set_assets_delete" on storage.objects;

create policy "tracer_storage_set_assets_select"
on storage.objects for select to authenticated
using (
  bucket_id = 'set-assets'
  and (
    owner_id = (select auth.uid())::text
    or exists (
      select 1
      from public.set_assets as sa
      where sa.bucket_id = storage.objects.bucket_id
        and sa.object_path = storage.objects.name
        and (select private.can_read_set_version(sa.set_version_id))
    )
  )
);
create policy "tracer_storage_set_assets_insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'set-assets'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
create policy "tracer_storage_set_assets_update"
on storage.objects for update to authenticated
using (
  bucket_id = 'set-assets'
  and owner_id = (select auth.uid())::text
)
with check (
  bucket_id = 'set-assets'
  and owner_id = (select auth.uid())::text
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
create policy "tracer_storage_set_assets_delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'set-assets'
  and owner_id = (select auth.uid())::text
);

-- Index every relationship used repeatedly by RLS predicates.

create index if not exists class_memberships_user_status_rls_idx
  on public.class_memberships (user_id, status, class_id);
create index if not exists class_memberships_class_role_rls_idx
  on public.class_memberships (class_id, role, status, user_id);
create index if not exists assignments_class_status_rls_idx
  on public.assignments (class_id, status);
create index if not exists assignments_set_version_rls_idx
  on public.assignments (set_version_id);
create index if not exists assignment_recipients_student_rls_idx
  on public.assignment_recipients (student_id, status, assignment_id);
create index if not exists attempts_student_assignment_rls_idx
  on public.attempts (student_id, assignment_id);
create index if not exists attempts_assignment_status_rls_idx
  on public.attempts (assignment_id, status);
create index if not exists attempt_answers_attempt_rls_idx
  on public.attempt_answers (attempt_id);
create index if not exists set_versions_set_rls_idx
  on public.set_versions (set_id);
create index if not exists set_assets_version_rls_idx
  on public.set_assets (set_version_id);

commit;

-- Follow-up before production:
--   1. Add create_class(), publish_assignment(), start_attempt(), save_answer(),
--      submit_attempt(), and grade_attempt() RPCs for atomic state changes.
--   2. Keep ownership and identity columns out of client UPDATE grants.
--   3. Run Supabase database advisors and a pgTAP role/tenant isolation suite.
