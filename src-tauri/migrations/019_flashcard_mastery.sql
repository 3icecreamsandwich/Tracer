ALTER TABLE flashcard_progress
ADD COLUMN mastery_json TEXT NOT NULL DEFAULT '{}'
CHECK (json_valid(mastery_json));
