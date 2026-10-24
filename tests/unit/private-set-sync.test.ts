import { beforeEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ rpc: vi.fn(), refresh: vi.fn(), cache: new Map(), db: { select: vi.fn(), execute: vi.fn().mockResolvedValue({}) }, owner: 'owner' }))
vi.mock('../../src/composables/db', () => ({ useTracerDb: async () => mocks.db }))
vi.mock('../../src/composables/cloud-library/client', () => ({
  libraryOwner: async () => mocks.owner,
  authenticatedLibrary: async () => ({ rpc: mocks.rpc }),
  refreshLibrary: mocks.refresh,
}))
vi.mock('../../src/composables/cloud-library/preferences', () => ({ personalPreferences: (value: unknown) => value }))
vi.mock('../../src/composables/db/repos/settings.repo', () => ({ createLocalSettingsRepo: () => ({ get: async () => ({ language: 'en' }) }) }))
vi.mock('../../src/composables/cloud-library/cache', () => ({
  readCache: async (owner: string, key: string) => mocks.cache.get(`${owner}:${key}`),
  writeCache: async (owner: string, key: string, value: unknown) => { mocks.cache.set(`${owner}:${key}`, value) },
}))
import { syncPrivateSets } from '../../src/composables/private-set-sync'
beforeEach(() => {
  vi.clearAllMocks(); mocks.cache.clear(); mocks.owner = crypto.randomUUID()
  mocks.rpc.mockResolvedValue({ error: null }); mocks.refresh.mockResolvedValue(undefined)
  mocks.db.select.mockImplementation(async (sql: string) => sql.includes('flashcard_sets') ? [{ id: 'set', title: 'Legacy', terms_json: '[{"front":"A","back":"B"}]', hidden_from_library: 0 }] : [])
})
it('imports local content once, then refreshes without uploading unchanged sets', async () => {
  await syncPrivateSets(); await syncPrivateSets()
  expect(mocks.rpc).toHaveBeenCalledTimes(1)
  expect(mocks.rpc).toHaveBeenCalledWith('import_cloud_library_items', { items: expect.arrayContaining([expect.objectContaining({ kind: 'set', payload: expect.objectContaining({ title: 'Legacy' }) })]) })
  expect(mocks.refresh).toHaveBeenCalledTimes(2)
})
it('retries an incomplete import instead of marking it as migrated', async () => {
  mocks.rpc.mockResolvedValueOnce({ error: { message: 'offline' } })
  await expect(syncPrivateSets()).rejects.toThrow('preserve your device library')
  expect(mocks.refresh).not.toHaveBeenCalled()
  await syncPrivateSets()
  expect(mocks.rpc).toHaveBeenCalledTimes(2)
})
it('imports in bounded batches and coalesces simultaneous imports', async () => {
  mocks.db.select.mockImplementation(async (sql: string) => sql.includes('flashcard_sets') ? Array.from({ length: 205 }, (_, id) => ({ id: String(id), title: 'Legacy', terms_json: '[]' })) : [])
  await Promise.all([syncPrivateSets(), syncPrivateSets()])
  expect(mocks.rpc.mock.calls.map(call => call[1].items.length)).toEqual([100, 100, 6])
})

it('uses durable receipts after the disposable cache is cleared', async () => {
  mocks.db.select.mockResolvedValue([{ owner_id: mocks.owner }])
  await syncPrivateSets()
  expect(mocks.rpc).not.toHaveBeenCalled()
  expect(mocks.refresh).toHaveBeenCalledOnce()
})
