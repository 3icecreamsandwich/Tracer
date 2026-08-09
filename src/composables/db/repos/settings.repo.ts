import type { AppLanguage, AppSettings, DbClient } from '../types'

type DbSettingsRow = {
  startup_lock_enabled: number
  default_model_id: string | null
  dark_mode: number
  learn_hybrid_enabled: number
  flashcards_definition_first: number
  language: string
  text_scale: number
}

function toBool(v: unknown) {
  return Number(v) === 1
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
        `SELECT startup_lock_enabled, default_model_id, dark_mode, learn_hybrid_enabled,
                flashcards_definition_first, language, text_scale
         FROM app_settings WHERE id = 1 LIMIT 1;`
      )
      const row = rows[0]
      if (!row) {
        return {
          startupLockEnabled: true,
          defaultModelId: null,
          darkMode: false,
          learnHybridEnabled: false,
          flashcardsDefinitionFirst: false,
          language: 'en',
          textScale: 0
        }
      }

      return {
        startupLockEnabled: toBool(row.startup_lock_enabled),
        defaultModelId: row.default_model_id ?? null,
        darkMode: toBool(row.dark_mode),
        learnHybridEnabled: toBool(row.learn_hybrid_enabled),
        flashcardsDefinitionFirst: toBool(row.flashcards_definition_first),
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
        darkMode: patch.darkMode ?? current.darkMode,
        learnHybridEnabled: patch.learnHybridEnabled ?? current.learnHybridEnabled,
        flashcardsDefinitionFirst:
          patch.flashcardsDefinitionFirst ?? current.flashcardsDefinitionFirst,
        language: patch.language ?? current.language,
        textScale: patch.textScale ?? current.textScale
      }

      await db.execute(
        `UPDATE app_settings
         SET startup_lock_enabled = ?,
             default_model_id = ?,
             dark_mode = ?,
             learn_hybrid_enabled = ?,
             flashcards_definition_first = ?,
             language = ?,
             text_scale = ?
         WHERE id = 1;`,
        [
          next.startupLockEnabled ? 1 : 0,
          next.defaultModelId,
          next.darkMode ? 1 : 0,
          next.learnHybridEnabled ? 1 : 0,
          next.flashcardsDefinitionFirst ? 1 : 0,
          next.language,
          next.textScale
        ]
      )

      return next
    }
  }
}
