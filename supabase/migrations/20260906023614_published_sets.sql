-- Published snapshots are separate from private/local sets and study guides.
create table public.published_sets (
  id uuid primary key default gen_random_uuid(),
  publisher_id uuid not null references auth.users(id) on delete cascade,
  source_set_id uuid not null,
  publisher_name text not null check (length(publisher_name) between 1 and 200),
  title text not null check (length(btrim(title)) between 1 and 500),
  description text check (length(description) <= 10000),
  terms jsonb not null check (jsonb_typeof(terms) = 'array' and jsonb_array_length(terms) between 1 and 10000),
  card_count integer generated always as (jsonb_array_length(terms)) stored,
  icon_key text,
  icon_tone text,
  tags text[] not null default '{}' check (cardinality(tags) <= 30),
  allow_copying boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_document tsvector generated always as (to_tsvector('simple', title || ' ' || coalesce(description, ''))) stored,
  unique (publisher_id, source_set_id)
);
alter table public.published_sets enable row level security;
revoke all on public.published_sets from anon, authenticated;
grant select on public.published_sets to anon, authenticated;
grant insert, update, delete on public.published_sets to authenticated;
create policy "Published sets are publicly readable" on public.published_sets for select to anon, authenticated using (true);
create policy "Publish own sets" on public.published_sets for insert to authenticated with check ((select auth.uid()) = publisher_id);
create policy "Update own publications" on public.published_sets for update to authenticated using ((select auth.uid()) = publisher_id) with check ((select auth.uid()) = publisher_id);
create policy "Delete own publications" on public.published_sets for delete to authenticated using ((select auth.uid()) = publisher_id);
create index published_sets_catalog_order on public.published_sets (created_at desc, id desc);
create index published_sets_search on public.published_sets using gin (search_document);
create index published_sets_tags on public.published_sets using gin (tags);
-- A bounded, summary-only cursor query: card content never travels with the catalog.
create function public.search_published_sets(
  search_text text default '', selected_tags text[] default '{}',
  before_created_at timestamptz default null, before_id uuid default null,
  page_size integer default 37
) returns table (
  id uuid, title text, description text, publisher_name text, tags text[],
  allow_copying boolean, card_count integer, created_at timestamptz
) language sql stable security invoker set search_path = '' as $$
  select s.id, s.title, s.description, s.publisher_name, s.tags, s.allow_copying, s.card_count, s.created_at
  from public.published_sets s
  where (coalesce(btrim(search_text), '') = '' or s.search_document @@ websearch_to_tsquery('simple', search_text))
    and (coalesce(cardinality(selected_tags), 0) = 0 or s.tags @> selected_tags)
    and (before_created_at is null or (s.created_at, s.id) < (before_created_at, before_id))
  order by s.created_at desc, s.id desc
  limit greatest(1, least(coalesce(page_size, 37), 73));
$$;
revoke all on function public.search_published_sets(text,text[],timestamptz,uuid,integer) from public;
grant execute on function public.search_published_sets(text,text[],timestamptz,uuid,integer) to anon, authenticated;

-- Validate public input before any client renders it. No privileged function is needed.
create function public.valid_published_terms(value jsonb) returns boolean
language sql immutable security invoker set search_path = '' as $$
  select jsonb_typeof(value) = 'array'
    and not exists (
      select 1 from jsonb_array_elements(value) term
      where jsonb_typeof(term) <> 'object'
         or coalesce(jsonb_typeof(term->'id'), '') <> 'string'
         or coalesce(jsonb_typeof(term->'front'), '') <> 'string'
         or coalesce(jsonb_typeof(term->'back'), '') <> 'string'
         or length(term->>'id') = 0
    )
    and (select count(*) = count(distinct term->>'id') from jsonb_array_elements(value) term);
$$;
revoke all on function public.valid_published_terms(jsonb) from public;
grant execute on function public.valid_published_terms(jsonb) to anon, authenticated;
alter table public.published_sets add constraint published_terms_shape check (public.valid_published_terms(terms));
alter table public.published_sets add constraint published_terms_size check (octet_length(terms::text) <= 10000000);
