import { describe, expect, it } from 'vitest'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

type DbClient = {
  execute: (sql: string, bindValues?: unknown[]) => Promise<unknown>
  select: <T>(sql: string, bindValues?: unknown[]) => Promise<T[]>
}

function quote(value: unknown) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return String(value)
  return `'${String(value).replace(/'/g, "''")}'`
}

function bind(sql: string, values: unknown[] = []) {
  const parts = sql.split('?')
  return parts.reduce(
    (output, part, index) => output + (index > 0 ? quote(values[index - 1]) : '') + part,
    ''
  )
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

function sqliteClient(dbPath: string): DbClient {
  return {
    async execute(sql, values) {
      const result = await runSqlite(dbPath, `PRAGMA foreign_keys = ON;\n${bind(sql, values)}`)
      if (result.code !== 0) throw new Error(result.stderr)
    },
    async select<T>(sql: string, values?: unknown[]) {
      const result = await runSqlite(
        dbPath,
        `.mode json\n.headers off\n${bind(sql, values)}\n`
      )
      if (result.code !== 0) throw new Error(result.stderr)
      return result.stdout.trim() ? JSON.parse(result.stdout) as T[] : []
    }
  }
}

describe('linked folders repo roundtrip (sqlite:tracer.db)', () => {
  it('tracks paths and hashes once, updates status, and cascades with the set', async () => {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tracer-linked-folders-'))
    try {
      const dbPath = path.join(tmpDir, 'test.db')
      const migrations = await Promise.all(
        ['001_core.sql', '004_folders.sql', '005_linked_folders.sql'].map((name) =>
          readFile(path.resolve(process.cwd(), 'src-tauri', 'migrations', name), 'utf8')
        )
      )
      expect((await runSqlite(dbPath, migrations.join('\n'))).code).toBe(0)

      const db = sqliteClient(dbPath)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, terms_json)
         VALUES ('set-1', 'Linked notes', '[]');`
      )

      const { createLinkedFoldersRepo } = await import(
        '../../src/composables/db/repos/linked-folders.repo'
      )
      const repo = createLinkedFoldersRepo(db)
      await repo.create({ setId: 'set-1', path: '/notes' })
      await repo.recordFiles('set-1', [
        {
          relativePath: 'chapter/one.txt',
          sizeBytes: 42,
          contentHash: 'hash-one',
          status: 'processed'
        }
      ])
      await repo.recordFiles('set-1', [
        {
          relativePath: 'chapter/one.txt',
          sizeBytes: 99,
          contentHash: 'changed',
          status: 'processed'
        }
      ])

      expect(await repo.listKnownPaths('set-1')).toEqual(new Set(['chapter/one.txt']))
      expect(await repo.listKnownHashes('set-1')).toEqual(new Set(['hash-one']))
      expect((await repo.listFiles('set-1'))[0]).toEqual(
        expect.objectContaining({
          sizeBytes: 42,
          contentHash: 'hash-one',
          status: 'processed'
        })
      )

      expect((await repo.updateStatus('set-1', 'error', { error: 'offline' }))?.lastError)
        .toBe('offline')

      await db.execute(`DELETE FROM flashcard_sets WHERE id = 'set-1';`)
      expect(await repo.getBySetId('set-1')).toBeNull()
      expect(await repo.listFiles('set-1')).toEqual([])
    } finally {
      await rm(tmpDir, { recursive: true, force: true })
    }
  })
})
