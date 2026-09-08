import type { DbClient } from './types'
import { browserStorageKey } from '../platform/web'
import { getSupabaseClient, isSupabaseConfigured } from '../auth/client'

const clients = new Map<string, Promise<DbClient>>()

export async function browserDatabaseName(): Promise<string> {
  const session = isSupabaseConfigured() ? (await getSupabaseClient().auth.getSession()).data.session : null
  return browserStorageKey(`library:${session?.user.id ?? 'guest'}`)
}

export async function openBrowserDb(): Promise<DbClient> {
  const name = await browserDatabaseName()
  if (!clients.has(name)) {
    const opening = createBrowserClient(name).catch((error) => { clients.delete(name); throw error })
    clients.set(name, opening)
  }
  return clients.get(name)!
}

async function createBrowserClient(name: string): Promise<DbClient> {
  if (!globalThis.indexedDB || !navigator.locks) {
    throw new Error('Tracer needs browser storage and a secure connection. Open it over HTTPS in an up-to-date browser.')
  }
  const worker = new Worker(new URL('./browser.worker.ts', import.meta.url), { type: 'module' })
  let nextId = 0
  let closed = false
  const pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>()
  worker.onmessage = ({ data }) => {
    const request = pending.get(data.id)
    if (!request) return
    pending.delete(data.id)
    if (data.error) request.reject(new Error(data.error))
    else request.resolve(data.result)
  }
  worker.onerror = () => {
    closed = true
    for (const request of pending.values()) request.reject(new Error('Browser database could not start. Reload Tracer to try again.'))
    pending.clear()
    clients.delete(name)
    worker.terminate()
  }
  function request(op: string, sql?: string, bindValues?: unknown[]): Promise<any> {
    if (closed) return Promise.reject(new Error('Database is closed. Reload Tracer.'))
    return new Promise((resolve, reject) => {
      const id = ++nextId
      pending.set(id, { resolve, reject })
      worker.postMessage({ id, op, name, sql, bindValues })
    })
  }
  try { await request('init') } catch (error) { worker.terminate(); throw error }
  return {
    select: (sql, values) => request('select', sql, values),
    execute: (sql, values) => request('execute', sql, values),
    close: async () => {
      if (closed) return true
      await request('close')
      closed = true
      worker.terminate()
      clients.delete(name)
      return true
    },
  }
}

export async function resetBrowserDb(): Promise<void> {
  const name = await browserDatabaseName()
  if (clients.has(name)) await (await clients.get(name)!).close()
  await navigator.locks.request(name, () => new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('Close other Tracer tabs before resetting this browser.'))
  }))
}
