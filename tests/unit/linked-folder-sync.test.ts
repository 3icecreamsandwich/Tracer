import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const m = vi.hoisted(() => ({ scan: vi.fn(), watch: vi.fn(), generate: vi.fn(), extract: vi.fn(), limits: vi.fn(), record: vi.fn(), update: vi.fn(), files: vi.fn(), model: vi.fn() }))
vi.mock('@tauri-apps/api/path', () => ({ basename: async () => 'Notes' }))
vi.mock('@tauri-apps/plugin-fs', () => ({ watch: m.watch }))
vi.mock('../../src/composables/generate/linked-folders/scan', () => ({ scanLinkedFolder: m.scan }))
vi.mock('../../src/composables/generate/file-limits', () => ({ assertGenerateFileLimits: m.limits }))
vi.mock('../../src/composables/generate/source-extraction', () => ({ extractGenerateSources: m.extract }))
vi.mock('../../src/composables/generate/linked-folders/generate', () => ({ generateLinkedFolderContent: m.generate, mergeGeneratedTerms: (_: unknown, next: unknown) => next, appendStudyGuide: (_: unknown, next: unknown) => next }))
vi.mock('../../src/composables/ai/registry', () => ({ resolveAiModel: m.model }))
vi.mock('../../src/composables/db', () => ({
  useTracerDb: async () => ({}),
  createLinkedFoldersRepo: () => ({ list: async () => [{ setId: 'set', path: '/notes' }], getBySetId: async () => ({ setId: 'set', path: '/notes' }), listFiles: m.files, recordFiles: m.record, updateStatus: m.update, create: vi.fn(), delete: vi.fn() }),
  createSettingsRepo: () => ({ get: async () => ({ defaultModelId: 'model', fallbackModelIds: [] }) }),
  createSetsRepo: () => ({ create: vi.fn(), delete: vi.fn(), get: async () => ({ terms: [] }), update: vi.fn() }),
  createStudyGuidesRepo: () => ({ create: vi.fn(), getBySetId: async () => ({ id: 'guide', markdown: '' }), update: vi.fn() })
}))
let manager: typeof import('../../src/composables/generate/linked-folders/sync')
let onEvent: (event: any) => void
beforeEach(async () => {
  vi.resetModules()
  Object.values(m).forEach((mock) => mock.mockReset())
  m.watch.mockImplementation(async (_path, callback) => { onEvent = callback; return vi.fn() })
  m.scan.mockResolvedValue({ sources: [], ignored: [] })
  m.files.mockResolvedValue([])
  m.update.mockResolvedValue({ setId: 'set', path: '/notes' })
  m.model.mockResolvedValue({})
  m.extract.mockResolvedValue({ extracted: [{ id: 'new', text: 'Source text' }], failed: [] })
  m.generate.mockResolvedValue({ terms: [], studyGuideMarkdown: 'Guide' })
  manager = await import('../../src/composables/generate/linked-folders/sync')
  await manager.startLinkedFolderSyncManager({ syncOnStart: false })
})
afterEach(() => manager.stopLinkedFolderSyncManager())

describe('linked-folder incremental scheduling', () => {
  it('debounces content edits, merges changed paths, and avoids AI for unchanged content', async () => {
    onEvent({ type: { modify: { kind: 'data', mode: 'content' } }, paths: ['/notes/a.txt'] })
    onEvent({ type: { create: { kind: 'file' } }, paths: ['/notes/b.txt'] })
    await vi.waitFor(() => expect(m.scan).toHaveBeenCalledOnce(), { timeout: 1000 })
    expect(m.scan.mock.calls[0]![3].changedPaths).toEqual(new Set(['/notes/a.txt', '/notes/b.txt']))
    expect(m.model).not.toHaveBeenCalled()
    expect(m.extract).not.toHaveBeenCalled()
    expect(m.generate).not.toHaveBeenCalled()
    expect(m.watch.mock.calls[0]![2]).toEqual({ recursive: true, delayMs: 150 })
  })

  it('queues changes received during generation instead of dropping them', async () => {
    m.scan.mockResolvedValueOnce({ sources: [{ id: 'new', relativePath: 'new.txt', sizeBytes: 10 }], ignored: [] })
    let finish!: () => void
    m.generate.mockImplementationOnce(() => new Promise((resolve) => { finish = () => resolve({ terms: [], studyGuideMarkdown: 'Guide' }) }))
    const pending = manager.syncLinkedFolder('set')
    await vi.waitFor(() => expect(m.generate).toHaveBeenCalledOnce())
    onEvent({ type: { modify: { kind: 'data', mode: 'content' } }, paths: ['/notes/later.txt'] })
    expect(manager.syncLinkedFolder('set')).toBe(pending)
    finish()
    await pending
    expect(m.scan).toHaveBeenCalledTimes(2)
    expect(m.scan.mock.calls[1]![3].changedPaths).toEqual(new Set(['/notes/later.txt']))
    expect(m.generate).toHaveBeenCalledOnce()
  })

  it('ignores read events and uses a full scan for unspecified changes', async () => {
    onEvent({ type: { access: { kind: 'open', mode: 'read' } }, paths: ['/notes/a.txt'] })
    expect(m.update).not.toHaveBeenCalled()
    onEvent({ type: 'any', paths: [] })
    await vi.waitFor(() => expect(m.scan).toHaveBeenCalledOnce(), { timeout: 1000 })
    expect(m.scan.mock.calls[0]![3].changedPaths).toBeUndefined()
  })
  it('overlaps initial extraction with model preparation', async () => {
    m.scan.mockResolvedValueOnce({ sources: [{ id: 'new', relativePath: 'new.txt', sizeBytes: 10 }], ignored: [] })
    let finishModel!: () => void
    m.model.mockImplementationOnce(() => new Promise((resolve) => { finishModel = () => resolve({}) }))
    const linking = manager.createSetFromLinkedFolder({ path: '/notes' })
    await vi.waitFor(() => expect(m.extract).toHaveBeenCalledOnce())
    expect(m.generate).not.toHaveBeenCalled()
    finishModel()
    await linking
    expect(m.generate).toHaveBeenCalledOnce()
  })

})
