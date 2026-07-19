import { describe, expect, it } from 'vitest'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

type DbClient = {
  execute: (sql: string, bindValues?: unknown[]) => Promise<unknown>
  select: <T>(sql: string, bindValues?: unknown[]) => Promise<T[]>
}

function quoteSqlValue(value: unknown) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'NULL'
  return `'${String(value).replace(/'/g, "''")}'`
}

function bindIntoSql(sql: string, bindValues?: unknown[]) {
  if (!bindValues?.length) return sql
  const parts = sql.split('?')
  let output = parts[0] ?? ''
  for (let index = 1; index < parts.length; index += 1) {
    output += quoteSqlValue(bindValues[index - 1]) + (parts[index] ?? '')
  }
  return output
}

function runSqlite(dbPath: string, script: string) {
  return new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn('sqlite3', ['-bail', dbPath], { stdio: ['pipe', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (data) => (stdout += data.toString()))
    child.stderr.on('data', (data) => (stderr += data.toString()))
    child.on('exit', (code) => resolve({ code: code ?? 1, stdout, stderr }))
    child.stdin.end(script)
  })
}

function createSqliteCliDb(dbPath: string): DbClient {
  return {
    async execute(sql: string, bindValues?: unknown[]) {
      const result = await runSqlite(
        dbPath,
        `PRAGMA foreign_keys = ON;\n${bindIntoSql(sql, bindValues)}`
      )
      if (result.code !== 0) throw new Error(result.stderr || 'sqlite3 execute failed')
    },
    async select<T>(sql: string, bindValues?: unknown[]) {
      const result = await runSqlite(
        dbPath,
        ['.mode json', '.headers off', bindIntoSql(sql, bindValues)].join('\n') + '\n'
      )
      if (result.code !== 0) throw new Error(result.stderr || 'sqlite3 select failed')
      return result.stdout.trim() ? JSON.parse(result.stdout) as T[] : []
    }
  }
}

describe('folders repo roundtrip (sqlite:tracer.db)', () => {
  it('creates, renames, moves sets, and returns sets to root when deleted', async () => {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tracer-folders-'))
    try {
      const dbPath = path.join(tmpDir, 'test.db')
      const migrations = await Promise.all(
        ['001_core.sql', '004_folders.sql'].map((name) =>
          readFile(path.resolve(process.cwd(), 'src-tauri', 'migrations', name), 'utf8')
        )
      )
      const migrationResult = await runSqlite(dbPath, migrations.join('\n'))
      expect(migrationResult.code).toBe(0)

      const db = createSqliteCliDb(dbPath)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, terms_json)
         VALUES ('set-1', 'Biology', '[]'), ('set-2', 'Chemistry', '[]');`
      )

      const { createFoldersRepo } = await import('../../src/composables/db/repos/folders.repo')
      const { createSetsRepo } = await import('../../src/composables/db/repos/sets.repo')
      const foldersRepo = createFoldersRepo(db)
      const setsRepo = createSetsRepo(db)

      await foldersRepo.create({ id: 'folder-1', name: 'Science' })
      expect((await foldersRepo.list()).map((folder) => folder.name)).toContain('Science')

      await foldersRepo.rename('folder-1', 'STEM')
      expect((await foldersRepo.get('folder-1'))?.name).toBe('STEM')

      await foldersRepo.moveSets(['set-1', 'set-2'], 'folder-1')
      expect((await setsRepo.list()).map((set) => set.folderId)).toEqual([
        'folder-1',
        'folder-1'
      ])

      await foldersRepo.moveSets(['set-1'], null)
      expect((await setsRepo.get('set-1'))?.folderId).toBeNull()

      await foldersRepo.delete('folder-1')
      expect((await setsRepo.get('set-2'))?.folderId).toBeNull()
    } finally {
      await rm(tmpDir, { recursive: true, force: true })
    }
  })
})
