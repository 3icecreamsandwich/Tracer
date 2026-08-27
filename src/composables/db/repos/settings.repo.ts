import type { AppLanguage, AppSettings, DbClient } from '../types'

type DbSettingsRow = {
  startup_lock_enabled: number
  default_model_id: string | null
  fallback_model_ids: string
  dark_mode: number
  learn_hybrid_enabled: number
  flashcards_definition_first: number
  floating_chat_enabled: number
  language: string
  text_scale: number
}

function toBool(v: unknown) {
  return Number(v) === 1
}

function toModelIds(value: unknown): string[] {
  if (typeof value !== 'string') return []
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
  } catch {
    return []
  }
}

function toLanguage(value: unknown): AppLanguage {
  if (
    value === 'en' || value === 'es' || value === 'fr' || value === 'zh-CN' ||
    value === 'hi' || value === 'ar' || value === 'de' || value === 'ru' ||
    value === 'ja' || value === 'ko'
  ) return value
  return 'en'
}

export function createSettingsRepo(db: DbClient) {
  return {
    async get(): Promise<AppSettings> {
      const rows = await db.select<DbSettingsRow>(
        `SELECT startup_lock_enabled, default_model_id, fallback_model_ids, dark_mode, learn_hybrid_enabled,
                flashcards_definition_first, floating_chat_enabled, language, text_scale
         FROM app_settings WHERE id = 1 LIMIT 1;`
      )
      const row = rows[0]
      if (!row) {
        return {
          startupLockEnabled: true,
          defaultModelId: null,
          fallbackModelIds: [],
          darkMode: false,
          learnHybridEnabled: false,
          flashcardsDefinitionFirst: false,
          floatingChatEnabled: true,
          language: 'en',
          textScale: 0
        }
      }

      return {
        startupLockEnabled: toBool(row.startup_lock_enabled),
        defaultModelId: row.default_model_id ?? null,
        fallbackModelIds: toModelIds(row.fallback_model_ids),
        darkMode: toBool(row.dark_mode),
        learnHybridEnabled: toBool(row.learn_hybrid_enabled),
        flashcardsDefinitionFirst: toBool(row.flashcards_definition_first),
        floatingChatEnabled: toBool(row.floating_chat_enabled),
        language: toLanguage(row.language),
        textScale: Math.min(4, Math.max(0, Math.round(Number(row.text_scale) || 0)))
      }
    },

    async set(patch: Partial<AppSettings>): Promise<AppSettings> {
      const current = await this.get()
      const next: AppSettings = {
        startupLockEnabled: patch.startupLockEnabled ?? current.startupLockEnabled,
        defaultModelId:
          patch.defaultModelId === undefined ? current.defaultModelId : patch.defaultModelId,
        fallbackModelIds:
          patch.fallbackModelIds === undefined ? current.fallbackModelIds : patch.fallbackModelIds,
        darkMode: patch.darkMode ?? current.darkMode,
        learnHybridEnabled: patch.learnHybridEnabled ?? current.learnHybridEnabled,
        flashcardsDefinitionFirst:
          patch.flashcardsDefinitionFirst ?? current.flashcardsDefinitionFirst,
        floatingChatEnabled: patch.floatingChatEnabled ?? current.floatingChatEnabled,
        language: patch.language ?? current.language,
        textScale: patch.textScale ?? current.textScale
      }

      await db.execute(
        `UPDATE app_settings
         SET startup_lock_enabled = ?,
             default_model_id = ?,
             fallback_model_ids = ?,
             dark_mode = ?,
             learn_hybrid_enabled = ?,
             flashcards_definition_first = ?,
             floating_chat_enabled = ?,
             language = ?,
             text_scale = ?
         WHERE id = 1;`,
        [
          next.startupLockEnabled ? 1 : 0,
          next.defaultModelId,
          JSON.stringify(next.fallbackModelIds),
          next.darkMode ? 1 : 0,
          next.learnHybridEnabled ? 1 : 0,
          next.flashcardsDefinitionFirst ? 1 : 0,
          next.floatingChatEnabled ? 1 : 0,
          next.language,
          next.textScale
        ]
      )

      return next
    }
  }
}
