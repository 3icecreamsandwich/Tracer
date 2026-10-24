-- Run against a migrated local Supabase database. Every fixture rolls back.
begin;
insert into auth.users(id) values ('10000000-0000-4000-8000-000000000001'), ('10000000-0000-4000-8000-000000000002');
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select public.save_cloud_library_item('set','test-set','{"id":"test-set","title":"Original","terms":[{"front":"A","back":"B"}]}',0);
do $$ begin
  if (select count(*) from public.cloud_library_summaries where id = 'test-set' and payload ? 'terms') <> 0 then raise exception 'Summaries exposed card bodies'; end if;
  if (select payload->>'cardCount' from public.cloud_library_summaries where id = 'test-set') <> '1' then raise exception 'Missing summary count'; end if;
end $$;
select public.save_cloud_library_item('set','test-set','{"id":"test-set","title":"Newer","terms":[{"front":"A","back":"B"}]}',1);
do $$ begin
  begin
    perform public.save_cloud_library_item('set','test-set','{"title":"Stale","terms":[{}]}',1);
    raise exception 'Stale write succeeded';
  exception when serialization_failure then null;
  end;
end $$;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
do $$ begin
  if exists(select 1 from public.cloud_library_items where id='test-set') then raise exception 'Another account can read private data'; end if;
  begin
    insert into public.cloud_library_items(owner_id,kind,id,payload) values('10000000-0000-4000-8000-000000000001','set','forged','{}');
    raise exception 'Owner forgery succeeded';
  exception when insufficient_privilege then null;
  end;
end $$;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
-- A divergent local set must become a separate recovery copy, never overwrite cloud.
select public.import_cloud_library_items('[{"kind":"set","id":"test-set","payload":{"id":"test-set","title":"Device version","terms":[{"front":"Local","back":"Only"}]}}]');
select public.import_cloud_library_items('[{"kind":"set","id":"test-set","payload":{"id":"test-set","title":"Device version","terms":[{"front":"Local","back":"Only"}]}}]');
do $$ begin
  if (select payload->>'title' from public.cloud_library_items where id='test-set') <> 'Newer' then raise exception 'Import overwrote cloud'; end if;
  if (select count(*) from public.cloud_library_items where kind='set' and payload->>'title' = 'Device version (recovered from device)') <> 1 then raise exception 'Recovery not idempotent'; end if;
end $$;
select public.save_cloud_library_item('guide','test-set','{"id":"guide","setId":"test-set","markdown":"# Guide"}',0);
select public.import_cloud_library_items('[{"kind":"guide","id":"test-set","payload":{"id":"local-guide","setId":"test-set","markdown":"# Device-only guide"}}]');
do $$ begin
  if (select count(*) from public.cloud_library_items where kind='guide' and payload->>'markdown'='# Device-only guide') <> 1 then raise exception 'Divergent guide not preserved'; end if;
end $$;
select public.save_cloud_library_item('set','test-set','{}',2,true);
select public.import_cloud_library_items('[{"kind":"set","id":"test-set","payload":{"id":"test-set","title":"Resurrected","terms":[{}]}}]');
do $$ begin
  if not (select deleted from public.cloud_library_items where kind='set' and id='test-set') then raise exception 'Import resurrected deletion'; end if;
  if not (select deleted from public.cloud_library_items where kind='guide' and id='test-set') then raise exception 'Guide survived parent deletion'; end if;
end $$;
select public.save_cloud_library_item('set','without-guide','{"id":"without-guide","title":"Temporary","terms":[{}]}',0);
select public.save_cloud_library_item('set','without-guide','{}',1,true);
select public.import_cloud_library_items('[{"kind":"guide","id":"without-guide","payload":{"id":"orphan","setId":"without-guide","markdown":"Should not return"}}]');
do $$ begin
  if exists(select 1 from public.cloud_library_items where kind='guide' and id='without-guide') then raise exception 'Guide imported under deleted set'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
  begin
    perform * from public.cloud_library_items;
    raise exception 'Anonymous library access succeeded';
  exception when insufficient_privilege then null;
  end;
end $$;
rollback;
