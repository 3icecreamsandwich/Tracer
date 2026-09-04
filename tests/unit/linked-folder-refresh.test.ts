import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  list: vi.fn(),
  scanLinkedFolder: vi.fn(),
  unwatch: vi.fn(),
  watch: vi.fn(),
}))

vi.mock('@tauri-apps/api/path', () => ({ basename: vi.fn() }))
vi.mock('@tauri-apps/plugin-fs', () => ({
  watch: mocks.watch,
}))
vi.mock('../../src/composables/db', () => ({
  createLinkedFoldersRepo: () => ({ list: mocks.list }),
  createSettingsRepo: vi.fn(),
  createSetsRepo: vi.fn(),
  createStudyGuidesRepo: vi.fn(),
  useTracerDb: vi.fn().mockResolvedValue({}),
}))
vi.mock('../../src/composables/generate/linked-folders/scan', () => ({
  scanLinkedFolder: mocks.scanLinkedFolder,
}))

describe('linked-folder manager on document refresh', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.list.mockReset().mockResolvedValue([
      { setId: 'set-1', path: '/tmp/notes', status: 'synced' },
    ])
    mocks.scanLinkedFolder.mockReset()
    mocks.unwatch.mockReset()
    mocks.watch.mockReset().mockResolvedValue(mocks.unwatch)
  })

  it('restores file watching without rescanning folders', async () => {
    const manager = await import('../../src/composables/generate/linked-folders/sync')

    await manager.startLinkedFolderSyncManager({ syncOnStart: false })

    expect(mocks.watch).toHaveBeenCalledOnce()
    expect(mocks.scanLinkedFolder).not.toHaveBeenCalled()
    manager.stopLinkedFolderSyncManager()
    expect(mocks.unwatch).toHaveBeenCalledOnce()
  })
})
