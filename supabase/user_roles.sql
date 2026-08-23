-- Tracer account roles selected during signup.
-- Apply before teacher_classroom_rls.sql.

begin;

create table if not exists public.user_roles (
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('student', 'teacher', 'admin')),
  primary key (user_id, role)
);

-- Tracer accounts have one global role. The composite primary key remains in
-- place for compatibility with the existing schema, while this index enforces
-- the one-role invariant used by signup and authorization helpers.
create unique index if not exists user_roles_one_role_per_user_idx
  on public.user_roles (user_id);

revoke all on table public.user_roles from anon, authenticated;
grant select, insert (user_id, role) on table public.user_roles to authenticated;

alter table public.user_roles enable row level security;

drop policy if exists "tracer_user_roles_select_own" on public.user_roles;
drop policy if exists "tracer_user_roles_insert_own" on public.user_roles;
create policy "tracer_user_roles_select_own"
on public.user_roles for select to authenticated
using (user_id = (select auth.uid()));
create policy "tracer_user_roles_insert_own"
on public.user_roles for insert to authenticated
with check (
  user_id = (select auth.uid())
  and role in ('student', 'teacher')
);

-- This security-invoker RPC gives OAuth signups an atomic, one-time role
-- initializer. ON CONFLICT deliberately preserves the account's first role.
create or replace function public.initialize_user_role(requested_role text)
returns text
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  assigned_role text;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if requested_role not in ('student', 'teacher') then
    raise exception 'Invalid account role' using errcode = '22023';
  end if;

  insert into public.user_roles (user_id, role)
  values ((select auth.uid()), requested_role)
  on conflict (user_id) do nothing;

  select ur.role into assigned_role
  from public.user_roles as ur
  where ur.user_id = (select auth.uid());

  return assigned_role;
end;
$function$;

revoke all on function public.initialize_user_role(text) from public;
grant execute on function public.initialize_user_role(text) to authenticated;

commit;
