import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  settingsGet: vi.fn(),
  profileGet: vi.fn(),
  useTracerDb: vi.fn(),
}))

vi.mock('../../src/composables/db', () => ({
  createProfileRepo: () => ({ get: mocks.profileGet }),
  createSettingsRepo: () => ({ get: mocks.settingsGet }),
  useTracerDb: mocks.useTracerDb,
}))

describe('document-local shell data caches', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.settingsGet.mockReset().mockResolvedValue({ darkMode: true })
    mocks.profileGet.mockReset().mockResolvedValue({ id: 'profile-1', name: 'Ada' })
    mocks.useTracerDb.mockReset().mockResolvedValue({})
  })

  it('shares one settings query across all startup consumers', async () => {
    const { loadAppSettingsOnce } = await import('../../src/composables/app-settings-cache')

    const values = await Promise.all([
      loadAppSettingsOnce(),
      loadAppSettingsOnce(),
      loadAppSettingsOnce(),
      loadAppSettingsOnce(),
    ])

    expect(values).toHaveLength(4)
    expect(mocks.useTracerDb).toHaveBeenCalledTimes(1)
    expect(mocks.settingsGet).toHaveBeenCalledTimes(1)
  })

  it('shares the shell profile query with the active page', async () => {
    const { loadAppProfileOnce } = await import('../../src/composables/app-profile-cache')

    const [shellProfile, pageProfile] = await Promise.all([
      loadAppProfileOnce(),
      loadAppProfileOnce(),
    ])

    expect(shellProfile).toBe(pageProfile)
    expect(mocks.useTracerDb).toHaveBeenCalledTimes(1)
    expect(mocks.profileGet).toHaveBeenCalledTimes(1)
  })
})
