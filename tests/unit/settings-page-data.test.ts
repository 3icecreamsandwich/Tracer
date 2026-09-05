import { beforeEach, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  lockGetStatus: vi.fn(),
  profileGet: vi.fn(),
  settingsGet: vi.fn(),
  useTracerDb: vi.fn(),
}))
vi.mock('../../src/composables/lock', () => ({ lockGetStatus: mocks.lockGetStatus }))
vi.mock('../../src/composables/db', () => ({
  useTracerDb: mocks.useTracerDb,
  createProfileRepo: () => ({ get: mocks.profileGet }),
  createSettingsRepo: () => ({ get: mocks.settingsGet }),
}))
import { loadSettingsPageData } from '../../src/composables/settings-page-data'

beforeEach(() => {
  vi.resetAllMocks()
  mocks.useTracerDb.mockResolvedValue({})
})

it('starts both local reads while the OS keychain is still pending', async () => {
  let finishLock!: (value: unknown) => void
  let finishProfile!: (value: unknown) => void
  mocks.lockGetStatus.mockReturnValue(new Promise(resolve => { finishLock = resolve }))
  mocks.profileGet.mockReturnValue(new Promise(resolve => { finishProfile = resolve }))
  mocks.settingsGet.mockResolvedValue({ darkMode: true })
  const request = loadSettingsPageData()
  await vi.waitFor(() => {
    expect(mocks.profileGet).toHaveBeenCalledTimes(1)
    expect(mocks.settingsGet).toHaveBeenCalledTimes(1)
  })
  finishProfile({ id: 'profile' })
  finishLock({ requires_unlock: true })
  await expect(request).resolves.toMatchObject({
    status: { requires_unlock: true },
    profile: { id: 'profile' },
    settings: { darkMode: true },
  })
})

it('reads fresh settings on each visit and preserves failures for the lock redirect', async () => {
  mocks.lockGetStatus.mockResolvedValue({ requires_unlock: false })
  mocks.profileGet.mockResolvedValue(null)
  mocks.settingsGet.mockResolvedValueOnce({ darkMode: false }).mockResolvedValueOnce({ darkMode: true })
  expect((await loadSettingsPageData()).settings).toEqual({ darkMode: false })
  expect((await loadSettingsPageData()).settings).toEqual({ darkMode: true })
  mocks.lockGetStatus.mockRejectedValueOnce(new Error('keychain unavailable'))
  await expect(loadSettingsPageData()).rejects.toThrow('keychain unavailable')
})
