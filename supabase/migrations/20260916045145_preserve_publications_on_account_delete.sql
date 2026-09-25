-- Keep public set snapshots after their publisher deletes their Tracer account.
alter table public.published_sets
  alter column publisher_id drop not null;

alter table public.published_sets
  drop constraint published_sets_publisher_id_fkey;

alter table public.published_sets
  add constraint published_sets_publisher_id_fkey
  foreign key (publisher_id)
  references auth.users (id)
  on delete set null;

create or replace function public.delete_own_account(confirmation text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception using
      errcode = '42501',
      message = 'Authentication required';
  end if;

  if confirmation is distinct from 'DELETE' then
    raise exception using
      errcode = '22023',
      message = 'Type DELETE to confirm account deletion';
  end if;

  update public.published_sets
  set publisher_name = '<unknown>'
  where publisher_id = current_user_id;

  -- Supabase Auth refuses to delete users that still own Storage objects.
  -- Keep classroom uploads available while removing their account ownership.
  update storage.objects
  set owner_id = null
  where owner_id = current_user_id::text;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'storage'
      and table_name = 'objects'
      and column_name = 'owner'
  ) then
    execute 'update storage.objects set owner = null where owner = $1'
    using current_user_id;
  end if;

  delete from auth.users
  where id = current_user_id;

  if not found then
    raise exception using
      errcode = 'P0002',
      message = 'Account not found';
  end if;
end;
$$;

revoke all on function public.delete_own_account(text) from public;
revoke all on function public.delete_own_account(text) from anon;
grant execute on function public.delete_own_account(text) to authenticated;
