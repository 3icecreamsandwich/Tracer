import type {
  DbClient,
  LinkedFolder,
  LinkedFolderFile,
  LinkedFolderFileStatus,
  LinkedFolderStatus,
  Uuid
} from '../types'
import { nowIsoSql } from '../sql'

type DbLinkedFolderRow = {
  set_id: string
  path: string
  status: LinkedFolderStatus
  last_error: string | null
  last_scan_at: string | null
  created_at: string
  updated_at: string
}

type DbLinkedFolderFileRow = {
  set_id: string
  relative_path: string
  size_bytes: number
  content_hash: string | null
  status: LinkedFolderFileStatus
  error: string | null
  discovered_at: string
  processed_at: string | null
}

function rowToLinkedFolder(row: DbLinkedFolderRow): LinkedFolder {
  return {
    setId: row.set_id as Uuid,
    path: row.path,
    status: row.status,
    lastError: row.last_error,
    lastScanAt: row.last_scan_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function rowToLinkedFolderFile(row: DbLinkedFolderFileRow): LinkedFolderFile {
  return {
    setId: row.set_id as Uuid,
    relativePath: row.relative_path,
    sizeBytes: row.size_bytes,
    contentHash: row.content_hash,
    status: row.status,
    error: row.error,
    discoveredAt: row.discovered_at,
    processedAt: row.processed_at
  }
}

export function createLinkedFoldersRepo(db: DbClient) {
  return {
    async list(): Promise<LinkedFolder[]> {
      const rows = await db.select<DbLinkedFolderRow>(
        `SELECT set_id, path, status, last_error, last_scan_at, created_at, updated_at
         FROM linked_folders
         ORDER BY updated_at DESC;`
      )
      return rows.map(rowToLinkedFolder)
    },

    async getBySetId(setId: Uuid): Promise<LinkedFolder | null> {
      const rows = await db.select<DbLinkedFolderRow>(
        `SELECT set_id, path, status, last_error, last_scan_at, created_at, updated_at
         FROM linked_folders
         WHERE set_id = ?
         LIMIT 1;`,
        [setId]
      )
      return rows[0] ? rowToLinkedFolder(rows[0]) : null
    },

    async create(input: { setId: Uuid; path: string }): Promise<LinkedFolder> {
      await db.execute(
        `INSERT INTO linked_folders (
           set_id, path, status, last_error, last_scan_at, created_at, updated_at
         )
         VALUES (?, ?, 'synced', NULL, ${nowIsoSql()}, ${nowIsoSql()}, ${nowIsoSql()});`,
        [input.setId, input.path]
      )
      const linkedFolder = await this.getBySetId(input.setId)
      if (!linkedFolder) throw new Error('Failed to link folder')
      return linkedFolder
    },

    async updateStatus(
      setId: Uuid,
      status: LinkedFolderStatus,
      options: { error?: string | null; scanned?: boolean } = {}
    ): Promise<LinkedFolder | null> {
      await db.execute(
        `UPDATE linked_folders
         SET status = ?,
             last_error = ?,
             last_scan_at = CASE WHEN ? THEN ${nowIsoSql()} ELSE last_scan_at END,
             updated_at = ${nowIsoSql()}
         WHERE set_id = ?;`,
        [status, options.error ?? null, options.scanned === true ? 1 : 0, setId]
      )
      return this.getBySetId(setId)
    },

    async listKnownPaths(setId: Uuid): Promise<Set<string>> {
      const rows = await db.select<{ relative_path: string }>(
        `SELECT relative_path
         FROM linked_folder_files
         WHERE set_id = ?;`,
        [setId]
      )
      return new Set(rows.map((row) => row.relative_path))
    },

    async listKnownHashes(setId: Uuid): Promise<Set<string>> {
      const rows = await db.select<{ content_hash: string }>(
        `SELECT DISTINCT content_hash
         FROM linked_folder_files
         WHERE set_id = ? AND content_hash IS NOT NULL;`,
        [setId]
      )
      return new Set(rows.map((row) => row.content_hash))
    },

    async listFiles(setId: Uuid): Promise<LinkedFolderFile[]> {
      const rows = await db.select<DbLinkedFolderFileRow>(
        `SELECT set_id, relative_path, size_bytes, content_hash, status, error, discovered_at, processed_at
         FROM linked_folder_files
         WHERE set_id = ?
         ORDER BY discovered_at DESC, relative_path ASC;`,
        [setId]
      )
      return rows.map(rowToLinkedFolderFile)
    },

    async recordFiles(
      setId: Uuid,
      files: Array<{
        relativePath: string
        sizeBytes: number
        contentHash?: string | null
        status: LinkedFolderFileStatus
        error?: string | null
      }>
    ): Promise<void> {
      for (const file of files) {
        await db.execute(
          `INSERT OR IGNORE INTO linked_folder_files (
             set_id, relative_path, size_bytes, content_hash, status, error, discovered_at, processed_at
           )
           VALUES (
             ?, ?, ?, ?, ?, ?, ${nowIsoSql()},
             CASE WHEN ? = 'processed' THEN ${nowIsoSql()} ELSE NULL END
           );`,
          [
            setId,
            file.relativePath,
            file.sizeBytes,
            file.contentHash ?? null,
            file.status,
            file.error ?? null,
            file.status
          ]
        )
      }
    },

    async delete(setId: Uuid): Promise<void> {
      await db.execute(`DELETE FROM linked_folders WHERE set_id = ?;`, [setId])
    }
  }
}
