ALTER TABLE flashcard_progress
ADD COLUMN correct_term_ids_json TEXT NOT NULL DEFAULT '[]'
CHECK (json_valid(correct_term_ids_json));
