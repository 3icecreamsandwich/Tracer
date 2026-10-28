-- NULL preserves old BYOK routes; an account without a route uses built-in AI.
ALTER TABLE app_settings ADD COLUMN ai_mode TEXT CHECK (ai_mode IN ('builtin', 'byok'));
