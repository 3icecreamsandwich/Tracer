-- Revision conflicts are not retryable transaction serialization failures.
create or replace function public.save_cloud_library_item(item_kind text, item_id text, item_payload jsonb, expected_revision bigint, item_deleted boolean default false)
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
  if saved.id is null then raise exception 'This item changed on another device' using errcode = 'PT409'; end if;
  if item_kind = 'set' and item_deleted then
    update public.cloud_library_items set deleted = true, revision = revision + 1, updated_at = clock_timestamp()
      where owner_id = auth.uid() and kind = 'guide' and id = item_id and not deleted;
  end if;
  return to_jsonb(saved) - 'owner_id' - 'updated_at';
end $$;
