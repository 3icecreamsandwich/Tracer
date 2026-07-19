PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS chats (
  id TEXT PRIMARY KEY NOT NULL,
  set_id TEXT NOT NULL,
  title TEXT NOT NULL,
  messages_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  last_opened_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (json_valid(messages_json)),
  FOREIGN KEY (set_id) REFERENCES flashcard_sets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chats_set_last_opened
  ON chats(set_id, last_opened_at DESC);
