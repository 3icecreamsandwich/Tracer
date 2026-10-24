/** Disposable, account-scoped IndexedDB cache. Never used as proof of a save. */
const memory = new Map<string, unknown>()
let generation = 0
const versions = new Map<string, number>()
const reads = new Map<string, Promise<unknown>>()
const STORAGE_TIMEOUT_MS = 1500
let opening: Promise<IDBDatabase> | undefined
function database() {
  if (opening) return opening
  const attempt = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('tracer-cloud-cache-v1', 1)
    let expired = false
    const timeout = setTimeout(() => {
      expired = true
      reject(new Error('Cloud cache connection timed out'))
    }, STORAGE_TIMEOUT_MS)
    request.onupgradeneeded = () => {
      if (expired) { request.transaction?.abort(); return }
      request.result.createObjectStore('entries')
    }
    request.onsuccess = () => {
      clearTimeout(timeout)
      const db = request.result
      if (expired) { db.close(); return }
      db.onversionchange = () => { db.close(); if (opening === attempt) opening = undefined }
      db.onclose = () => { if (opening === attempt) opening = undefined }
      resolve(db)
    }
    request.onerror = () => { clearTimeout(timeout); reject(request.error) }
  })
  opening = attempt
  void attempt.catch(() => { if (opening === attempt) opening = undefined })
  return attempt
}
export async function readCache<T>(owner: string, key: string): Promise<T | undefined> {
  const scoped = `${owner}:${key}`
  if (memory.has(scoped)) return structuredClone(memory.get(scoped)) as T
  let read = reads.get(scoped)
  if (!read) {
    const epoch = generation
    const version = versions.get(scoped)
    read = (async () => {
      try {
        const db = await database()
        const value = await new Promise<T | undefined>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Cloud cache read timed out')), STORAGE_TIMEOUT_MS)
          let request: IDBRequest
          try { request = db.transaction('entries').objectStore('entries').get(scoped) }
          catch (error) { clearTimeout(timeout); reject(error); return }
          request.onsuccess = () => { clearTimeout(timeout); resolve(request.result) }
          request.onerror = () => { clearTimeout(timeout); reject(request.error) }
        })
        // A save or sign-out while disk was loading takes precedence.
        if (epoch !== generation || version !== versions.get(scoped)) return memory.get(scoped)
        if (value !== undefined) memory.set(scoped, value)
        return value
      } catch { return memory.get(scoped) }
    })().finally(() => { if (reads.get(scoped) === read) reads.delete(scoped) })
    reads.set(scoped, read)
  }
  return structuredClone(await read) as T | undefined
}
export async function writeCache(owner: string, key: string, value: unknown): Promise<void> {
  const scoped = `${owner}:${key}`
  versions.set(scoped, (versions.get(scoped) ?? 0) + 1)
  const snapshot = structuredClone(value)
  memory.set(scoped, snapshot)
  // The server is authoritative. Disk persistence must not delay an acknowledged
  // save or a network response; the in-memory cache is already current.
  void persistCache(scoped, snapshot)
}
async function persistCache(scoped: string, value: unknown): Promise<void> {
  try {
    const db = await database()
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Cloud cache write timed out')), STORAGE_TIMEOUT_MS)
      let tx: IDBTransaction
      try {
        tx = db.transaction('entries', 'readwrite')
        tx.objectStore('entries').put(value, scoped)
      } catch (error) { clearTimeout(timeout); reject(error); return }
      tx.oncomplete = () => { clearTimeout(timeout); resolve() }
      tx.onerror = () => { clearTimeout(timeout); reject(tx.error) }
      tx.onabort = () => { clearTimeout(timeout); reject(tx.error) }
    })
  } catch {
    // A successful server write remains successful if device storage is full.
    console.warn('[Tracer] Persistent cloud cache unavailable')
  }
}
export function clearCloudMemoryCache() { generation++; memory.clear(); versions.clear(); reads.clear() }
