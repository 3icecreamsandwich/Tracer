-- Cover the foreign keys used by moderation/privacy queues and consent review.
create index if not exists child_consent_requests_reviewed_by_idx
  on public.child_consent_requests (reviewed_by);
create index if not exists privacy_requests_requester_id_idx
  on public.privacy_requests (requester_id);
create index if not exists privacy_requests_completed_by_idx
  on public.privacy_requests (completed_by);
create index if not exists public_set_reports_published_set_id_idx
  on public.public_set_reports (published_set_id);
create index if not exists public_set_reports_reporter_id_idx
  on public.public_set_reports (reporter_id);
create index if not exists public_set_reports_reviewed_by_idx
  on public.public_set_reports (reviewed_by);

-- Consolidate overlapping consent policies and evaluate the JWT once per query.
drop policy if exists "Parents can view their own consent requests" on public.child_consent_requests;
drop policy if exists "Super account can review child consent requests" on public.child_consent_requests;

create policy "Parents and super account can view child consent requests"
on public.child_consent_requests for select to authenticated
using (
  parent_email = lower(coalesce((select auth.jwt()) ->> 'email', ''))
  or exists (
    select 1 from public.user_roles roles
    where roles.user_id = (select auth.uid()) and roles.role = 'super'
  )
);

create policy "Super account can update child consent requests"
on public.child_consent_requests for update to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
))
with check (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));

create policy "Super account can delete child consent requests"
on public.child_consent_requests for delete to authenticated
using (exists (
  select 1 from public.user_roles roles
  where roles.user_id = (select auth.uid()) and roles.role = 'super'
));
