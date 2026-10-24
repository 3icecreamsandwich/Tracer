-- Cloud is authoritative; device SQLite is retained only as a legacy recovery source.
create table public.cloud_library_items (
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind text not null check (kind in ('set', 'guide', 'folder', 'order', 'preferences')),
  id text not null check (length(id) between 1 and 200),
  payload jsonb not null,
  revision bigint not null default 1 check (revision > 0),
  deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (owner_id, kind, id),
  check (jsonb_typeof(payload) in ('object', 'array'))
);
alter table public.cloud_library_items enable row level security;
revoke all on public.cloud_library_items from anon, authenticated;
grant select, insert, update on public.cloud_library_items to authenticated;
create policy "Owners read library" on public.cloud_library_items for select to authenticated using ((select auth.uid()) = owner_id);
create policy "Owners create library" on public.cloud_library_items for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "Owners update library" on public.cloud_library_items for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);

create view public.cloud_library_summaries with (security_invoker = true) as
select owner_id, kind, id, revision, deleted,
  case when kind = 'set' then (payload - 'terms') || jsonb_build_object('cardCount', jsonb_array_length(coalesce(payload->'terms', '[]'::jsonb)))
       when kind = 'guide' then payload - 'markdown'
       else payload end as payload
from public.cloud_library_items;
revoke all on public.cloud_library_summaries from anon, authenticated;
grant select on public.cloud_library_summaries to authenticated;

create function public.save_cloud_library_item(item_kind text, item_id text, item_payload jsonb, expected_revision bigint, item_deleted boolean default false)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare saved public.cloud_library_items;
begin
  if auth.uid() is null then raise exception 'Sign in to save changes' using errcode = '28000'; end if;
  if item_kind = 'set' and not item_deleted and (
    coalesce(length(btrim(item_payload->>'title')), 0) not between 1 and 500
    or jsonb_typeof(item_payload->'terms') is distinct from 'array'
    or jsonb_array_length(item_payload->'terms') not between 1 and 10000
  ) then raise exception 'A set needs a title and between 1 and 10000 cards' using errcode = '22023'; end if;
  if item_kind = 'guide' and not item_deleted and not exists (
    select 1 from public.cloud_library_items where owner_id = auth.uid() and kind = 'set' and id = item_id and not deleted
  ) then raise exception 'The parent set no longer exists' using errcode = '23503'; end if;
  if expected_revision = 0 then
    insert into public.cloud_library_items(owner_id, kind, id, payload, deleted)
      values(auth.uid(), item_kind, item_id, item_payload, item_deleted)
      on conflict do nothing returning * into saved;
  else
    update public.cloud_library_items set payload = item_payload, deleted = item_deleted,
      revision = revision + 1, updated_at = clock_timestamp()
      where owner_id = auth.uid() and kind = item_kind and id = item_id and revision = expected_revision
      returning * into saved;
  end if;
  if saved.id is null then raise exception 'This item changed on another device' using errcode = '40001'; end if;
  if item_kind = 'set' and item_deleted then
    update public.cloud_library_items set deleted = true, revision = revision + 1, updated_at = clock_timestamp()
      where owner_id = auth.uid() and kind = 'guide' and id = item_id and not deleted;
  end if;
  return to_jsonb(saved) - 'owner_id' - 'updated_at';
end $$;
revoke all on function public.save_cloud_library_item(text,text,jsonb,bigint,boolean) from public, anon;
grant execute on function public.save_cloud_library_item(text,text,jsonb,bigint,boolean) to authenticated;

-- Import existing cloud sets without rewriting their content or publication snapshots.
insert into public.cloud_library_items(owner_id,kind,id,payload)
select owner_id, 'set', set_id::text, jsonb_build_object(
  'id',set_id,'title',title,'description',description,'terms',terms,'iconKey',icon_key,'iconTone',icon_tone,
  'folderId',null,'createdAt',created_at,'updatedAt',updated_at)
