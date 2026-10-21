import { ensureReadableStreamValues } from '../../platform/readable-stream'
import type { OcrAdapter } from './types'
import { normalizeExtractedText } from './text'

const MAX_OCR_DIMENSION = 2400
const OCR_TIMEOUT_MS = 90_000

async function resizeImageForOcr(input: Parameters<OcrAdapter['recognize']>[0]) {
  if (!(input instanceof Blob) || !input.type.startsWith('image/') || typeof createImageBitmap !== 'function') {
    return input
  }

  const bitmap = await createImageBitmap(input)
  try {
    const longestSide = Math.max(bitmap.width, bitmap.height)
    if (longestSide <= MAX_OCR_DIMENSION) return input

    const scale = MAX_OCR_DIMENSION / longestSide
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))
    if (typeof OffscreenCanvas === 'function') {
      const canvas = new OffscreenCanvas(width, height)
      const context = canvas.getContext('2d')
      if (!context) return input
      context.drawImage(bitmap, 0, 0, width, height)
      return canvas.convertToBlob({ type: 'image/jpeg', quality: 0.92 })
    }

    if (typeof document === 'undefined') return input
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) return input
    context.drawImage(bitmap, 0, 0, width, height)
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not prepare this image for OCR.')), 'image/jpeg', 0.92)
    })
  } finally {
    bitmap.close()
  }
}

function recognizeWithTimeout(worker: { recognize: (input: any, options?: any) => Promise<any> }, input: unknown) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  const timedOut = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error('OCR took longer than 90 seconds for this image. Try a tighter photo or fewer images.')), OCR_TIMEOUT_MS)
  })
  return Promise.race([
    worker.recognize(input, { rotateAuto: true }),
    timedOut
  ]).finally(() => {
    if (timeout) clearTimeout(timeout)
  })
}

export async function createDefaultOcrAdapter(): Promise<OcrAdapter> {
  ensureReadableStreamValues()
  const tesseractModule = await import('tesseract.js')
  const tesseract = ((tesseractModule as any).default ?? tesseractModule) as typeof import('tesseract.js')
  const workerAsset = await import('tesseract.js/dist/worker.min.js?url')
  // Keep the OCR engine in the app bundle. The worker otherwise falls back to
  // jsDelivr, which makes readable uploads fail whenever that CDN is blocked.
  const coreAsset = await import('tesseract.js-core/tesseract-core-lstm.wasm.js?url')
  const languageAsset = await import('@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz?url')
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
        // Passing the data directly avoids Tesseract's default remote download.
        const languageResponse = await fetch(languageAsset.default)
        if (!languageResponse.ok) throw new Error('The bundled English OCR data could not be loaded.')
        const languageData = new Uint8Array(await languageResponse.arrayBuffer())
        slot.worker ??= tesseract.createWorker([{ code: 'eng', data: languageData }], undefined, {
          workerPath: workerAsset.default,
          corePath: coreAsset.default,
          logger: () => undefined
        })
        const worker = await slot.worker
        try {
          const preparedInput = await resizeImageForOcr(input)
          const result = await recognizeWithTimeout(worker, preparedInput)
          return normalizeExtractedText(result.data.text ?? '')
        } catch (error) {
          if (error instanceof Error && error.message.startsWith('OCR took longer than')) {
            slot.worker = null
            void worker.terminate().catch(() => undefined)
          }
          throw error
        }
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
