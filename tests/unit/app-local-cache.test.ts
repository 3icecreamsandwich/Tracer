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

  it('reloads Smart Review for both flashcard views after Settings invalidates the cache', async () => {
    const { loadAppSettingsOnce, clearAppSettingsRequest } = await import('../../src/composables/app-settings-cache')
    mocks.settingsGet.mockResolvedValue({ smartReviewEnabled: false })
    expect((await loadAppSettingsOnce()).smartReviewEnabled).toBe(false)

    for (const enabled of [true, false]) {
      mocks.settingsGet.mockResolvedValue({ smartReviewEnabled: enabled })
      clearAppSettingsRequest()
      const views = await Promise.all([loadAppSettingsOnce(), loadAppSettingsOnce()])
      expect(views.map(settings => settings.smartReviewEnabled)).toEqual([enabled, enabled])
    }
    expect(mocks.settingsGet).toHaveBeenCalledTimes(3)
  })
})
