import type {
  DbClient,
  FlashcardSet,
  FlashcardSetListItem,
  Term,
  Uuid
} from '../types'
import { nowIsoSql } from '../sql'

type DbSetRow = {
  id: string
  folder_id: string | null
  title: string
  description: string | null
  icon_key: string | null
  icon_tone: string | null
  terms_json: string
  created_at: string
  updated_at: string
}

type DbSetListRow = {
  id: string
  folder_id: string | null
  title: string
  description: string | null
  icon_key: string | null
  icon_tone: string | null
  terms_json: string
  created_at: string
  updated_at: string
}

function rowToSetListItem(row: DbSetListRow): FlashcardSetListItem {
  let cardCount = 0
  try {
    const terms = JSON.parse(row.terms_json)
    cardCount = Array.isArray(terms) ? terms.length : 0
  } catch {
    cardCount = 0
  }
  return {
    id: row.id as Uuid,
    folderId: row.folder_id as Uuid | null,
    title: row.title,
    description: row.description ?? null,
    iconKey: row.icon_key ?? null,
    iconTone: row.icon_tone ?? null,
    cardCount,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function rowToSet(row: DbSetRow): FlashcardSet {
  return {
    id: row.id as Uuid,
    folderId: row.folder_id as Uuid | null,
    title: row.title,
    description: row.description ?? null,
    iconKey: row.icon_key ?? null,
    iconTone: row.icon_tone ?? null,
    terms: JSON.parse(row.terms_json) as Term[],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export function createSetsRepo(db: DbClient) {
  return {
    async list(): Promise<FlashcardSetListItem[]> {
      const rows = await db.select<DbSetListRow>(
        `SELECT id, folder_id, title, description, icon_key, icon_tone, terms_json, created_at, updated_at
         FROM flashcard_sets
         WHERE hidden_from_library = 0
         ORDER BY updated_at DESC, created_at DESC;`
      )
      return rows.map(rowToSetListItem)
    },

    async get(id: Uuid): Promise<FlashcardSet | null> {
      const rows = await db.select<DbSetRow>(
        `SELECT id, folder_id, title, description, icon_key, icon_tone, terms_json, created_at, updated_at
         FROM flashcard_sets WHERE id = ? LIMIT 1;`,
        [id]
      )
      const row = rows[0]
      if (!row) return null
      return rowToSet(row)
    },

    async create(input: {
      id: Uuid
      title: string
      description?: string | null
      iconKey?: string | null
      iconTone?: string | null
      terms: Term[]
    }): Promise<FlashcardSet> {
      const termsJson = JSON.stringify(input.terms)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, description, icon_key, icon_tone, terms_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ${nowIsoSql()}, ${nowIsoSql()});`,
        [input.id, input.title, input.description ?? null, input.iconKey ?? null, input.iconTone ?? null, termsJson]
      )

      const set = await this.get(input.id)
      if (!set) throw new Error('Failed to create set')
      return set
    },

    async update(input: {
      id: Uuid
      title?: string
      description?: string | null
      iconKey?: string | null
      iconTone?: string | null
      terms?: Term[]
    }): Promise<FlashcardSet> {
      const current = await this.get(input.id)
      if (!current) throw new Error('Set not found')

      const nextTitle = input.title ?? current.title
      const nextDescription =
        input.description === undefined ? current.description : input.description
      const nextTerms = input.terms ?? current.terms
      const nextIconKey = input.iconKey === undefined ? current.iconKey : input.iconKey
      const nextIconTone = input.iconTone === undefined ? current.iconTone : input.iconTone

      await db.execute(
        `UPDATE flashcard_sets
         SET title = ?,
             description = ?,
             icon_key = ?,
             icon_tone = ?,
             terms_json = ?,
             updated_at = ${nowIsoSql()}
         WHERE id = ?;`,
        [nextTitle, nextDescription, nextIconKey, nextIconTone, JSON.stringify(nextTerms), input.id]
      )

      const set = await this.get(input.id)
      if (!set) throw new Error('Failed to update set')
      return set
    },

    async delete(id: Uuid): Promise<void> {
      await db.execute(`DELETE FROM flashcard_sets WHERE id = ?;`, [id])
    },

    async hideFromLibrary(id: Uuid): Promise<void> {
      await db.execute(
        `UPDATE flashcard_sets SET hidden_from_library = 1 WHERE id = ?;`,
        [id]
      )
    },

    async hideManyFromLibrary(ids: Uuid[]): Promise<void> {
      if (ids.length === 0) return
      const placeholders = ids.map(() => '?').join(', ')
      await db.execute(
        `UPDATE flashcard_sets SET hidden_from_library = 1 WHERE id IN (${placeholders});`,
        ids
      )
    }
  }
}
