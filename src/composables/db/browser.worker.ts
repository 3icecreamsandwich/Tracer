import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'

// One schema for native and browser storage, including future migrations.
const migrations = import.meta.glob('../../../src-tauri/migrations/*.sql', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const PAGE_SIZE = 4096
let sqlite: SqlJsStatic
let db: Database | null = null
let storage: IDBDatabase
let revision = -1
let previous = new Uint8Array()

function result<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
function done(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = transaction.onabort = () => reject(transaction.error ?? new Error('Browser storage write failed.'))
  })
}
async function loadLatest() {
  const tx = storage.transaction('pages', 'readonly')
  const store = tx.objectStore('pages')
  const meta = await result(store.get('meta')) as { revision: number; length: number } | undefined
  if (db && meta?.revision === revision) return
  const pages = meta ? await result(store.getAll(IDBKeyRange.bound(0, Math.ceil(meta.length / PAGE_SIZE)))) : []
  const bytes = new Uint8Array(meta?.length ?? 0)
  pages.forEach((page: Uint8Array, index: number) => bytes.set(page, index * PAGE_SIZE))
  db?.close()
  db = new sqlite.Database(bytes.length ? bytes : undefined)
  db.run('PRAGMA foreign_keys = ON;')
  previous = bytes
  revision = meta?.revision ?? 0
}
async function persist() {
  const bytes = db!.export()
  // sql.js reopens the connection after export; restore connection-local PRAGMAs.
  db!.run('PRAGMA foreign_keys = ON;')
  const tx = storage.transaction('pages', 'readwrite')
  const committed = done(tx)
  const store = tx.objectStore('pages')
  for (let offset = 0; offset < bytes.length; offset += PAGE_SIZE) {
    const page = bytes.subarray(offset, offset + PAGE_SIZE)
    const old = previous.subarray(offset, offset + PAGE_SIZE)
    if (page.length !== old.length || page.some((value, i) => value !== old[i])) store.put(page, offset / PAGE_SIZE)
  }
  for (let index = Math.ceil(bytes.length / PAGE_SIZE); index < Math.ceil(previous.length / PAGE_SIZE); index++) store.delete(index)
  store.put({ revision: revision + 1, length: bytes.length }, 'meta')
  try { await committed } catch (error) {
    // Never report a save as successful if persistence failed (quota/private mode).
    db!.close(); db = null; revision = -1
    throw error
  }
  revision++
  previous = bytes
}
async function handle(message: { op: string; name: string; sql?: string; bindValues?: any[] }) {
  if (message.op === 'init') {
    sqlite = await initSqlJs({ locateFile: () => wasmUrl })
    const opening = indexedDB.open(message.name, 1)
    opening.onupgradeneeded = () => opening.result.createObjectStore('pages')
    storage = await result(opening)
    storage.onversionchange = () => { storage.close(); db?.close(); db = null }
  }
  if (message.op === 'close') { storage.close(); db?.close(); db = null; return true }
  return navigator.locks.request(message.name, async () => {
    await loadLatest()
    if (message.op === 'init') {
      const version = Number(db!.exec('PRAGMA user_version')[0]?.values[0]?.[0] ?? 0)
      const scripts = Object.entries(migrations).sort(([a], [b]) => a.localeCompare(b))
      if (!scripts.length) throw new Error('Browser database migrations are missing.')
      if (version > scripts.length) throw new Error('This library needs a newer version of Tracer. Reload the app.')
      if (version < scripts.length) {
        db!.run('BEGIN;')
        try {
          for (const [, sql] of scripts.slice(version)) db!.run(sql)
          db!.run(`PRAGMA user_version = ${scripts.length}; COMMIT;`)
        } catch (error) { db!.run('ROLLBACK;'); throw error }
        await persist()
      }
      return true
    }
    if (message.op === 'select') {
      const statement = db!.prepare(message.sql!, message.bindValues)
      try {
        const rows = []
        while (statement.step()) rows.push(statement.getAsObject())
        return rows
      } finally { statement.free() }
    }
    db!.run(message.sql!, message.bindValues)
    const rowsAffected = db!.getRowsModified()
    await persist()
    return { rowsAffected }
  })
}
let queue = Promise.resolve()
self.onmessage = ({ data }) => {
  queue = queue.then(async () => {
    try { self.postMessage({ id: data.id, result: await handle(data) }) }
    catch (error) { self.postMessage({ id: data.id, error: error instanceof Error ? error.message : 'Could not save browser data.' }) }
  })
}
