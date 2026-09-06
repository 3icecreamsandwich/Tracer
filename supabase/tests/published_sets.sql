begin;
-- All fixtures and writes roll back, including when exercised against the linked project.
select set_config('test.publisher', (select id::text from auth.users order by created_at limit 1), true);
select set_config('request.jwt.claims', json_build_object('sub', current_setting('test.publisher'), 'role', 'authenticated')::text, true);
set local role authenticated;
insert into public.published_sets (id,publisher_id,source_set_id,publisher_name,title,description,terms,tags)
values ('11111111-1111-4111-8111-111111111111',current_setting('test.publisher')::uuid,'22222222-2222-4222-8222-222222222222','Catalog test','CatalogFixtureAlpha','DescriptionFixtureBeta','[{"id":"one","front":"HiddenTermGamma","back":"HiddenDefinitionDelta"}]','{science,math}');
do $$ begin
  if (select count(*) from public.search_published_sets('CatalogFixtureAlpha')) <> 1 then raise exception 'Title search failed'; end if;
  if (select count(*) from public.search_published_sets('DescriptionFixtureBeta')) <> 1 then raise exception 'Description search failed'; end if;
  if (select count(*) from public.search_published_sets('HiddenTermGamma')) <> 0 then raise exception 'Terms must not be searched'; end if;
  if (select count(*) from public.search_published_sets('HiddenDefinitionDelta')) <> 0 then raise exception 'Definitions must not be searched'; end if;
  if (select count(*) from public.search_published_sets('CatalogFixtureAlpha','{science,math}')) <> 1 then raise exception 'Tag filter failed'; end if;
  if (select count(*) from public.search_published_sets('CatalogFixtureAlpha','{science,coding}')) <> 0 then raise exception 'All tags must match'; end if;
  if exists(select 1 from public.search_published_sets('CatalogFixtureAlpha','{}',(select created_at from public.published_sets where id='11111111-1111-4111-8111-111111111111'),'11111111-1111-4111-8111-111111111111')) then raise exception 'Cursor repeated a row'; end if;
end $$;
update public.published_sets set allow_copying=false where id='11111111-1111-4111-8111-111111111111';
do $$ begin
 if (select allow_copying from public.published_sets where id='11111111-1111-4111-8111-111111111111') then raise exception 'Owner update failed'; end if;
 begin
  update public.published_sets set terms='[{"front":42}]' where id='11111111-1111-4111-8111-111111111111';
  raise exception 'Invalid terms accepted';
 exception when check_violation then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"33333333-3333-4333-8333-333333333333","role":"authenticated"}',true);
do $$ declare affected integer; begin
 update public.published_sets set title='Wrong owner' where id='11111111-1111-4111-8111-111111111111';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Foreign update allowed'; end if;
 delete from public.published_sets where id='11111111-1111-4111-8111-111111111111';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Foreign delete allowed'; end if;
 begin
  insert into public.published_sets(publisher_id,source_set_id,publisher_name,title,terms)
  values(current_setting('test.publisher')::uuid,gen_random_uuid(),'Spoof','Spoof','[{"id":"x","front":"x","back":"y"}]');
  raise exception 'Publisher spoof allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$ begin
 if (select count(*) from public.search_published_sets('CatalogFixtureAlpha')) <> 1 then raise exception 'Anonymous read failed'; end if;
 begin
  insert into public.published_sets(publisher_id,source_set_id,publisher_name,title,terms)
  values(current_setting('test.publisher')::uuid,gen_random_uuid(),'Anon','Anon','[{"id":"x","front":"x","back":"y"}]');
  raise exception 'Anonymous write allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'Published set ownership, anonymous access, search, tags, cursor, validation: passed' as result;
rollback;
