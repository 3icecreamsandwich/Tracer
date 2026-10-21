import { describe, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ createWorker: vi.fn() }))
vi.mock('tesseract.js', () => ({ default: { createWorker: mocks.createWorker } }))
vi.mock('tesseract.js/dist/worker.min.js?url', () => ({ default: 'test-worker.js' }))
vi.mock('tesseract.js-core/tesseract-core-lstm.wasm.js?url', () => ({ default: 'test-core.js' }))
vi.mock('@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz?url', () => ({ default: 'test-language-data.gz' }))
import { createDefaultOcrAdapter } from '../../src/composables/generate/source-extraction/ocr-adapter'

describe('generation OCR pool', () => {
  it('overlaps two workers, serializes each worker, recovers after errors and terminates both', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(0) }))
    vi.stubGlobal('fetch', fetchMock)
    const releases: Array<() => void> = []
    const workers: Array<{ recognize: ReturnType<typeof vi.fn>; terminate: ReturnType<typeof vi.fn> }> = []
    mocks.createWorker.mockImplementation(async () => {
      let active = false
      const worker = {
        recognize: vi.fn(async (input: string) => {
          expect(active).toBe(false)
          active = true
          await new Promise<void>((resolve) => releases.push(resolve))
          active = false
          if (input === 'bad') throw new Error('Unreadable')
          return { data: { text: input } }
        }),
        terminate: vi.fn(async () => undefined)
      }
      workers.push(worker)
      return worker
    })
    const adapter = await createDefaultOcrAdapter()
    expect(workers).toHaveLength(0)
    const jobs = Promise.allSettled(['bad', 'second', 'third'].map((input) => adapter.recognize(input)))
    await vi.waitFor(() => expect(releases).toHaveLength(2))
    expect(workers).toHaveLength(2)
    expect(mocks.createWorker).toHaveBeenCalledWith([{ code: 'eng', data: expect.any(Uint8Array) }], undefined, expect.objectContaining({
      workerPath: 'test-worker.js',
      corePath: 'test-core.js'
    }))
    expect(fetchMock).toHaveBeenCalledWith('test-language-data.gz')
    releases[0]!()
    await vi.waitFor(() => expect(releases).toHaveLength(3))
    releases[1]!()
    releases[2]!()
    expect(await jobs).toEqual([
      { status: 'rejected', reason: expect.any(Error) },
      { status: 'fulfilled', value: 'second' },
      { status: 'fulfilled', value: 'third' }
    ])
    await adapter.terminate!()
    expect(workers.every((worker) => worker.terminate.mock.calls.length === 1)).toBe(true)
    vi.unstubAllGlobals()
  })
})
