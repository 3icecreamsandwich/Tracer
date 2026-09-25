-- These tables are intentionally accessed only through privileged, bounded
-- functions. Explicit deny policies make that contract visible to the
-- security advisor while service-role maintenance continues to bypass RLS.
create policy "No direct client feedback access"
on public.feedback_submissions
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

create policy "No direct client super account access"
on private.super_account
as restrictive
for all
to anon, authenticated
using (false)
with check (false);
