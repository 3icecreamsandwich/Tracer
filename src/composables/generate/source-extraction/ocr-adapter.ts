import { ensureReadableStreamValues } from '../../platform/readable-stream'
import type { OcrAdapter } from './types'
import { normalizeExtractedText } from './text'

export async function createDefaultOcrAdapter(): Promise<OcrAdapter> {
  ensureReadableStreamValues()
  const tesseractModule = await import('tesseract.js')
  const tesseract = ((tesseractModule as any).default ?? tesseractModule) as typeof import('tesseract.js')
  const workerAsset = await import('tesseract.js/dist/worker.min.js?url')
  const worker = await tesseract.createWorker('eng', undefined, {
    workerPath: workerAsset.default,
    logger: () => undefined
  })

  return {
    async recognize(input) {
      const result = await worker.recognize(input as any)
      return normalizeExtractedText(result.data.text ?? '')
    },
    async terminate() {
      await worker.terminate()
    }
  }
}
