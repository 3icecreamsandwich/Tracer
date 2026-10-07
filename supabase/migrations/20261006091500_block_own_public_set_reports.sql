-- Keep the rule effective for projects that applied the report-table migration
-- before the client-side owner check was introduced.
drop policy if exists "Signed-in users can report public sets" on public.public_set_reports;
create policy "Signed-in users can report public sets"
on public.public_set_reports for insert to authenticated
with check (
  reporter_id = (select auth.uid())
  and status = 'new'
  and reviewed_at is null
  and reviewed_by is null
  and (
    not exists (
      select 1 from public.published_sets set_to_report
      where set_to_report.id = published_set_id
        and set_to_report.publisher_id = (select auth.uid())
    )
    or exists (
      select 1 from public.user_roles roles
      where roles.user_id = (select auth.uid()) and roles.role = 'super'
    )
  )
);
