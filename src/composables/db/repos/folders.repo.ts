import type { DbClient, SetFolder, Uuid } from '../types'
import { nowIsoSql } from '../sql'

export type HomeLibraryOrderEntry = {
  kind: 'folder' | 'set'
  id: Uuid
  sortOrder: number
}

type DbHomeLibraryOrderRow = {
  item_kind: 'folder' | 'set'
  item_id: string
  sort_order: number
}

type DbFolderRow = {
  id: string
  name: string
  sort_order: number
  created_at: string
  updated_at: string
}

function rowToFolder(row: DbFolderRow): SetFolder {
  return {
    id: row.id as Uuid,
    name: row.name,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export function createFoldersRepo(db: DbClient) {
  return {
    async list(): Promise<SetFolder[]> {
      const rows = await db.select<DbFolderRow>(
        `SELECT id, name, sort_order, created_at, updated_at
         FROM folders
         ORDER BY sort_order ASC, updated_at DESC, created_at DESC;`
      )
      return rows.map(rowToFolder)
    },

    async create(input: { id: Uuid; name: string }): Promise<SetFolder> {
      const name = input.name.trim()
      if (!name) throw new Error('Folder name is required')
      const orderRows = await db.select<{ next_order: number }>(
        `SELECT COALESCE(MIN(sort_order), 0) - 1 AS next_order FROM folders;`
      )
      const sortOrder = orderRows[0]?.next_order ?? 0
      await db.execute(
        `INSERT INTO folders (id, name, sort_order, created_at, updated_at)
         VALUES (?, ?, ?, ${nowIsoSql()}, ${nowIsoSql()});`,
        [input.id, name, sortOrder]
      )
      const folder = await this.get(input.id)
      if (!folder) throw new Error('Failed to create folder')
      return folder
    },

    async get(id: Uuid): Promise<SetFolder | null> {
      const rows = await db.select<DbFolderRow>(
        `SELECT id, name, sort_order, created_at, updated_at
         FROM folders
         WHERE id = ?
         LIMIT 1;`,
        [id]
      )
      return rows[0] ? rowToFolder(rows[0]) : null
    },

    async rename(id: Uuid, nextName: string): Promise<SetFolder> {
      const name = nextName.trim()
      if (!name) throw new Error('Folder name is required')
      await db.execute(
        `UPDATE folders
         SET name = ?, updated_at = ${nowIsoSql()}
         WHERE id = ?;`,
        [name, id]
      )
      const folder = await this.get(id)
      if (!folder) throw new Error('Folder not found')
      return folder
    },

    async moveSets(setIds: Uuid[], folderId: Uuid | null): Promise<void> {
      const uniqueIds = [...new Set(setIds)]
      if (uniqueIds.length === 0) return
      const placeholders = uniqueIds.map(() => '?').join(', ')
      await db.execute(
        `UPDATE flashcard_sets
         SET folder_id = ?
         WHERE id IN (${placeholders});`,
        [folderId, ...uniqueIds]
      )
    },

    async reorder(folderIds: Uuid[]): Promise<void> {
      for (const [index, id] of folderIds.entries()) {
        await db.execute(`UPDATE folders SET sort_order = ? WHERE id = ?;`, [index, id])
      }
    },

    async listHomeOrder(): Promise<HomeLibraryOrderEntry[]> {
      const rows = await db.select<DbHomeLibraryOrderRow>(
        `SELECT item_kind, item_id, sort_order
         FROM home_library_order
         ORDER BY sort_order ASC, item_kind ASC, item_id ASC;`
      )
      return rows.map((row) => ({
        kind: row.item_kind,
        id: row.item_id as Uuid,
        sortOrder: row.sort_order
      }))
    },

    async reorderHome(entries: Array<{ kind: 'folder' | 'set'; id: Uuid }>): Promise<void> {
      await db.execute(`DELETE FROM home_library_order;`)
      for (const [index, entry] of entries.entries()) {
        await db.execute(
          `INSERT INTO home_library_order (item_kind, item_id, sort_order)
           VALUES (?, ?, ?);`,
          [entry.kind, entry.id, index]
        )
      }
    },

    async delete(id: Uuid): Promise<void> {
      await db.execute(`DELETE FROM folders WHERE id = ?;`, [id])
    }
  }
}
