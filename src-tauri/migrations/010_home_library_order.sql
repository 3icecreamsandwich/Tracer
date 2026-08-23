CREATE TABLE IF NOT EXISTS home_library_order (
  item_kind TEXT NOT NULL CHECK (item_kind IN ('folder', 'set')),
  item_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  PRIMARY KEY (item_kind, item_id)
);

INSERT OR IGNORE INTO home_library_order (item_kind, item_id, sort_order)
SELECT 'folder', id, sort_order
FROM folders;

INSERT OR IGNORE INTO home_library_order (item_kind, item_id, sort_order)
SELECT
  'set',
  current.id,
  COALESCE((SELECT MAX(sort_order) + 1 FROM home_library_order), 0) +
    (SELECT COUNT(*)
     FROM flashcard_sets AS earlier
     WHERE earlier.folder_id IS NULL
       AND (
         earlier.updated_at > current.updated_at OR
         (earlier.updated_at = current.updated_at AND earlier.id < current.id)
       ))
FROM flashcard_sets AS current
WHERE current.folder_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_home_library_order_sort
  ON home_library_order(sort_order);
