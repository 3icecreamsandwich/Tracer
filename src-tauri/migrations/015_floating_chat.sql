ALTER TABLE app_settings
ADD COLUMN floating_chat_enabled INTEGER NOT NULL DEFAULT 1
CHECK (floating_chat_enabled IN (0, 1));
