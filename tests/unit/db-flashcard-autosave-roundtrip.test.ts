import { describe, expect, it } from 'vitest'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

import type { DbClient } from '../../src/composables/db/types'

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

async function applyMigrations(dbPath: string) {
  const names = [
    '001_core.sql',
    '002_language.sql',
    '003_chats.sql',
    '004_folders.sql',
    '005_linked_folders.sql',
    '006_set_icons.sql',
    '007_folder_order.sql',
    '008_set_icon_tone.sql',
    '009_text_scale.sql',
    '010_home_library_order.sql',
    '011_expand_text_scale.sql',
    '012_flashcard_autosave.sql',
    '013_flashcard_score_autosave.sql',
    '014_practice_autosave.sql',
    '015_floating_chat.sql'
  ]
  const migrations = await Promise.all(
    names.map((name) => readFile(path.resolve(process.cwd(), 'src-tauri', 'migrations', name), 'utf8'))
  )
  const result = await runSqlite(dbPath, migrations.join('\n'))
  if (result.code !== 0) throw new Error(result.stderr || 'sqlite3 migrations failed')
}

describe('flashcard autosave persistence (sqlite:tracer.db)', () => {
  it('persists the current term per set and the preferred front side', async () => {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tracer-flashcard-autosave-'))
    try {
      const dbPath = path.join(tmpDir, 'test.db')
      await applyMigrations(dbPath)
      const db = createSqliteCliDb(dbPath)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, terms_json)
         VALUES ('set-1', 'Biology', '[]');`
      )

      const { createFlashcardProgressRepo } = await import(
        '../../src/composables/db/repos/flashcard-progress.repo'
      )
      const { createSettingsRepo } = await import(
        '../../src/composables/db/repos/settings.repo'
      )
      const progressRepo = createFlashcardProgressRepo(db)
      const settingsRepo = createSettingsRepo(db)

      expect(await progressRepo.get('set-1')).toBeNull()
      await progressRepo.save('set-1', {
        currentTermId: 'term-1',
        correctTermIds: ['term-0']
      })
      expect(await progressRepo.get('set-1')).toEqual({
        currentTermId: 'term-1',
        correctTermIds: ['term-0']
      })
      await progressRepo.save('set-1', {
        currentTermId: 'term-2',
        correctTermIds: ['term-0', 'term-1']
      })
      expect(await progressRepo.get('set-1')).toEqual({
        currentTermId: 'term-2',
        correctTermIds: ['term-0', 'term-1']
      })

      expect((await settingsRepo.get()).flashcardsDefinitionFirst).toBe(false)
      expect((await settingsRepo.get()).floatingChatEnabled).toBe(true)
      await settingsRepo.set({ flashcardsDefinitionFirst: true })
      expect((await settingsRepo.get()).flashcardsDefinitionFirst).toBe(true)
      await settingsRepo.set({ floatingChatEnabled: false })
      expect((await settingsRepo.get()).floatingChatEnabled).toBe(false)

      await db.execute(`DELETE FROM flashcard_sets WHERE id = 'set-1';`)
      expect(await progressRepo.get('set-1')).toBeNull()
    } finally {
      await rm(tmpDir, { recursive: true, force: true })
    }
  })

  it('persists a Practice question, question order, and completed ratio state', async () => {
    const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tracer-practice-autosave-'))
    try {
      const dbPath = path.join(tmpDir, 'test.db')
      await applyMigrations(dbPath)
      const db = createSqliteCliDb(dbPath)
      await db.execute(
        `INSERT INTO flashcard_sets (id, title, terms_json, updated_at)
         VALUES ('set-1', 'Biology', '[]', '2026-08-09T12:00:00.000Z');`
      )

      const { createPracticeProgressRepo } = await import(
        '../../src/composables/db/repos/practice-progress.repo'
      )
      const repo = createPracticeProgressRepo(db)
      const questions = [
        {
          id: 'written:term-1',
          kind: 'written' as const,
          prompt: 'Define cell.',
          answer: 'The basic unit of life.',
          termId: 'term-1'
        },
        {
          id: 'tf:term-2:t:term-2',
          kind: 'true_false' as const,
          prompt: 'True or false?',
          answer: true,
          termId: 'term-2'
        }
      ]

      expect(await repo.get('set-1')).toBeNull()
      await repo.save('set-1', {
        setUpdatedAt: '2026-08-09T12:00:00.000Z',
        currentQuestionId: questions[1]!.id,
        questions,
        answersByQuestionId: { [questions[0]!.id]: true }
      })
      expect(await repo.get('set-1')).toEqual({
        setUpdatedAt: '2026-08-09T12:00:00.000Z',
        currentQuestionId: questions[1]!.id,
        questions,
        answersByQuestionId: { [questions[0]!.id]: true }
      })

      await db.execute(`DELETE FROM flashcard_sets WHERE id = 'set-1';`)
      expect(await repo.get('set-1')).toBeNull()
    } finally {
      await rm(tmpDir, { recursive: true, force: true })
    }
  })
})
