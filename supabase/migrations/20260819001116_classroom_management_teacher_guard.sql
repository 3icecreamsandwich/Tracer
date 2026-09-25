
begin;
drop policy if exists "tracer_classes_delete" on public.classes;
create policy "tracer_classes_delete"
on public.classes for delete to authenticated
using (
  created_by = (select auth.uid())
  and exists (
    select 1
    from public.user_roles as ur
    where ur.user_id = (select auth.uid())
      and ur.role in ('teacher', 'admin')
  )
);
commit;
