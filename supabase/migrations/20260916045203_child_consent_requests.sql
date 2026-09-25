-- Under-13 requests contain only the separate parent/guardian email until consent.
create table if not exists public.child_consent_requests (
  id uuid primary key default gen_random_uuid(),
  parent_email text not null check (parent_email = lower(btrim(parent_email)) and parent_email ~ '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  review_note text check (review_note is null or char_length(review_note) <= 1000)
);

alter table public.child_consent_requests enable row level security;
revoke all on public.child_consent_requests from public, anon, authenticated;
grant insert (parent_email) on public.child_consent_requests to anon, authenticated;
grant select on public.child_consent_requests to authenticated;

create policy "Visitors can request parent consent"
on public.child_consent_requests for insert to anon, authenticated
with check (status = 'pending' and reviewed_at is null and reviewed_by is null and review_note is null);

create policy "Parents can view their own consent requests"
on public.child_consent_requests for select to authenticated
using (parent_email = lower(coalesce(auth.jwt() ->> 'email', '')));

create policy "Super account can review child consent requests"
on public.child_consent_requests for all to authenticated
using (exists (select 1 from public.user_roles where user_id = (select auth.uid()) and role = 'super'))
with check (exists (select 1 from public.user_roles where user_id = (select auth.uid()) and role = 'super'));
