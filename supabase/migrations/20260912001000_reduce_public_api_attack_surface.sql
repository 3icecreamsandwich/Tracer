begin;

-- Account role initialization is only meaningful after Supabase Auth has
-- established a user. Removing the anonymous grant avoids exposing a useless
-- public RPC to unauthenticated callers.
revoke execute on function public.initialize_user_role(text) from anon;
grant execute on function public.initialize_user_role(text) to authenticated;

-- Keep teacher-override lookups from degrading into repeated full scans as
-- classroom data grows.
create index if not exists attempt_answers_teacher_override_by_idx
  on public.attempt_answers (teacher_override_by)
  where teacher_override_by is not null;

commit;
