-- Private sets are synchronized only between devices signed into the same user.
create table public.private_sets (
  owner_id uuid not null references auth.users(id) on delete cascade,
  set_id uuid not null,
  title text not null check (length(btrim(title)) between 1 and 500),
  description text check (length(description) <= 10000),
  icon_key text,
  icon_tone text,
  terms jsonb not null check (jsonb_typeof(terms) = 'array' and jsonb_array_length(terms) between 1 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_id, set_id)
);

alter table public.private_sets enable row level security;
revoke all on public.private_sets from anon, authenticated;
grant select, insert, update, delete on public.private_sets to authenticated;

create policy "Users read their own private sets" on public.private_sets
  for select to authenticated using ((select auth.uid()) = owner_id);
create policy "Users create their own private sets" on public.private_sets
  for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "Users update their own private sets" on public.private_sets
  for update to authenticated using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
create policy "Users delete their own private sets" on public.private_sets
  for delete to authenticated using ((select auth.uid()) = owner_id);
