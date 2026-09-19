begin;
-- Run with the Supabase SQL test runner or against a linked project. The
-- transaction rolls back the fixture and every attempted write.
select set_config('test.user_a', (select id::text from auth.users order by created_at limit 1), true);
select set_config('test.user_b', (select id::text from auth.users order by created_at offset 1 limit 1), true);

do $$ begin
  if nullif(current_setting('test.user_a', true), '') is null
     or nullif(current_setting('test.user_b', true), '') is null then
    raise exception 'Cross-user authorization tests require two auth users';
  end if;
end $$;

select set_config('request.jwt.claims', json_build_object('sub', current_setting('test.user_a'), 'role', 'authenticated')::text, true);
set local role authenticated;
insert into public.sets (id, owner_id, title, visibility)
values ('4f144ca4-a271-4e76-8cef-24b8dcff0a01', current_setting('test.user_a')::uuid, 'RLS ownership fixture', 'private');
reset role;

select set_config('request.jwt.claims', json_build_object('sub', current_setting('test.user_b'), 'role', 'authenticated')::text, true);
set local role authenticated;
do $$ declare affected integer; begin
  if exists (select 1 from public.sets where id='4f144ca4-a271-4e76-8cef-24b8dcff0a01') then
    raise exception 'Foreign private set was readable';
  end if;

  update public.sets set title='stolen' where id='4f144ca4-a271-4e76-8cef-24b8dcff0a01';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Foreign set update was allowed'; end if;

  delete from public.sets where id='4f144ca4-a271-4e76-8cef-24b8dcff0a01';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Foreign set delete was allowed'; end if;

  update public.profiles set display_name='stolen' where id=current_setting('test.user_a')::uuid;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Foreign profile update was allowed'; end if;

  begin
    insert into public.sets (owner_id, title, visibility)
    values (current_setting('test.user_a')::uuid, 'spoofed owner', 'private');
    raise exception 'Foreign owner insert was allowed';
  exception when insufficient_privilege or check_violation then null; end;
end $$;
reset role;

select 'Cross-user set and profile authorization: passed' as result;
rollback;
