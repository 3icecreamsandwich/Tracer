import { beforeEach, expect, it, vi } from 'vitest'
const state = vi.hoisted(() => ({ owner: '', getSession: vi.fn(), fetchProfile: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({
  getSupabaseClient: () => ({
    auth: { getSession: state.getSession },
    from: () => {
      const query = { select: () => query, eq: () => query, single: () => query, abortSignal: state.fetchProfile }
      return query
    },
  }),
}))
import { loadAccountProfileIdentity } from '../../src/composables/auth/account'
let sequence = 0
beforeEach(() => {
  vi.clearAllMocks()
  state.owner = `profile-owner-${++sequence}`
  state.getSession.mockImplementation(async () => ({ data: { session: { user: { id: state.owner } } } }))
  state.fetchProfile.mockResolvedValue({ data: { display_name: 'Name', username: 'name' } })
})
it('coalesces profile reads, bounds the request, and reuses display data', async () => {
  const [first, second] = await Promise.all([loadAccountProfileIdentity(), loadAccountProfileIdentity()])
  expect(first).toEqual({ displayName: 'Name', username: 'name' })
  expect(second).toEqual(first)
  expect(state.fetchProfile).toHaveBeenCalledTimes(1)
  expect(state.fetchProfile).toHaveBeenCalledWith(expect.any(AbortSignal))
  first!.displayName = 'Changed by caller'
  expect((await loadAccountProfileIdentity())?.displayName).toBe('Name')
})
it('isolates users and retries failed fetches', async () => {
  await loadAccountProfileIdentity()
  state.owner = 'different-owner'
  state.fetchProfile.mockResolvedValueOnce({ error: new Error('offline') })
  await expect(loadAccountProfileIdentity()).rejects.toThrow('offline')
  await expect(loadAccountProfileIdentity()).resolves.toMatchObject({ username: 'name' })
  expect(state.fetchProfile).toHaveBeenCalledTimes(3)
})
it('expires display data after one minute', async () => {
  const now = vi.spyOn(Date, 'now').mockReturnValue(1_000_000)
  try {
    await loadAccountProfileIdentity()
    now.mockReturnValue(1_060_001)
    await loadAccountProfileIdentity()
    expect(state.fetchProfile).toHaveBeenCalledTimes(2)
  } finally { now.mockRestore() }
})
