PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS folders (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

ALTER TABLE flashcard_sets
  ADD COLUMN folder_id TEXT REFERENCES folders(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_flashcard_sets_folder_id
  ON flashcard_sets(folder_id);

CREATE INDEX IF NOT EXISTS idx_folders_updated_at
  ON folders(updated_at DESC);
