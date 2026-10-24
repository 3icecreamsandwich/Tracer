import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  desktop: true,
  enabled: true,
  check: vi.fn(),
  download: vi.fn(),
  install: vi.fn(),
  close: vi.fn(),
  invoke: vi.fn(),
  relaunch: vi.fn(),
  initialize: vi.fn(),
}))

vi.mock('../../src/composables/tauri', () => ({
  hasTauriRuntime: () => mocks.desktop,
}))

vi.mock('../../src/composables/automatic-updates', () => ({
  useAutomaticUpdates: () => ({
    enabled: { get value() { return mocks.enabled } },
    initialize: mocks.initialize,
  }),
}))

vi.mock('@tauri-apps/api/app', () => ({
  getVersion: async () => '0.1.0',
}))

vi.mock('@tauri-apps/plugin-updater', () => ({
  check: mocks.check,
}))

vi.mock('@tauri-apps/api/core', () => ({
  invoke: mocks.invoke,
}))

vi.mock('@tauri-apps/plugin-process', () => ({
  relaunch: mocks.relaunch,
}))

async function controller() {
  const { useAppUpdates } = await import(
    '../../src/composables/app-updates'
  )
  return useAppUpdates()
}

async function downloadedController() {
  const updates = await controller()
  expect(await updates.checkUpdate()).toBe(true)
  expect(await updates.downloadUpdate()).toBe(true)
  return updates
}

beforeEach(() => {
  vi.resetModules()
  vi.resetAllMocks()

  mocks.desktop = true
  mocks.enabled = true
  mocks.initialize.mockResolvedValue(undefined)
  mocks.download.mockResolvedValue(undefined)
  mocks.install.mockResolvedValue(undefined)
  mocks.close.mockResolvedValue(undefined)
  mocks.invoke.mockResolvedValue(false)
  mocks.relaunch.mockResolvedValue(undefined)

  mocks.check.mockResolvedValue({
    version: '0.2.0',
    download: mocks.download,
    install: mocks.install,
    close: mocks.close,
  })
})

describe('app updates', () => {
  it('does not check automatically when disabled', async () => {
    mocks.enabled = false
    const updates = await controller()

    await updates.startAutomaticUpdates()

    expect(mocks.check).not.toHaveBeenCalled()
    expect(updates.currentVersion.value).toBe('0.1.0')
  })

  it('does not invoke native APIs in a browser', async () => {
    mocks.desktop = false
    const updates = await controller()

    await updates.startAutomaticUpdates()
    await updates.checkUpdate()

    expect(mocks.check).not.toHaveBeenCalled()
    expect(mocks.invoke).not.toHaveBeenCalled()
  })

  it('accumulates progress and waits for download success', async () => {
    const updates = await controller()
    await updates.checkUpdate()

    mocks.download.mockImplementationOnce(async (onEvent) => {
      onEvent({ event: 'Started', data: { contentLength: 100 } })
      onEvent({ event: 'Progress', data: { chunkLength: 20 } })
      onEvent({ event: 'Progress', data: { chunkLength: 30 } })

      expect(updates.downloadPercent.value).toBe(50)

      onEvent({ event: 'Finished' })
      expect(updates.status.value).toBe('downloading')

      throw new Error('Signature verification failed')
    })

    expect(await updates.downloadUpdate()).toBe(false)
    expect(updates.status.value).toBe('error')
    expect(updates.error.value).toContain('Signature')
    expect(mocks.install).not.toHaveBeenCalled()
  })

  it('retains the download when preflight rejects installation', async () => {
    const updates = await downloadedController()
    mocks.invoke.mockRejectedValueOnce(new Error('Active test'))

    expect(await updates.installAndRestart()).toBe(false)

    expect(mocks.invoke).toHaveBeenCalledWith('updater_preflight')
    expect(mocks.install).not.toHaveBeenCalled()
    expect(updates.status.value).toBe('ready')
  })

  it('retries relaunch without installing twice', async () => {
    const updates = await downloadedController()
    mocks.relaunch.mockRejectedValueOnce(new Error('Restart failed'))

    expect(await updates.installAndRestart()).toBe(false)
    expect(updates.status.value).toBe('installed')

    expect(await updates.installAndRestart()).toBe(true)
    expect(mocks.install).toHaveBeenCalledTimes(1)
    expect(mocks.relaunch).toHaveBeenCalledTimes(2)
  })

  it('lets the Windows installer handle restarting', async () => {
    const updates = await downloadedController()
    mocks.invoke.mockResolvedValueOnce(true)

    expect(await updates.installAndRestart()).toBe(true)

    expect(mocks.install).toHaveBeenCalledWith({
      restartAfterInstall: true,
    })
    expect(mocks.relaunch).not.toHaveBeenCalled()
  })
})
