import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  owner: 'owner', sessionOwner: 'owner', online: true, conflict: false,
  beforeListReply: undefined as undefined | (() => Promise<void>),
  rows: new Map<string, any>(), cache: new Map<string, any>(), calls: [] as any[], imports: vi.fn(),
}))
vi.mock('../../src/composables/cloud-library/cache', () => ({
  readCache: async (owner: string, key: string) => structuredClone(state.cache.get(`${owner}:${key}`)),
  writeCache: async (owner: string, key: string, value: unknown) => { state.cache.set(`${owner}:${key}`, structuredClone(value)) },
}))
vi.mock('../../src/composables/cloud-library/migrate', () => ({ importLegacyLibrary: state.imports }))
vi.mock('../../src/composables/tauri', () => ({ hasTauriRuntime: () => false }))
vi.mock('../../src/composables/auth/session', () => ({ restoreAuthSession: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({
  isSupabaseConfigured: () => true,
  getSupabaseClient: () => ({
    auth: { getSession: async () => ({ data: { session: { user: { id: state.sessionOwner } } } }) },
    from: (table: string) => {
      const filters: Record<string, string> = {}
      const query = {
        select: () => query,
        eq: (key: string, value: string) => { filters[key] = value; return query },
        order: () => query,
        range: async () => {
          if (!state.online) throw new Error('offline')
          state.calls.push({ table, ...filters })
          const data = [...state.rows.values()].filter(row => row.owner_id === filters.owner_id && row.kind === filters.kind).map(row => {
            const summary = structuredClone(row)
            if (summary.kind === 'set') { summary.payload.cardCount = summary.payload.terms.length; delete summary.payload.terms }
            if (summary.kind === 'guide') delete summary.payload.markdown
            return summary
          })
          const gate = state.beforeListReply
          state.beforeListReply = undefined
          if (gate) await gate()
          return { data }
        },
        maybeSingle: async () => {
          if (!state.online) throw new Error('offline')
          state.calls.push({ table, ...filters })
          return { data: structuredClone(state.rows.get(`${filters.owner_id}:${filters.kind}:${filters.id}`) ?? null) }
        },
      }
      return query
    },
    rpc: async (name: string, args: any) => {
      state.calls.push({ name, args })
      if (!state.online) throw new Error('offline')
      const key = `${state.sessionOwner}:${args.item_kind}:${args.item_id}`
      const current = state.rows.get(key)
      if (state.conflict || (current?.revision ?? 0) !== args.expected_revision) return { error: { code: '40001' } }
      const row = { owner_id: state.sessionOwner, kind: args.item_kind, id: args.item_id, payload: args.item_payload, revision: (current?.revision ?? 0) + 1, deleted: args.item_deleted }
      state.rows.set(key, structuredClone(row))
      return { data: row }
    },
  }),
}))
import { cloudSetsRepo, cloudFoldersRepo } from '../../src/composables/cloud-library/repos'
import { cloudPreferencesRepo } from '../../src/composables/cloud-library/preferences'
import { getRow, listRows, saveRow } from '../../src/composables/cloud-library/client'
import type { DbClient } from '../../src/composables/db/types'
const db = { select: async () => [{ supabase_user_id: state.owner, id: 'profile' }], execute: vi.fn().mockResolvedValue({}) } as unknown as DbClient
const set = { id: 'set', title: 'Cloud set', description: null, folderId: null, terms: [{ id: 'term', front: 'A', back: 'B' }], createdAt: '2026-01-01', updatedAt: '2026-01-01' }
let sequence = 0
beforeEach(() => {
  state.owner = state.sessionOwner = `owner-${++sequence}`
  state.online = true; state.conflict = false; state.beforeListReply = undefined; state.rows.clear(); state.cache.clear(); state.calls = []
  state.imports.mockResolvedValue(undefined)
  state.rows.set(`${state.owner}:set:set`, { owner_id: state.owner, kind: 'set', id: 'set', payload: structuredClone(set), revision: 1, deleted: false })
})
describe('cloud-authoritative library', () => {
  it('opens with local settings while cloud initialization is stalled', async () => {
    state.imports.mockImplementation(() => new Promise(() => {}))
    const local = { get: vi.fn().mockResolvedValue({ startupLockEnabled: false, defaultModelId: 'local-model' }), set: vi.fn() }
    expect(await cloudPreferencesRepo(db, local).get()).toMatchObject({ defaultModelId: 'local-model', startupLockEnabled: false })
  })
  it('merges simultaneous preference changes across repository instances', async () => {
    let settings = { darkMode: false, smartReviewEnabled: false }
    const local = {
      get: async () => ({ ...settings }) as any,
      set: async (patch: any) => { settings = { ...settings, ...patch }; return { ...settings } as any },
    }
    const first = cloudPreferencesRepo(db, local)
    const second = cloudPreferencesRepo(db, local)
    await Promise.all([first.set({ darkMode: true }), second.set({ smartReviewEnabled: true })])
    expect(settings).toMatchObject({ darkMode: true, smartReviewEnabled: true })
    expect(state.rows.get(`${state.owner}:preferences:app`).payload).toMatchObject(settings)
  })
  it('allows another preference save after a failed write', async () => {
    const local = { get: async () => ({ darkMode: false }) as any, set: async (patch: any) => patch }
    const repo = cloudPreferencesRepo(db, local)
    state.online = false
    await expect(repo.set({ darkMode: true })).rejects.toThrow()
    state.online = true
    await expect(repo.set({ smartReviewEnabled: true })).resolves.toMatchObject({ smartReviewEnabled: true })
  })
  it('reads an empty home order from the collection cache without a detail request', async () => {
    const repo = cloudFoldersRepo(db)
    expect(await repo.listHomeOrder()).toEqual([])
    state.online = false
    expect(await repo.listHomeOrder()).toEqual([])
    expect(state.calls.filter(call => call.table === 'cloud_library_items')).toHaveLength(0)
  })
  it('shares folder names, membership and order with a device that has an empty cache', async () => {
    const repo = cloudFoldersRepo(db)
    await repo.create({ id: 'folder', name: 'School' })
    await repo.rename('folder', 'Classes')
    await repo.moveSets(['set'], 'folder')
    await repo.reorderHome([{ kind: 'folder', id: 'folder' }])
    state.cache.clear()
    expect(await cloudFoldersRepo(db).list()).toEqual([expect.objectContaining({ id: 'folder', name: 'Classes' })])
    expect(await cloudSetsRepo(db).list()).toEqual([expect.objectContaining({ folderId: 'folder' })])
    expect(await cloudFoldersRepo(db).listHomeOrder()).toEqual([{ kind: 'folder', id: 'folder', sortOrder: 0 }])
  })
  it('loads summaries without card bodies, then obtains content only when opened', async () => {
    const repo = cloudSetsRepo(db)
    expect(await repo.list()).toEqual([expect.objectContaining({ id: 'set', cardCount: 1 })])
    expect((await repo.list())[0]).not.toHaveProperty('terms')
    expect(await repo.get('set')).toMatchObject({ terms: set.terms, cloudRevision: 1 })
    expect(state.calls.filter(call => call.table === 'cloud_library_items')).toHaveLength(1)
  })
  it('serves persisted summaries and set contents after connectivity is lost', async () => {
    await listRows(db, 'set'); await getRow(db, 'set', 'set')
    state.online = false
    expect(await cloudSetsRepo(db).list()).toHaveLength(1)
    expect(await cloudSetsRepo(db).get('set')).toMatchObject({ title: 'Cloud set' })
  })
  it('does not acknowledge failed writes or change the last saved cache', async () => {
    await getRow(db, 'set', 'set')
    state.online = false
    await expect(cloudSetsRepo(db).update({ id: 'set', title: 'Unsaved' })).rejects.toThrow('offline')
    expect(await getRow(db, 'set', 'set')).toMatchObject({ payload: { title: 'Cloud set' }, revision: 1 })
  })
  it('rejects an editor draft based on an older revision even if another view refreshed the cache', async () => {
    const opened = await cloudSetsRepo(db).get('set')
    await saveRow(db, 'set', 'set', { ...set, title: 'Other device' }, 1)
    await expect(cloudSetsRepo(db).update({ id: 'set', title: 'Stale editor', cloudRevision: opened!.cloudRevision })).rejects.toThrow('another device')
    expect(state.rows.get(`${state.owner}:set:set`).payload.title).toBe('Other device')
  })
  it('preserves folder membership and creation time when an editor submits a snapshot', async () => {
    state.rows.get(`${state.owner}:set:set`).payload.folderId = 'folder'
    await cloudSetsRepo(db).update({ id: 'set', title: 'Edited', folderId: null, createdAt: '2099-01-01' } as any)
    expect(state.rows.get(`${state.owner}:set:set`).payload).toMatchObject({ title: 'Edited', folderId: 'folder', createdAt: '2026-01-01' })
  })
  it('does not turn a saved detail into an incomplete cached library', async () => {
    await saveRow(db, 'set', 'second', { ...set, id: 'second' }, 0)
    expect(state.cache.has(`${state.owner}:list:set`)).toBe(false)
    expect(await listRows(db, 'set')).toHaveLength(2)
  })
  it('isolates caches and refuses writes when the authenticated account differs', async () => {
    await getRow(db, 'set', 'set')
    state.owner = 'other-owner'
    await expect(getRow(db, 'set', 'set')).rejects.toThrow('Reconnect')
    await expect(saveRow(db, 'set', 'set', set, 1)).rejects.toThrow('Reconnect')
  })
  it('retries an old collection response instead of hiding an item saved during the request', async () => {
    let release!: () => void
    let started!: () => void
    const entered = new Promise<void>(resolve => { started = resolve })
    const gate = new Promise<void>(resolve => { release = resolve })
    state.beforeListReply = () => { started(); return gate }
    const loading = listRows(db, 'set')
    await entered
    await saveRow(db, 'set', 'new-set', { ...set, id: 'new-set' }, 0)
    release()
    expect(await loading).toHaveLength(2)
    expect(await listRows(db, 'set')).toHaveLength(2)
  })
  it('keeps deleted items out of the cached library', async () => {
    await listRows(db, 'set'); await getRow(db, 'set', 'set')
    await cloudSetsRepo(db).delete('set')
    expect(await listRows(db, 'set')).toEqual([])
    expect(await getRow(db, 'set', 'set')).toBeNull()
  })
})
