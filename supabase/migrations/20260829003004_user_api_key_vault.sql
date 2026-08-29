begin;

create table if not exists public.user_api_key_secrets (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider_id text not null check (
    provider_id in ('openai', 'anthropic', 'gemini', 'ollama_cloud', 'openai_compat')
  ),
  secret_id uuid not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, provider_id)
);

alter table public.user_api_key_secrets enable row level security;

drop policy if exists "tracer_user_api_keys_select" on public.user_api_key_secrets;
create policy "tracer_user_api_keys_select"
on public.user_api_key_secrets for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "tracer_user_api_keys_insert" on public.user_api_key_secrets;
create policy "tracer_user_api_keys_insert"
on public.user_api_key_secrets for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "tracer_user_api_keys_update" on public.user_api_key_secrets;
create policy "tracer_user_api_keys_update"
on public.user_api_key_secrets for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "tracer_user_api_keys_delete" on public.user_api_key_secrets;
create policy "tracer_user_api_keys_delete"
on public.user_api_key_secrets for delete to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_api_key_secrets from public, anon, authenticated;

create schema if not exists private;

create or replace function private.delete_tracer_user_api_key_secret()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  delete from vault.secrets where id = old.secret_id;
  return old;
end;
$function$;

revoke all on function private.delete_tracer_user_api_key_secret() from public, anon, authenticated;

drop trigger if exists delete_tracer_user_api_key_secret on public.user_api_key_secrets;
create trigger delete_tracer_user_api_key_secret
after delete on public.user_api_key_secrets
for each row execute function private.delete_tracer_user_api_key_secret();

create or replace function private.save_tracer_user_api_keys(requested_keys jsonb)
returns text[]
language plpgsql
security definer
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
  key_entry record;
  existing_secret_id uuid;
  next_secret_id uuid;
  saved_provider_ids text[] := array[]::text[];
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if requested_keys is null or pg_catalog.jsonb_typeof(requested_keys) <> 'object' then
    raise exception 'API keys must be a JSON object' using errcode = '22023';
  end if;

  for key_entry in
    select entry.key as provider_id, entry.value as api_key
    from pg_catalog.jsonb_each_text(requested_keys) as entry
  loop
    if key_entry.provider_id not in ('openai', 'anthropic', 'gemini', 'ollama_cloud', 'openai_compat') then
      raise exception 'Unknown API key provider' using errcode = '22023';
    end if;
    key_entry.api_key := pg_catalog.btrim(key_entry.api_key);
    if key_entry.api_key = '' or pg_catalog.length(key_entry.api_key) > 32768 then
      raise exception 'Invalid API key value' using errcode = '22023';
    end if;

    perform pg_catalog.pg_advisory_xact_lock(
      pg_catalog.hashtextextended(current_user_id::text || ':' || key_entry.provider_id, 0)
    );
    select mapping.secret_id
    into existing_secret_id
    from public.user_api_key_secrets as mapping
    where mapping.user_id = current_user_id
      and mapping.provider_id = key_entry.provider_id;

    if existing_secret_id is null then
      next_secret_id := vault.create_secret(key_entry.api_key);
      insert into public.user_api_key_secrets (user_id, provider_id, secret_id)
      values (current_user_id, key_entry.provider_id, next_secret_id);
    else
      perform vault.update_secret(existing_secret_id, key_entry.api_key);
      update public.user_api_key_secrets
      set updated_at = pg_catalog.now()
      where user_id = current_user_id
        and provider_id = key_entry.provider_id;
    end if;
    saved_provider_ids := pg_catalog.array_append(saved_provider_ids, key_entry.provider_id);
  end loop;

  return saved_provider_ids;
end;
$function$;

create or replace function private.list_tracer_user_api_keys()
returns table(provider_id text, api_key text)
language sql
security definer
set search_path = ''
stable
as $function$
  select mapping.provider_id, decrypted.decrypted_secret
  from public.user_api_key_secrets as mapping
  join vault.decrypted_secrets as decrypted on decrypted.id = mapping.secret_id
  where mapping.user_id = (select auth.uid())
  order by mapping.provider_id;
$function$;

create or replace function private.delete_tracer_user_api_key(requested_provider_id text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if requested_provider_id not in ('openai', 'anthropic', 'gemini', 'ollama_cloud', 'openai_compat') then
    raise exception 'Unknown API key provider' using errcode = '22023';
  end if;
  delete from public.user_api_key_secrets
  where user_id = current_user_id
    and provider_id = requested_provider_id;
  return found;
end;
$function$;

revoke all on function private.save_tracer_user_api_keys(jsonb) from public, anon;
revoke all on function private.list_tracer_user_api_keys() from public, anon;
revoke all on function private.delete_tracer_user_api_key(text) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.save_tracer_user_api_keys(jsonb) to authenticated;
grant execute on function private.list_tracer_user_api_keys() to authenticated;
grant execute on function private.delete_tracer_user_api_key(text) to authenticated;

create or replace function public.save_tracer_user_api_keys(requested_keys jsonb)
returns text[]
language sql
security invoker
set search_path = ''
as $function$
  select private.save_tracer_user_api_keys(requested_keys);
$function$;

create or replace function public.list_tracer_user_api_keys()
returns table(provider_id text, api_key text)
language sql
security invoker
set search_path = ''
stable
as $function$
  select * from private.list_tracer_user_api_keys();
$function$;

create or replace function public.delete_tracer_user_api_key(requested_provider_id text)
returns boolean
language sql
security invoker
set search_path = ''
as $function$
  select private.delete_tracer_user_api_key(requested_provider_id);
$function$;

revoke all on function public.save_tracer_user_api_keys(jsonb) from public, anon;
revoke all on function public.list_tracer_user_api_keys() from public, anon;
revoke all on function public.delete_tracer_user_api_key(text) from public, anon;
grant execute on function public.save_tracer_user_api_keys(jsonb) to authenticated;
grant execute on function public.list_tracer_user_api_keys() to authenticated;
grant execute on function public.delete_tracer_user_api_key(text) to authenticated;

commit;
