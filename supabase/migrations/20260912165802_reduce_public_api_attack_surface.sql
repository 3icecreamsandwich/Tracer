begin;

revoke execute on function public.initialize_user_role(text) from anon;
grant execute on function public.initialize_user_role(text) to authenticated;

create index if not exists attempt_answers_teacher_override_by_idx
  on public.attempt_answers (teacher_override_by)
  where teacher_override_by is not null;

commit;
