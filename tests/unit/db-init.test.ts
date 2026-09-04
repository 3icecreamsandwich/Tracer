import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  close: vi.fn(),
  get: vi.fn(),
  load: vi.fn(),
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
    mocks.get.mockReset().mockReturnValue({ close: mocks.close })
    mocks.load.mockReset().mockResolvedValue({ close: mocks.close })
  })

  it('reuses the native pool Tauri preloaded instead of loading another pool', async () => {
    const { useTracerDb } = await import('../../src/composables/db/init')

    const connection = await useTracerDb()

    expect(mocks.get).toHaveBeenCalledWith('sqlite:tracer.db')
    expect(mocks.load).not.toHaveBeenCalled()
    expect(connection).toBe(mocks.get.mock.results[0]?.value)
  })

  it('shares one database initialization across simultaneous callers', async () => {
    const { useTracerDb } = await import('../../src/composables/db/init')

    const connections = await Promise.all([useTracerDb(), useTracerDb(), useTracerDb()])

    expect(connections[0]).toBe(connections[1])
    expect(connections[1]).toBe(connections[2])
    expect(mocks.get).toHaveBeenCalledTimes(1)
    expect(mocks.load).not.toHaveBeenCalled()
  })

  it('does not replace the native pool when a new document initializes', async () => {
    const firstDocument = await import('../../src/composables/db/init')
    await firstDocument.useTracerDb()

    vi.resetModules()
    const refreshedDocument = await import('../../src/composables/db/init')
    await refreshedDocument.useTracerDb()

    expect(mocks.get).toHaveBeenCalledTimes(2)
    expect(mocks.load).not.toHaveBeenCalled()
  })

  it('loads a fresh pool only when an explicit reset requests it', async () => {
    const { reopenTracerDb } = await import('../../src/composables/db/init')

    await reopenTracerDb()

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

  it('closes the preloaded pool even before the document has requested it', async () => {
    const { closeTracerDb } = await import('../../src/composables/db/init')

    await closeTracerDb()

    expect(mocks.get).toHaveBeenCalledWith('sqlite:tracer.db')
    expect(mocks.close).toHaveBeenCalledWith('sqlite:tracer.db')
  })
})
