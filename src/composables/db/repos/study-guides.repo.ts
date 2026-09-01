import type { DbClient, StudyGuide, StudyGuideSummary, Uuid } from '../types'
import { nowIsoSql } from '../sql'

type DbStudyGuideRow = {
  id: string
  set_id: string
  markdown: string
  created_at: string
}

type DbStudyGuideSummaryRow = Omit<DbStudyGuideRow, 'markdown'>

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

    async listSummaries(): Promise<StudyGuideSummary[]> {
      const rows = await db.select<DbStudyGuideSummaryRow>(
        `SELECT id, set_id, created_at
         FROM (
           SELECT id, set_id, created_at,
                  ROW_NUMBER() OVER (
                    PARTITION BY set_id
                    ORDER BY created_at DESC, id DESC
                  ) AS row_number
           FROM study_guides
         )
         WHERE row_number = 1
         ORDER BY created_at DESC;`
      )
      return rows.map((row) => ({
        id: row.id as Uuid,
        setId: row.set_id as Uuid,
        createdAt: row.created_at
      }))
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
