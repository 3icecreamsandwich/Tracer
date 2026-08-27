ALTER TABLE app_settings
ADD COLUMN fallback_model_ids TEXT NOT NULL DEFAULT '[]';
