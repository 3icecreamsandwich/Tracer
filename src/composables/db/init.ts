import Database from '@tauri-apps/plugin-sql'
import type { DbClient } from './types'

const DB_URL = 'sqlite:tracer.db'

let dbPromise: Promise<DbClient> | null = null

function getPreloadedTracerDb(): Promise<DbClient> {
  // Tauri preloads this database before the WebView starts. Reuse that native
  // pool: calling Database.load on every WebView refresh replaces the registry
  // entry without closing the prior pool, leaking SQLite connections each time.
  return Promise.resolve(Database.get(DB_URL) as unknown as DbClient)
}

export function useTracerDb(): Promise<DbClient> {
  if (!dbPromise) {
    dbPromise = getPreloadedTracerDb()
  }
  return dbPromise
}

/**
 * Recreate Tracer's native pool after the user explicitly deletes local data.
 * Normal startup and WebView refreshes must always use the preloaded pool.
 */
export function reopenTracerDb(): Promise<DbClient> {
  dbPromise = Database.load(DB_URL) as unknown as Promise<DbClient>
  return dbPromise
}

export async function closeTracerDb(): Promise<void> {
  const pending = dbPromise ?? getPreloadedTracerDb()
  dbPromise = null
  const db = await pending
  await db.close(DB_URL)
}

export function __resetTracerDbForTests() {
  dbPromise = null
}
