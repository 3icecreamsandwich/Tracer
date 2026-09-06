import { beforeEach, describe, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  getSession: vi.fn(),
  update: vi.fn(),
  upsert: vi.fn(),
  from: vi.fn(),
  rpc: vi.fn(),
  restore: vi.fn(),
  single: vi.fn(),
}))
vi.mock('../../src/composables/auth/client', () => ({
  getSupabaseClient: () => ({
    auth: { getUser: mocks.getUser, getSession: mocks.getSession },
    from: mocks.from,
    rpc: mocks.rpc,
  }),
  getPublicSupabaseClient: () => ({ from: mocks.from, rpc: mocks.rpc }),
}))
vi.mock('../../src/composables/auth/session', () => ({ restoreAuthSession: mocks.restore }))
vi.mock('../../src/composables/tauri', () => ({ hasTauriRuntime: () => true }))
import {
  publishSet,
  listPublishedSets,
  CATALOG_BATCH_SIZE,
  clearPublishedSetCache,
  getPublishedSet,
  updatePublishedSet,
} from '../../src/composables/published-sets'
const set = {
  id: 'source',
  folderId: 'private-folder',
  title: ' Biology ',
  description: 'Cells',
  terms: [{ id: 'card', front: 'Cell', back: 'Unit of life' }],
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
}
beforeEach(() => {
  vi.clearAllMocks()
  clearPublishedSetCache()
  mocks.getSession.mockResolvedValue({
    data: { session: { user: { id: 'owner' }, expires_at: Date.now() / 1000 + 3600 } },
    error: null,
  })
  mocks.getUser.mockResolvedValue({ data: { user: { id: 'owner' } }, error: null })
  mocks.single.mockResolvedValue({ data: { id: 'published' }, error: null })
  mocks.upsert.mockReturnValue({ select: () => ({ single: mocks.single }) })
  mocks.from.mockImplementation((name) =>
    name === 'profiles'
      ? {
          select: () => ({
            eq: () => ({ maybeSingle: async () => ({ data: { display_name: 'Alex' } }) }),
          }),
        }
      : { upsert: mocks.upsert },
  )
})
describe('publishing snapshots', () => {
  it('binds the publication to the authenticated user and updates the same source without copying private folder metadata', async () => {
    expect(await publishSet(set, ['science'], false)).toBe('published')
    const [payload, options] = mocks.upsert.mock.calls[0]
    expect(payload).toMatchObject({
      publisher_id: 'owner',
      source_set_id: 'source',
      title: 'Biology',
      terms: set.terms,
      tags: ['science'],
      allow_copying: false,
      publisher_name: 'Alex',
    })
    expect(payload).not.toHaveProperty('folderId')
    expect(options).toEqual({ onConflict: 'publisher_id,source_set_id' })
  })
  it('does not write a publication without an authenticated account', async () => {
    mocks.getSession.mockResolvedValue({ data: { session: null }, error: null })
    await expect(publishSet(set, [], true)).rejects.toThrow('Sign in')
    expect(mocks.upsert).not.toHaveBeenCalled()
  })
  it('surfaces backend failure instead of reporting a publication', async () => {
    mocks.single.mockResolvedValue({ data: null, error: new Error('Offline') })
    await expect(publishSet(set, [], true)).rejects.toThrow('Offline')
  })
  it('rejects empty sets', async () => {
    await expect(publishSet({ ...set, terms: [] }, [], true)).rejects.toThrow('at least one card')
    expect(mocks.upsert).not.toHaveBeenCalled()
  })
})
it('requests a bounded cursor page and uses the extra summary only to detect more results', async () => {
  mocks.rpc.mockResolvedValue({
    data: Array.from({ length: CATALOG_BATCH_SIZE + 1 }, (_, id) => ({ id: String(id) })),
    error: null,
  })
  const page = await listPublishedSets(' cells ', ['science'], {
    id: 'previous',
    created_at: '2026-01-01',
  } as any)
  expect(mocks.rpc).toHaveBeenCalledWith('search_published_sets', {
    search_text: 'cells',
    selected_tags: ['science'],
    before_id: 'previous',
    before_created_at: '2026-01-01',
    page_size: 37,
  })
  expect(page.items).toHaveLength(36)
  expect(page.hasMore).toBe(true)
})

it('public browsing skips session restoration and reuses cached or concurrent requests', async () => {
  mocks.rpc.mockResolvedValue({ data: [], error: null })
  await Promise.all([listPublishedSets('', []), listPublishedSets('', [])])
  await listPublishedSets('', [])
  expect(mocks.rpc).toHaveBeenCalledTimes(1)
  expect(mocks.restore).not.toHaveBeenCalled()
  expect(mocks.getSession).not.toHaveBeenCalled()
  expect(mocks.getUser).not.toHaveBeenCalled()
})
it('public details have no auth dependency and reuse prefetched content', async () => {
  mocks.from.mockReturnValue({ select: () => ({ eq: () => ({ single: mocks.single }) }) })
  mocks.single.mockResolvedValue({ data: { id: 'public-id', terms: set.terms }, error: null })
  await Promise.all([getPublishedSet('public-id'), getPublishedSet('public-id')])
  await getPublishedSet('public-id')
  expect(mocks.single).toHaveBeenCalledTimes(1)
  expect(mocks.restore).not.toHaveBeenCalled()
  expect(mocks.getSession).not.toHaveBeenCalled()
})
it('a valid publishing session skips restore and redundant user verification', async () => {
  await publishSet(set, [], true)
  expect(mocks.restore).not.toHaveBeenCalled()
  expect(mocks.getUser).not.toHaveBeenCalled()
})
it('restoration never waits for AI-provider synchronization', async () => {
  mocks.getSession.mockResolvedValueOnce({ data: { session: null }, error: null })
  await publishSet(set, [], true)
  expect(mocks.restore).toHaveBeenCalledWith({ waitForProviderKeySync: false })
})
it('updates only existing publication content and invalidates cached catalog pages', async () => {
  mocks.rpc.mockResolvedValue({ data: [], error: null })
  await listPublishedSets('', [])
  const chain: any = { eq: vi.fn(() => chain), select: () => ({ single: mocks.single }) }
  mocks.update.mockReturnValue(chain)
  mocks.from.mockReturnValue({ update: mocks.update })
  await updatePublishedSet(set)
  const payload = mocks.update.mock.calls[0][0]
  expect(payload).toMatchObject({ title: 'Biology', terms: set.terms })
  expect(payload).not.toHaveProperty('tags')
  expect(payload).not.toHaveProperty('allow_copying')
  expect(chain.eq).toHaveBeenCalledWith('publisher_id', 'owner')
  expect(chain.eq).toHaveBeenCalledWith('source_set_id', 'source')
  await listPublishedSets('', [])
  expect(mocks.rpc).toHaveBeenCalledTimes(2)
})
