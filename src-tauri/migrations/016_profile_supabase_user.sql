ALTER TABLE profile ADD COLUMN supabase_user_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_supabase_user_id
  ON profile(supabase_user_id)
  WHERE supabase_user_id IS NOT NULL;
