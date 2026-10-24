import type { DbClient } from '../db/types'
import { createProfileRepo } from '../db/repos/profile.repo'
import { getSupabaseClient, isSupabaseConfigured } from '../auth/client'
import { restoreAuthSession } from '../auth/session'
import { hasTauriRuntime } from '../tauri'
import { invalidateCachedHomeDashboard } from '../home-dashboard-cache'
import { readCache, writeCache } from './cache'

export type Kind = 'set' | 'guide' | 'folder' | 'order' | 'preferences'
export type CloudRow<T = any> = { kind: Kind; id: string; payload: T; revision: number; deleted: boolean }
export const cloudLibraryEnabled = () => isSupabaseConfigured()
export async function libraryOwner(db: DbClient) {
  const profile = await createProfileRepo(db).get()
  if (!profile?.supabaseUserId) throw new Error('Sign in to access your cloud library.')
  return profile.supabaseUserId
}
export async function authenticatedLibrary(owner: string) {
  const client = getSupabaseClient()
  let { data: { session }, error } = await client.auth.getSession()
  if (error) throw error
  if (hasTauriRuntime() && (!session || (session.expires_at ?? 0) * 1000 < Date.now() + 30_000)) {
    await restoreAuthSession({ waitForProviderKeySync: false })
    const restored = await client.auth.getSession()
    if (restored.error) throw restored.error
    session = restored.data.session
  }
  if (!session || session.user.id !== owner) throw new Error('Reconnect your account to save changes.')
  return client
}
function changed(kind?: Kind, id?: string) {
  invalidateCachedHomeDashboard()
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('tracer:cloud-library-changed', { detail: { kind, id } }))
}
const pending = new Map<string, Promise<any>>()
const refreshed = new Map<string, number>()
const detailRequests = new Map<string, Promise<any>>()
let mutationVersion = 0
async function fetchList(owner: string, kind: Kind): Promise<CloudRow[]> {
  const key = `${owner}:${kind}`
  if (pending.has(key)) return pending.get(key)!
  const request = (async () => {
    const client = await authenticatedLibrary(owner)
    // A mutation during a paginated read invalidates that snapshot. Retry rather
    // than replacing a newly saved item with an older server response.
    for (let attempt = 0; attempt < 3; attempt++) {
      const version = mutationVersion
      const rows: CloudRow[] = []
      for (let offset = 0; ; offset += 500) {
        const { data, error } = await client.from('cloud_library_summaries').select('kind,id,payload,revision,deleted')
          .eq('owner_id', owner).eq('kind', kind).order('id').range(offset, offset + 499)
        if (error) throw error
        rows.push(...data as CloudRow[])
        if (data.length < 500) break
      }
      if (version !== mutationVersion) continue
      const old = await readCache(owner, `list:${kind}`)
      if (version !== mutationVersion) continue
      await writeCache(owner, `list:${kind}`, rows)
      refreshed.set(key, Date.now())
      if (JSON.stringify(old) !== JSON.stringify(rows)) changed(kind)
      return await readCache<CloudRow[]>(owner, `list:${kind}`) ?? rows
    }
    const cached = await readCache<CloudRow[]>(owner, `list:${kind}`)
    if (cached) return cached
    throw new Error('The library changed while loading. Try opening it again.')
  })().finally(() => pending.delete(key))
  pending.set(key, request)
  return request
}
export async function listRows(db: DbClient, kind: Kind, fresh = false): Promise<CloudRow[]> {
  const owner = await libraryOwner(db)
  const cached = await readCache<CloudRow[]>(owner, `list:${kind}`)
  if (!fresh && cached) {
    if (Date.now() - (refreshed.get(`${owner}:${kind}`) ?? 0) > 30_000) void fetchList(owner, kind).catch(() => {})
    return cached.filter(row => !row.deleted)
  }
  await (await import('./migrate')).importLegacyLibrary(db)
  return (await fetchList(owner, kind)).filter(row => !row.deleted)
}
export async function getRow<T>(db: DbClient, kind: Kind, id: string, fresh = false): Promise<CloudRow<T> | null> {
  const owner = await libraryOwner(db)
  const cached = await readCache<CloudRow<T> | null>(owner, `${kind}:${id}`)
  const summaries = await readCache<CloudRow[]>(owner, `list:${kind}`)
  const summary = summaries?.find(row => row.id === id)
  if (!fresh && cached !== undefined && (!summary || cached?.revision === summary.revision)) {
    const key = `${owner}:${kind}:${id}`
    if (Date.now() - (refreshed.get(key) ?? 0) > 30_000) void getRow<T>(db, kind, id, true).catch(() => {})
    return cached?.deleted ? null : cached
  }
  if (!fresh && summary && !['set', 'guide'].includes(kind)) return summary.deleted ? null : summary as CloudRow<T>
  const key = `${owner}:${kind}:${id}`
  if (detailRequests.has(key)) return detailRequests.get(key)!
  const request = (async () => {
    await (await import('./migrate')).importLegacyLibrary(db)
    const client = await authenticatedLibrary(owner)
    const version = mutationVersion
    const { data, error } = await client.from('cloud_library_items').select('kind,id,payload,revision,deleted')
      .eq('owner_id', owner).eq('kind', kind).eq('id', id).maybeSingle()
    if (error) throw error
    if (version !== mutationVersion) {
      const latest = await readCache<CloudRow<T> | null>(owner, `${kind}:${id}`)
      if (latest !== undefined) return latest?.deleted ? null : latest
      throw new Error('The library changed while loading. Try opening it again.')
    }
    {
      await writeCache(owner, `${kind}:${id}`, data)
      refreshed.set(key, Date.now())
      if (cached !== undefined && JSON.stringify(cached) !== JSON.stringify(data)) changed(kind, id)
    }
    return data?.deleted ? null : data as CloudRow<T> | null
  })().finally(() => detailRequests.delete(key))
  detailRequests.set(key, request)
  try { return await request } catch (error) {
    if (!fresh && cached !== undefined) return cached?.deleted ? null : cached
    throw error
  }
}

