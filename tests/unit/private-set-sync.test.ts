import { beforeEach, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  list: vi.fn(), get: vi.fn(), create: vi.fn(), update: vi.fn(),
  getGuide: vi.fn(), createGuide: vi.fn(), updateGuide: vi.fn(),
  upsert: vi.fn(), remote: [] as any[], publications: [] as any[], repair: vi.fn(),
}))
vi.mock('../../src/composables/db', () => ({
  useTracerDb: async () => ({}),
  createSetsRepo: () => ({ list: mocks.list, get: mocks.get, create: mocks.create, update: mocks.update }),
  createStudyGuidesRepo: () => ({ getBySetId: mocks.getGuide, create: mocks.createGuide, update: mocks.updateGuide }),
}))
vi.mock('../../src/composables/published-sets', () => ({ clearPublishedSetCache: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({
  getSupabaseClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: 'owner' } } }) },
    from: (table: string) => table === 'private_sets' ? {
      select: () => ({ eq: async () => ({ data: mocks.remote }) }),
      upsert: mocks.upsert,
    } : {
      select: () => ({ eq: () => ({ is: async () => ({ data: mocks.publications }) }) }),
      update: (payload: any) => {
        mocks.repair(payload)
        const chain = { eq: () => chain, is: async () => ({ error: null }) }
        return chain
      },
    },
  }),
}))
import { syncPrivateSets } from '../../src/composables/private-set-sync'
const local = { id: 'set', title: 'Java', terms: [], createdAt: '2026-01-01', updatedAt: '2026-01-01' }
beforeEach(() => {
  vi.clearAllMocks()
  mocks.remote = []
  mocks.publications = []
  mocks.list.mockResolvedValue([local])
  mocks.get.mockResolvedValue(local)
  mocks.getGuide.mockResolvedValue(null)
  mocks.upsert.mockResolvedValue({ error: null })
})
it('uploads existing guides and repairs older public snapshots', async () => {
  mocks.getGuide.mockResolvedValue({ id: 'guide', markdown: '# Full guide' })
  mocks.publications = [{ id: 'public', source_set_id: 'set' }]
  await syncPrivateSets()
  expect(mocks.upsert.mock.calls[0][0].study_guide_markdown).toBe('# Full guide')
  expect(mocks.repair).toHaveBeenCalledWith({ study_guide_markdown: '# Full guide' })
})
it('restores a cloud guide alongside a newly downloaded set', async () => {
  mocks.list.mockResolvedValue([])
  mocks.remote = [{ set_id: 'set', title: 'Java', terms: [], study_guide_markdown: '# Cloud guide' }]
  await syncPrivateSets()
  expect(mocks.createGuide).toHaveBeenCalledWith(expect.objectContaining({ setId: 'set', markdown: '# Cloud guide' }))
})
it('does not erase a cloud guide when this device has only its cards', async () => {
  mocks.remote = [{ set_id: 'set', updated_at: '2026-01-01', study_guide_markdown: '# Surviving guide' }]
  await syncPrivateSets()
  expect(mocks.createGuide).toHaveBeenCalledWith(expect.objectContaining({ markdown: '# Surviving guide' }))
  expect(mocks.upsert.mock.calls[0][0].study_guide_markdown).toBe('# Surviving guide')
})
