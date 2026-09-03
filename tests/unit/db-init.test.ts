import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  close: vi.fn(),
  get: vi.fn(),
  load: vi.fn(),
  select: vi.fn(),
}))

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: {
    get: mocks.get,
    load: mocks.load,
  },
}))

describe('Tracer database lifecycle', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.close.mockReset().mockResolvedValue(true)
    mocks.select.mockReset().mockResolvedValue([{ ready: 1 }])
    mocks.get.mockReset().mockReturnValue({ close: mocks.close, select: mocks.select })
    mocks.load.mockReset().mockResolvedValue({ close: mocks.close, select: mocks.select })
  })

  it('reuses the native pool Tauri preloaded instead of loading another pool', async () => {
    const { useTracerDb } = await import('../../src/composables/db/init')

    const connection = await useTracerDb()

    expect(mocks.get).toHaveBeenCalledWith('sqlite:tracer.db')
    expect(mocks.select).toHaveBeenCalledWith('SELECT 1 AS ready;')
    expect(mocks.load).not.toHaveBeenCalled()
    expect(connection).toBe(mocks.get.mock.results[0]?.value)
  })

  it('shares one database initialization across simultaneous callers', async () => {
    const { useTracerDb } = await import('../../src/composables/db/init')

    const connections = await Promise.all([useTracerDb(), useTracerDb(), useTracerDb()])

    expect(connections[0]).toBe(connections[1])
    expect(connections[1]).toBe(connections[2])
    expect(mocks.select).toHaveBeenCalledTimes(1)
    expect(mocks.load).not.toHaveBeenCalled()
  })

  it('loads a fresh pool only after an explicit close made the preload unavailable', async () => {
    mocks.select.mockRejectedValueOnce(new Error('pool closed'))
    const { useTracerDb } = await import('../../src/composables/db/init')

    await useTracerDb()

    expect(mocks.select).toHaveBeenCalledTimes(1)
    expect(mocks.load).toHaveBeenCalledOnce()
    expect(mocks.load).toHaveBeenCalledWith('sqlite:tracer.db')
  })

  it('closes only Tracer database when explicitly released', async () => {
    const { closeTracerDb, useTracerDb } = await import('../../src/composables/db/init')
    await useTracerDb()
    mocks.close.mockClear()

    await closeTracerDb()

    expect(mocks.close).toHaveBeenCalledOnce()
    expect(mocks.close).toHaveBeenCalledWith('sqlite:tracer.db')
  })
})
