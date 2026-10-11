-- Existing RLS policies continue to protect private guides; published guides
-- are part of the intentionally public publication snapshot.
alter table public.private_sets add column if not exists study_guide_markdown text;
alter table public.published_sets add column if not exists study_guide_markdown text;
