ALTER TABLE app_settings
ADD COLUMN automatic_updates_enabled INTEGER NOT NULL DEFAULT 1
CHECK (automatic_updates_enabled IN (0, 1))