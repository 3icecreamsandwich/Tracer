ALTER TABLE flashcard_sets
ADD COLUMN hidden_from_library INTEGER NOT NULL DEFAULT 0
CHECK (hidden_from_library IN (0, 1));
