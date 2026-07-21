ALTER TABLE folders ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;

UPDATE folders
SET sort_order = (
  SELECT COUNT(*)
  FROM folders AS earlier
  WHERE earlier.updated_at > folders.updated_at
     OR (earlier.updated_at = folders.updated_at AND earlier.id < folders.id)
);
