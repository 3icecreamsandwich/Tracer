-- Reports are intentionally private: reporters can submit one, while only the
-- restricted super account can review or change its status.
create table if not exists public.public_set_reports (
  id uuid primary key default extensions.gen_random_uuid(),
  published_set_id uuid references public.published_sets(id) on delete set null,
  reporter_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  reason text not null check (reason in ('privacy', 'harassment', 'illegal', 'other')),
  details text not null check (char_length(btrim(details)) between 3 and 2000),
  status text not null default 'new' check (status in ('new', 'reviewing', 'removed', 'no_action', 'closed')),
  moderator_note text check (char_length(moderator_note) <= 2000),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);

alter table public.public_set_reports enable row level security;
revoke all on public.public_set_reports from public, anon, authenticated;
grant insert on public.public_set_reports to authenticated;
grant select, update on public.public_set_reports to authenticated;

create policy "Signed-in users can report public sets"
on public.public_set_reports for insert to authenticated
with check (
  reporter_id = (select auth.uid())
  and status = 'new'
  and reviewed_at is null
  and reviewed_by is null
);

create policy "Super account can review public set reports"
on public.public_set_reports for select to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));

create policy "Super account can moderate public set reports"
on public.public_set_reports for update to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
))
with check (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));

create index if not exists public_set_reports_status_created_at_idx
  on public.public_set_reports (status, created_at desc);

-- Privacy requests are a private manual-work queue. The form deliberately
-- asks for the minimum needed to identify a signed-in account and respond.
create table if not exists public.privacy_requests (
  id uuid primary key default extensions.gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  request_type text not null check (request_type in ('access', 'correction', 'deletion', 'other')),
  details text not null check (char_length(btrim(details)) between 3 and 2000),
  status text not null default 'new' check (status in ('new', 'identity_check', 'in_progress', 'completed', 'denied')),
  internal_note text check (char_length(internal_note) <= 2000),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  completed_by uuid references auth.users(id) on delete set null
);

alter table public.privacy_requests enable row level security;
revoke all on public.privacy_requests from public, anon, authenticated;
grant insert on public.privacy_requests to authenticated;
grant select, update on public.privacy_requests to authenticated;

create policy "Signed-in users can submit privacy requests"
on public.privacy_requests for insert to authenticated
with check (
  requester_id = (select auth.uid())
  and status = 'new'
  and completed_at is null
  and completed_by is null
);

create policy "Super account can review privacy requests"
on public.privacy_requests for select to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));

create policy "Super account can fulfill privacy requests"
on public.privacy_requests for update to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
))
with check (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));

create index if not exists privacy_requests_status_created_at_idx
  on public.privacy_requests (status, created_at desc);
