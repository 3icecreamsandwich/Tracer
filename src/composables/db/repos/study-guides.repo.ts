import type { DbClient, StudyGuide, Uuid } from '../types'
import { nowIsoSql } from '../sql'

type DbStudyGuideRow = {
  id: string
  set_id: string
  markdown: string
  created_at: string
}

export function createStudyGuidesRepo(db: DbClient) {
  return {
    async create(input: { id: Uuid; setId: Uuid; markdown: string }): Promise<StudyGuide> {
      await db.execute(
        `INSERT INTO study_guides (id, set_id, markdown, created_at)
         VALUES (?, ?, ?, ${nowIsoSql()});`,
        [input.id, input.setId, input.markdown]
      )
      const guide = await this.getBySetId(input.setId)
      if (!guide) throw new Error('Failed to create study guide')
      return guide
    },

    async getBySetId(setId: Uuid): Promise<StudyGuide | null> {
      const rows = await db.select<DbStudyGuideRow>(
        `SELECT id, set_id, markdown, created_at
         FROM study_guides
         WHERE set_id = ?
         ORDER BY created_at DESC
         LIMIT 1;`,
        [setId]
      )
      const row = rows[0]
      if (!row) return null
      return {
        id: row.id as Uuid,
        setId: row.set_id as Uuid,
        markdown: row.markdown,
        createdAt: row.created_at
      }
    },

    async update(input: { id: Uuid; markdown: string }): Promise<StudyGuide> {
      await db.execute(
        `UPDATE study_guides
         SET markdown = ?
         WHERE id = ?;`,
        [input.markdown, input.id]
      )
      const rows = await db.select<DbStudyGuideRow>(
        `SELECT id, set_id, markdown, created_at
         FROM study_guides
         WHERE id = ?
         LIMIT 1;`,
        [input.id]
      )
      const row = rows[0]
      if (!row) throw new Error('Failed to update study guide')
      return {
        id: row.id as Uuid,
        setId: row.set_id as Uuid,
        markdown: row.markdown,
        createdAt: row.created_at
      }
    }
  }
}
