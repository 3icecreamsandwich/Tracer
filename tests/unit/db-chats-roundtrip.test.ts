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
  if (typeof value === 'boolean') return value ? '1' : '0'
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
      const result = await runSqlite(dbPath, `PRAGMA foreign_keys = ON;\n${bindIntoSql(sql, bindValues)}`)
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

async function applyMigrations(dbPath: string) {
  const migrations = await Promise.all(
    ['001_core.sql', '002_language.sql', '003_chats.sql', '004_folders.sql'].map((name) =>
      readFile(path.resolve(process.cwd(), 'src-tauri', 'migrations', name), 'utf8')
    )
  )
  const result = await runSqlite(dbPath, migrations.join('\n'))
  if (result.code !== 0) throw new Error(result.stderr || 'sqlite3 migrations failed')
}

describe('chats repo roundtrip (sqlite:tracer.db)', () => {
  it('creates, orders, updates, opens, and deletes saved chats', async () => {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tracer-chats-'))
    try {
      const dbPath = path.join(tmpDir, 'test.db')
      await applyMigrations(dbPath)
      const db = createSqliteCliDb(dbPath)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, terms_json)
         VALUES ('set-1', 'Biology', '[]');`
      )

      const { createChatsRepo } = await import('../../src/composables/db/repos/chats.repo')
      const repo = createChatsRepo(db)
      const firstPayload = {
        version: 1 as const,
        messages: [
          { role: 'user' as const, content: 'What is mitosis?' },
          { role: 'assistant' as const, content: 'Cell division.' }
        ]
      }

      await repo.create({
        id: 'chat-1',
        setId: 'set-1',
        title: 'Understanding Mitosis',
        payload: firstPayload
      })
      await repo.create({
        id: 'chat-2',
        setId: 'set-1',
        title: 'Cell Membranes',
        payload: {
          version: 1,
          messages: [{ role: 'user', content: 'What is a cell membrane?' }]
        }
      })

      await db.execute(
        `UPDATE chats
         SET last_opened_at = CASE id
           WHEN 'chat-1' THEN '2026-01-01T00:00:00.000Z'
           ELSE '2026-02-01T00:00:00.000Z'
         END;`
      )
      expect((await repo.listBySet('set-1')).map((chat) => chat.id)).toEqual([
        'chat-2',
        'chat-1'
      ])

      const updatedPayload = {
        version: 1 as const,
        messages: [
          ...firstPayload.messages,
          { role: 'user' as const, content: 'What happens next?' }
        ]
      }
      await repo.updateMessages('chat-1', updatedPayload)
      expect((await repo.get('chat-1'))?.payload).toEqual(updatedPayload)

      await repo.touchOpened('chat-1')
      expect((await repo.get('chat-1'))?.lastOpenedAt).not.toBe('2026-01-01T00:00:00.000Z')

      await repo.delete('chat-2')
      expect(await repo.get('chat-2')).toBeNull()

      await db.execute(`DELETE FROM flashcard_sets WHERE id = 'set-1';`)
      expect(await repo.get('chat-1')).toBeNull()
    } finally {
      await rm(tmpDir, { recursive: true, force: true })
    }
  })
})
