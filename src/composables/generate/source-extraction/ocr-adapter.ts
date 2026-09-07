import { ensureReadableStreamValues } from '../../platform/readable-stream'
import type { OcrAdapter } from './types'
import { normalizeExtractedText } from './text'

export async function createDefaultOcrAdapter(): Promise<OcrAdapter> {
  ensureReadableStreamValues()
  const tesseractModule = await import('tesseract.js')
  const tesseract = ((tesseractModule as any).default ?? tesseractModule) as typeof import('tesseract.js')
  const workerAsset = await import('tesseract.js/dist/worker.min.js?url')
  // Two lazily created workers bound memory use and overlap recognition safely.
  const slots = Array.from({ length: 2 }, () => ({
    worker: null as ReturnType<typeof tesseract.createWorker> | null,
    queue: Promise.resolve(),
    pending: 0
  }))

  return {
    recognize(input) {
      const slot = slots.reduce((best, current) => current.pending < best.pending ? current : best)
      slot.pending += 1
      const job = slot.queue.then(async () => {
        slot.worker ??= tesseract.createWorker('eng', undefined, {
          workerPath: workerAsset.default,
          logger: () => undefined
        })
        const worker = await slot.worker
        const result = await worker.recognize(input as any)
        return normalizeExtractedText(result.data.text ?? '')
      })
      slot.queue = job.then(() => undefined, () => undefined).finally(() => { slot.pending -= 1 })
      return job
    },
    async terminate() {
      await Promise.all(slots.map(async (slot) => {
        await slot.queue
        const worker = await slot.worker?.catch(() => null)
        await worker?.terminate()
      }))
    }
  }
}
