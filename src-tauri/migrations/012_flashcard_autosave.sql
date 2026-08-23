ALTER TABLE app_settings
ADD COLUMN flashcards_definition_first INTEGER NOT NULL DEFAULT 0
CHECK (flashcards_definition_first IN (0, 1));

CREATE TABLE flashcard_progress (
  set_id TEXT PRIMARY KEY NOT NULL,
  current_term_id TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (set_id) REFERENCES flashcard_sets(id) ON DELETE CASCADE
);
