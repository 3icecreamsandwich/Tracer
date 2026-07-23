CREATE TABLE app_settings_expanded (
  id INTEGER PRIMARY KEY NOT NULL DEFAULT 1,
  startup_lock_enabled INTEGER NOT NULL DEFAULT 1,
  default_model_id TEXT,
  dark_mode INTEGER NOT NULL DEFAULT 0,
  learn_hybrid_enabled INTEGER NOT NULL DEFAULT 0,
  language TEXT NOT NULL DEFAULT 'en'
    CHECK (language IN ('en', 'es', 'fr', 'zh-CN', 'hi', 'ar', 'de', 'ru', 'ja', 'ko')),
  text_scale INTEGER NOT NULL DEFAULT 0 CHECK (text_scale BETWEEN 0 AND 4),
  CHECK (id = 1)
);

INSERT INTO app_settings_expanded (
  id,
  startup_lock_enabled,
  default_model_id,
  dark_mode,
  learn_hybrid_enabled,
  language,
  text_scale
)
SELECT
  id,
  startup_lock_enabled,
  default_model_id,
  dark_mode,
  learn_hybrid_enabled,
  language,
  text_scale
FROM app_settings;

DROP TABLE app_settings;
ALTER TABLE app_settings_expanded RENAME TO app_settings;
