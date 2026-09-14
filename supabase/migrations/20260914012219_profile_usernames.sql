-- Public profile identities: repeatable display names and unique lowercase usernames.
alter table public.profiles add column if not exists username text;

create or replace function private.profile_username_base(raw_value text)
returns text
language sql
immutable
set search_path = ''
as $$
  select left(
    trim(both '_' from regexp_replace(lower(coalesce(raw_value, '')), '[^a-z0-9]+', '_', 'g')),
    24
  );
$$;

create or replace function private.assign_profile_username()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_email text;
  base_username text;
  candidate text;
  suffix integer := 1;
begin
  if new.username is not null and btrim(new.username) <> '' then
    new.username := lower(btrim(new.username));
    return new;
  end if;

  select lower(coalesce(email, '')) into account_email
  from auth.users
  where id = new.id;

  base_username := case account_email
    when '3icecreamsandwich@gmail.com' then '3icecreamsandwich'
    when 'seriesofhorror@gmail.com' then 'akhil'
    else private.profile_username_base(split_part(account_email, '@', 1))
  end;
  if length(base_username) < 3 then
    base_username := private.profile_username_base(new.display_name);
  end if;
  if length(base_username) < 3 then
    base_username := 'user';
  end if;

  candidate := base_username;
  while exists (select 1 from public.profiles p where p.username = candidate and p.id <> new.id) loop
    suffix := suffix + 1;
    candidate := left(base_username, 30 - length(suffix::text) - 1) || '_' || suffix::text;
  end loop;
  new.username := candidate;
  return new;
end;
$$;

revoke all on function private.profile_username_base(text) from public, anon, authenticated;
revoke all on function private.assign_profile_username() from public, anon, authenticated;

drop trigger if exists assign_profile_username on public.profiles;
create trigger assign_profile_username
before insert or update of username on public.profiles
for each row execute function private.assign_profile_username();

-- Run existing profiles through the collision-safe generator.
update public.profiles set username = null;

alter table public.profiles alter column username set not null;
alter table public.profiles drop constraint if exists profiles_username_format_check;
alter table public.profiles add constraint profiles_username_format_check
  check (username ~ '^[a-z0-9][a-z0-9_]{2,29}$');
create unique index if not exists profiles_username_unique_idx on public.profiles (username);

grant update (display_name, username, avatar_path, timezone, locale, updated_at)
  on table public.profiles to authenticated;

alter table public.published_sets add column if not exists publisher_username text;
alter table public.published_sets add column if not exists publisher_is_dev boolean not null default false;

create or replace function private.enforce_published_profile_identity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_identity record;
begin
  if new.publisher_id is null then return new; end if;
  select p.display_name, p.username into strict profile_identity
  from public.profiles p where p.id = new.publisher_id;
  new.publisher_name := profile_identity.display_name;
  new.publisher_username := profile_identity.username;
  new.publisher_is_dev := exists (
    select 1 from public.user_roles role
    where role.user_id = new.publisher_id and role.role = 'super'
  );
  return new;
end;
$$;
revoke all on function private.enforce_published_profile_identity() from public, anon, authenticated;
drop trigger if exists enforce_published_profile_identity on public.published_sets;
create trigger enforce_published_profile_identity
before insert or update of publisher_id, publisher_name, publisher_username, publisher_is_dev
on public.published_sets for each row execute function private.enforce_published_profile_identity();

update public.published_sets published
set publisher_name = profile.display_name,
    publisher_username = profile.username,
    publisher_is_dev = exists (
      select 1 from public.user_roles role
      where role.user_id = published.publisher_id and role.role = 'super'
    )
from public.profiles profile
where profile.id = published.publisher_id;

create or replace function private.sync_published_profile_identity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.published_sets
  set publisher_name = new.display_name,
      publisher_username = new.username
  where publisher_id = new.id;
  return new;
end;
$$;
revoke all on function private.sync_published_profile_identity() from public, anon, authenticated;
drop trigger if exists sync_published_profile_identity on public.profiles;
create trigger sync_published_profile_identity
after update of display_name, username on public.profiles
for each row execute function private.sync_published_profile_identity();

drop function if exists public.search_published_sets(text, text[], timestamptz, uuid, integer);
create function public.search_published_sets(
  search_text text default '', selected_tags text[] default '{}',
  before_created_at timestamptz default null, before_id uuid default null,
  page_size integer default 37
)
returns table(
  id uuid, title text, description text, publisher_name text,
  publisher_username text, publisher_is_dev boolean, tags text[],
  allow_copying boolean, card_count integer, created_at timestamptz
)
language sql stable security invoker set search_path = ''
as $$
  select s.id, s.title, s.description, s.publisher_name, s.publisher_username,
    s.publisher_is_dev, s.tags, s.allow_copying, s.card_count, s.created_at
  from public.published_sets s
  where (coalesce(btrim(search_text), '') = '' or s.search_document @@ websearch_to_tsquery('simple', search_text))
    and (coalesce(cardinality(selected_tags), 0) = 0 or s.tags @> selected_tags)
    and (before_created_at is null or (s.created_at, s.id) < (before_created_at, before_id))
  order by s.created_at desc, s.id desc
  limit greatest(1, least(coalesce(page_size, 37), 73));
$$;
revoke all on function public.search_published_sets(text, text[], timestamptz, uuid, integer) from public;
grant execute on function public.search_published_sets(text, text[], timestamptz, uuid, integer)
  to anon, authenticated;
