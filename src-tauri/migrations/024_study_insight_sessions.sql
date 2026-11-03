CREATE TABLE IF NOT EXISTS study_insight_sessions (
  id TEXT PRIMARY KEY,
  set_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'test', 'match', 'flashcards')),
  started_at TEXT NOT NULL,
  ended_at TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  attempted_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_study_insight_sessions_ended_at
  ON study_insight_sessions (ended_at DESC);
