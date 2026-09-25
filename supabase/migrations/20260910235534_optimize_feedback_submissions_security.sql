drop policy if exists "Anyone can submit feedback" on public.feedback_submissions;
create policy "Anyone can submit feedback"
on public.feedback_submissions
for insert
to anon, authenticated
with check (submitted_by is null or submitted_by = (select auth.uid()));

create index if not exists feedback_submissions_submitted_by_idx
on public.feedback_submissions (submitted_by)
where submitted_by is not null;
