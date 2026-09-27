-- A parent verifies their email through Supabase's magic link, then explicitly
-- approves a one-time account-setup link. We keep only the parent email and
-- the resulting child auth user id; the child email is never collected here.
alter table public.child_consent_requests
  add column if not exists approved_at timestamptz,
  add column if not exists approval_token uuid unique,
  add column if not exists child_user_id uuid unique references auth.users(id) on delete set null,
  add column if not exists child_account_created_at timestamptz;

create or replace function public.approve_own_child_consent_request(request_id uuid)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  request_row public.child_consent_requests;
  parent_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null or parent_email = '' then
    raise exception 'Parent sign-in is required.';
  end if;

  select * into request_row
  from public.child_consent_requests
  where id = request_id
  for update;

  if not found or request_row.parent_email <> parent_email then
    raise exception 'Consent request was not found.';
  end if;
  if request_row.status = 'rejected' then
    raise exception 'This consent request was rejected.';
  end if;
  if request_row.child_user_id is not null then
    raise exception 'This consent request has already been used.';
  end if;

  update public.child_consent_requests
  set status = 'approved',
      approved_at = coalesce(approved_at, now()),
      reviewed_at = coalesce(reviewed_at, now()),
      reviewed_by = coalesce(reviewed_by, auth.uid()),
      approval_token = coalesce(approval_token, gen_random_uuid())
  where id = request_id
  returning approval_token into request_row.approval_token;

  return request_row.approval_token;
end;
$$;

create or replace function public.child_consent_signup_status(token uuid)
returns text
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select case
    when status = 'approved' and child_user_id is null then 'approved'
    when child_user_id is not null then 'used'
    else status
  end
  from public.child_consent_requests
  where approval_token = token
  limit 1;
$$;

create or replace function public.complete_child_consent_signup(token uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if auth.uid() is null then
    raise exception 'Child account sign-in is required.';
  end if;

  update public.child_consent_requests
  set child_user_id = auth.uid(),
      child_account_created_at = now()
  where approval_token = token
    and status = 'approved'
    and child_user_id is null;

  if not found then
    raise exception 'This account setup link is no longer available.';
  end if;
end;
$$;

revoke all on function public.approve_own_child_consent_request(uuid) from public;
revoke all on function public.child_consent_signup_status(uuid) from public;
revoke all on function public.complete_child_consent_signup(uuid) from public;
grant execute on function public.approve_own_child_consent_request(uuid) to authenticated;
grant execute on function public.child_consent_signup_status(uuid) to anon, authenticated;
grant execute on function public.complete_child_consent_signup(uuid) to authenticated;
