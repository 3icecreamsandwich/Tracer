ALTER TABLE app_settings
ADD COLUMN language TEXT NOT NULL DEFAULT 'en'
CHECK (language IN ('en', 'es', 'fr', 'zh-CN', 'hi', 'ar', 'de', 'ru', 'ja', 'ko'));