from public.private_sets on conflict do nothing;
insert into public.cloud_library_items(owner_id,kind,id,payload)
select owner_id, 'guide', set_id::text, jsonb_build_object(
  'id',set_id,'setId',set_id,'markdown',study_guide_markdown,'createdAt',created_at)
from public.private_sets where nullif(btrim(study_guide_markdown),'') is not null on conflict do nothing;

-- Idempotent, insert-only device import. Tombstones prevent deleted items returning.
-- Divergent device content is preserved as an explicitly labelled recovery copy.
create function public.import_cloud_library_items(items jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare item jsonb; existing public.cloud_library_items; recovered_id text; recovered_payload jsonb;
begin
  if auth.uid() is null then raise exception 'Sign in to import your library' using errcode = '28000'; end if;
  if jsonb_typeof(items) is distinct from 'array' or jsonb_array_length(items) > 100 then
    raise exception 'Import at most 100 items at a time' using errcode = '22023';
  end if;
  for item in select value from jsonb_array_elements(items) loop
    if item->>'kind' = 'guide' and exists (
      select 1 from public.cloud_library_items where owner_id = auth.uid() and kind = 'set' and id = item->>'id' and deleted
    ) then continue; end if;
    insert into public.cloud_library_items(owner_id,kind,id,payload)
      values(auth.uid(),item->>'kind',item->>'id',item->'payload') on conflict do nothing;
    select * into existing from public.cloud_library_items
      where owner_id = auth.uid() and kind = item->>'kind' and id = item->>'id';
    if existing.deleted then continue; end if;
    if item->>'kind' = 'set' and
      (existing.payload - array['createdAt','updatedAt','folderId','hiddenFromLibrary']) is distinct from
      ((item->'payload') - array['createdAt','updatedAt','folderId','hiddenFromLibrary']) then
      recovered_id := md5(auth.uid()::text || existing.id || ((item->'payload') - array['createdAt','updatedAt'])::text)::uuid::text;
      recovered_payload := (item->'payload') || jsonb_build_object('id',recovered_id,'title',left(item->'payload'->>'title',470) || ' (recovered from device)');
      insert into public.cloud_library_items(owner_id,kind,id,payload)
        values(auth.uid(),'set',recovered_id,recovered_payload) on conflict do nothing;
    elsif item->>'kind' = 'set' and existing.revision = 1 and existing.payload->'folderId' = 'null'::jsonb then
      -- Preserve device-only organization during the one-time import.
      update public.cloud_library_items set payload = payload || jsonb_build_object(
        'folderId', item->'payload'->'folderId', 'hiddenFromLibrary', coalesce(item->'payload'->'hiddenFromLibrary','false'::jsonb)),
        revision = revision + 1 where owner_id = auth.uid() and kind = 'set' and id = existing.id and revision = 1;
    elsif item->>'kind' = 'guide' and existing.payload->>'markdown' is distinct from item->'payload'->>'markdown' then
      recovered_id := md5(auth.uid()::text || existing.id || (item->'payload'->>'markdown'))::uuid::text;
      select payload into recovered_payload from public.cloud_library_items
        where owner_id = auth.uid() and kind = 'set' and id = existing.id and not deleted;
      if recovered_payload is not null then
        insert into public.cloud_library_items(owner_id,kind,id,payload) values(auth.uid(),'set',recovered_id,
          recovered_payload || jsonb_build_object('id',recovered_id,'title',left(recovered_payload->>'title',470) || ' (recovered guide)')) on conflict do nothing;
        insert into public.cloud_library_items(owner_id,kind,id,payload) values(auth.uid(),'guide',recovered_id,
          (item->'payload') || jsonb_build_object('id',recovered_id,'setId',recovered_id)) on conflict do nothing;
      end if;
    end if;
  end loop;
end $$;
revoke all on function public.import_cloud_library_items(jsonb) from public, anon;
grant execute on function public.import_cloud_library_items(jsonb) to authenticated;
