PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS linked_folders (
  set_id TEXT PRIMARY KEY NOT NULL,
  path TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'synced'
    CHECK (status IN ('synced', 'pending', 'syncing', 'error')),
  last_error TEXT,
  last_scan_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (set_id) REFERENCES flashcard_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS linked_folder_files (
  set_id TEXT NOT NULL,
  relative_path TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  content_hash TEXT,
  status TEXT NOT NULL
    CHECK (status IN ('processed', 'ignored', 'failed')),
  error TEXT,
  discovered_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  processed_at TEXT,
  PRIMARY KEY (set_id, relative_path),
  FOREIGN KEY (set_id) REFERENCES linked_folders(set_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_linked_folders_updated_at
  ON linked_folders(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_linked_folder_files_status
  ON linked_folder_files(set_id, status);

CREATE INDEX IF NOT EXISTS idx_linked_folder_files_content_hash
  ON linked_folder_files(set_id, content_hash);
