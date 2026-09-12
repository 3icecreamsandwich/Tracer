begin;

-- Classroom mutation privileges belong only to teacher-capable global roles.
-- A class membership by itself must never upgrade a student into a manager.
create or replace function private.can_manage_classrooms()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $function$
  select exists (
    select 1
    from public.user_roles as ur
    where ur.user_id = (select auth.uid())
      and ur.role in ('teacher', 'admin', 'super')
  );
$function$;

revoke all on function private.can_manage_classrooms() from public, anon;
grant execute on function private.can_manage_classrooms() to authenticated;

alter policy tracer_classes_insert on public.classes
with check (
  created_by = (select auth.uid())
  and (select private.can_manage_classrooms())
);

alter policy tracer_classes_update on public.classes
using (
  (select private.can_manage_classrooms())
  and (select private.can_manage_class(id))
)
with check (
  (select private.can_manage_classrooms())
  and (select private.can_manage_class(id))
);

alter policy tracer_classes_delete on public.classes
using (
  created_by = (select auth.uid())
  and (select private.can_manage_classrooms())
);

alter policy tracer_memberships_insert on public.class_memberships
with check (
  (select private.can_manage_classrooms())
  and (
    (select private.is_class_teacher(class_id))
    or (
      user_id = (select auth.uid())
      and role = 'teacher'
      and (select private.can_manage_class(class_id))
    )
  )
);

alter policy tracer_memberships_update on public.class_memberships
using (
  (select private.can_manage_classrooms())
  and (select private.is_class_teacher(class_id))
)
with check (
  (select private.can_manage_classrooms())
  and (select private.is_class_teacher(class_id))
);

alter policy tracer_memberships_delete on public.class_memberships
using (
  (select private.can_manage_classrooms())
  and (select private.is_class_teacher(class_id))
);

alter policy tracer_assignments_insert on public.assignments
with check (
  (select private.can_manage_classrooms())
  and created_by = (select auth.uid())
  and (select private.is_class_teacher(class_id))
  and (select private.can_read_set_version(set_version_id))
);

alter policy tracer_assignments_update on public.assignments
using (
  (select private.can_manage_classrooms())
  and (select private.can_manage_assignment(id))
)
with check (
  (select private.can_manage_classrooms())
  and (select private.is_class_teacher(class_id))
  and (select private.can_read_set_version(set_version_id))
);

alter policy tracer_assignments_delete on public.assignments
using (
  (select private.can_manage_classrooms())
  and (select private.can_manage_assignment(id))
);

commit;
