-- Teacher-only classroom management operations for Tracer.
--
-- Source sets and their assets are intentionally preserved when an assignment
-- or class is removed. Only class-scoped records are deleted.

begin;

-- Hard-deleting an assignment or class must also remove its class-specific
-- attempts. Answer rows already cascade from attempts.
alter table public.attempts
  drop constraint if exists attempts_assignment_id_fkey;
alter table public.attempts
  add constraint attempts_assignment_id_fkey
  foreign key (assignment_id)
  references public.assignments (id)
  on delete cascade;

-- Teachers may explicitly remove any assignment they manage. The previous
-- policy limited deletion to drafts, which prevented Manage Class from
-- removing already-published material.
drop policy if exists "tracer_assignments_delete" on public.assignments;
create policy "tracer_assignments_delete"
on public.assignments for delete to authenticated
using ((select private.can_manage_assignment(id)));

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

create or replace function public.remove_tracer_class_student(
  requested_class_id uuid,
  requested_student_id uuid
)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  removed_memberships integer := 0;
begin
  if requested_class_id is null or requested_student_id is null then
    raise exception 'Class and student are required' using errcode = '22023';
  end if;

  delete from public.assignment_recipients as ar
  using public.assignments as a
  where ar.assignment_id = a.id
    and a.class_id = requested_class_id
    and ar.student_id = requested_student_id;

  delete from public.class_memberships as cm
  where cm.class_id = requested_class_id
    and cm.user_id = requested_student_id
    and cm.role = 'student';

  get diagnostics removed_memberships = row_count;
  if removed_memberships = 0 then
    raise exception 'Student membership not found' using errcode = 'P0002';
  end if;
end;
$function$;

create or replace function public.remove_tracer_class_assignment(
  requested_assignment_id uuid
)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  removed_assignments integer := 0;
begin
  if requested_assignment_id is null then
    raise exception 'Assignment is required' using errcode = '22023';
  end if;

  delete from public.assignments as a
  where a.id = requested_assignment_id;

  get diagnostics removed_assignments = row_count;
  if removed_assignments = 0 then
    raise exception 'Assignment not found' using errcode = 'P0002';
  end if;
end;
$function$;

create or replace function public.delete_tracer_class(requested_class_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  removed_classes integer := 0;
begin
  if requested_class_id is null then
    raise exception 'Class is required' using errcode = '22023';
  end if;

  delete from public.classes as c
  where c.id = requested_class_id;

  get diagnostics removed_classes = row_count;
  if removed_classes = 0 then
    raise exception 'Class not found' using errcode = 'P0002';
  end if;
end;
$function$;

revoke all on function public.remove_tracer_class_student(uuid, uuid)
  from public, anon;
grant execute on function public.remove_tracer_class_student(uuid, uuid)
  to authenticated;

revoke all on function public.remove_tracer_class_assignment(uuid)
  from public, anon;
grant execute on function public.remove_tracer_class_assignment(uuid)
  to authenticated;

revoke all on function public.delete_tracer_class(uuid)
  from public, anon;
grant execute on function public.delete_tracer_class(uuid)
  to authenticated;

commit;