export async function saveRow<T>(db: DbClient, kind: Kind, id: string, payload: T, revision: number, deleted = false): Promise<CloudRow<T>> {
  const owner = await libraryOwner(db)
  await (await import('./migrate')).importLegacyLibrary(db)
  const client = await authenticatedLibrary(owner)
  const { data, error } = await client.rpc('save_cloud_library_item', {
    item_kind: kind, item_id: id, item_payload: payload, expected_revision: revision, item_deleted: deleted,
  })
  if (error) {
    if (error.code === '40001') throw new Error('This item changed on another device. Reopen it before saving; your draft is still here.')
    throw new Error(error.message || 'Could not save to the cloud. Your changes have not been saved.')
  }
  const row = data as CloudRow<T>
  mutationVersion++
  await writeCache(owner, `${kind}:${id}`, row)
  const rows = await readCache<CloudRow[]>(owner, `list:${kind}`)
  // Never manufacture a complete collection from one saved item.
  if (rows) {
    const summary = structuredClone(row) as CloudRow
    if (kind === 'set') {
      summary.payload.cardCount = summary.payload.terms?.length ?? 0
      delete summary.payload.terms
    }
    if (kind === 'guide') delete summary.payload.markdown
    await writeCache(owner, `list:${kind}`, [...rows.filter(item => item.id !== id), summary])
  }
  if (kind === 'set' && deleted) {
    await writeCache(owner, `guide:${id}`, null)
    const guides = await readCache<CloudRow[]>(owner, 'list:guide')
    if (guides) await writeCache(owner, 'list:guide', guides.filter(guide => guide.id !== id))
  }
  changed(kind, id)
  return row
}
export async function refreshLibrary(db: DbClient) {
  const owner = await libraryOwner(db)
  await Promise.all((['set', 'guide', 'folder', 'order'] as Kind[]).map(kind => fetchList(owner, kind)))
}
