import type { DbClient, Uuid } from '../types'

type DbFlashcardProgressRow = {
  current_term_id: string
  correct_term_ids_json: string
}

export type FlashcardProgress = {
  currentTermId: Uuid
  correctTermIds: Uuid[]
}

function parseCorrectTermIds(value: string): Uuid[] {
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is Uuid => typeof id === 'string')
  } catch {
    return []
  }
}

export function createFlashcardProgressRepo(db: DbClient) {
  return {
    async get(setId: Uuid): Promise<FlashcardProgress | null> {
      const rows = await db.select<DbFlashcardProgressRow>(
        `SELECT current_term_id, correct_term_ids_json
         FROM flashcard_progress
         WHERE set_id = ?
         LIMIT 1;`,
        [setId]
      )
      const row = rows[0]
      if (!row) return null
      return {
        currentTermId: row.current_term_id as Uuid,
        correctTermIds: parseCorrectTermIds(row.correct_term_ids_json)
      }
    },

    async save(setId: Uuid, progress: FlashcardProgress): Promise<void> {
      await db.execute(
        `INSERT INTO flashcard_progress (
           set_id,
           current_term_id,
           correct_term_ids_json
         )
         VALUES (?, ?, ?)
         ON CONFLICT(set_id) DO UPDATE SET
           current_term_id = excluded.current_term_id,
           correct_term_ids_json = excluded.correct_term_ids_json,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now');`,
        [setId, progress.currentTermId, JSON.stringify(progress.correctTermIds)]
      )
    }
  }
}
