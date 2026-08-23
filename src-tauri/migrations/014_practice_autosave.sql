CREATE TABLE practice_progress (
  set_id TEXT PRIMARY KEY NOT NULL,
  set_updated_at TEXT NOT NULL,
  current_question_id TEXT,
  questions_json TEXT NOT NULL
    CHECK (json_valid(questions_json) AND json_type(questions_json) = 'array'),
  answers_json TEXT NOT NULL DEFAULT '{}'
    CHECK (json_valid(answers_json) AND json_type(answers_json) = 'object'),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (set_id) REFERENCES flashcard_sets(id) ON DELETE CASCADE
);
