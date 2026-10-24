import { describe, expect, it } from 'vitest'
import initSqlJs from 'sql.js'
import { readFileSync, readdirSync } from 'node:fs'
import { createSettingsRepo } from '../../src/composables/db/repos/settings.repo'
import type { DbClient } from '../../src/composables/db/types'

describe('settings SQLite writes', () => {
  it('saves Google setup preferences and update preferences with the native schema', async () => {
    const SQL = await initSqlJs()
    const sqlite = new SQL.Database()
    try {
      const directory = new URL('../../src-tauri/migrations/', import.meta.url)
      for (const name of readdirSync(directory).filter(name => name.endsWith('.sql')).sort()) {
        sqlite.run(readFileSync(new URL(name, directory), 'utf8'))
      }
      const db: DbClient = {
        async close() { return true },
        async execute(sql, values) { sqlite.run(sql, values as any) },
        async select<T>(sql: string, values?: unknown[]) {
          const statement = sqlite.prepare(sql)
          try {
            if (values) statement.bind(values as any)
            const rows: T[] = []
            while (statement.step()) rows.push(statement.getAsObject() as T)
            return rows
          } finally { statement.free() }
        },
      }
      const settings = createSettingsRepo(db)
      await settings.set({ startupLockEnabled: false })
      expect((await settings.get()).startupLockEnabled).toBe(false)
      await settings.set({ automaticUpdatesEnabled: false, textScale: 2 })
      expect(await settings.get()).toMatchObject({
        automaticUpdatesEnabled: false, textScale: 2, startupLockEnabled: false,
      })
    } finally { sqlite.close() }
  })
})
