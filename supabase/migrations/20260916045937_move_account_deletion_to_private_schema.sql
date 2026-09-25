-- Keep the privileged deletion implementation outside the Data API schema.
create schema if not exists private;

create or replace function private.delete_own_account(confirmation text)
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

revoke all on function private.delete_own_account(text) from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.delete_own_account(text) to authenticated;

create or replace function public.delete_own_account(confirmation text)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.delete_own_account(confirmation);
$$;

revoke all on function public.delete_own_account(text) from public, anon;
grant execute on function public.delete_own_account(text) to authenticated;
