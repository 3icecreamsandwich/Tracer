import Database from '@tauri-apps/plugin-sql'
import type { DbClient } from './types'

const DB_URL = 'sqlite:tracer.db'

let dbPromise: Promise<DbClient> | null = null

async function loadTracerDb(): Promise<DbClient> {
  // Tauri preloads this database before the WebView starts. Reuse that native
  // pool: calling Database.load on every WebView refresh replaces the registry
  // entry without closing the prior pool, leaking SQLite connections each time.
  const existing = Database.get(DB_URL) as unknown as DbClient
  try {
    await existing.select('SELECT 1 AS ready;')
    return existing
  } catch {
    // An explicit Tracer reset closes the preloaded pool. That is the only case
    // in which this document needs to create a fresh native connection.
    return Database.load(DB_URL) as unknown as Promise<DbClient>
  }
}

export function useTracerDb(): Promise<DbClient> {
  if (!dbPromise) {
    dbPromise = loadTracerDb()
  }
  return dbPromise
}

export async function closeTracerDb(): Promise<void> {
  const pending = dbPromise
  dbPromise = null
  if (!pending) return
  const db = await pending
  await db.close(DB_URL)
}

export function __resetTracerDbForTests() {
  dbPromise = null
}
