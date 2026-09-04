ALTER TABLE app_settings
ADD COLUMN smart_review_enabled INTEGER NOT NULL DEFAULT 0
CHECK (smart_review_enabled IN (0, 1));
