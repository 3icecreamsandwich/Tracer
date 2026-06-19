import { ensureReadableStreamValues } from '../../platform/readable-stream'
import type { PdfAdapter, PdfExtraction, PdfPageExtraction } from './types'
import { isMeaningfulExtractedText, normalizeExtractedText } from './text'

type PdfJsModule = typeof import('pdfjs-dist')
type PdfDocumentResource = {
  pdf: import('pdfjs-dist').PDFDocumentProxy
  loadingTask?: import('pdfjs-dist').PDFDocumentLoadingTask
}

const PDF_OCR_RENDER_SCALE = 1.5
const MAX_OCR_CANVAS_PIXELS = 3_200_000

let pdfWorkerConfigured = false

async function loadPdfJs(): Promise<PdfJsModule> {
  ensureReadableStreamValues()
  const pdfjs = await import('pdfjs-dist')
  if (!pdfWorkerConfigured && typeof window !== 'undefined') {
    const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url')
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default
    pdfWorkerConfigured = true
  }
  return pdfjs
}

async function loadPdfDocument(file: File): Promise<PdfDocumentResource> {
  ensureReadableStreamValues()
  const pdfjs = await loadPdfJs()
  const bytes = new Uint8Array(await file.arrayBuffer())
  const loadingTask = pdfjs.getDocument({
    data: bytes,
    stopAtErrors: false,
    isImageDecoderSupported: false
  })
  return { pdf: await loadingTask.promise, loadingTask }
}

export async function releasePdfDocument(resource: {
  pdf?: { cleanup?: (keepLoadedFonts?: boolean) => Promise<unknown> | unknown; destroy?: () => Promise<unknown> | unknown; loadingTask?: { destroy?: () => Promise<unknown> | unknown } }
  loadingTask?: { destroy?: () => Promise<unknown> | unknown }
}) {
  const pdf = resource.pdf
  if (typeof pdf?.cleanup === 'function') {
    await pdf.cleanup()
  }

  if (typeof resource.loadingTask?.destroy === 'function') {
    await resource.loadingTask.destroy()
    return
  }

  if (typeof pdf?.destroy === 'function') {
    await pdf.destroy()
    return
  }

  if (typeof pdf?.loadingTask?.destroy === 'function') {
    await pdf.loadingTask.destroy()
  }
}

function textContentToString(content: { items?: unknown[] }) {
  const items = Array.isArray(content.items) ? content.items : []
  const parts: string[] = []
  for (const item of items) {
    if (typeof item === 'object' && item !== null && 'str' in item) {
      const str = (item as { str?: unknown }).str
      if (typeof str === 'string' && str.trim()) parts.push(str)
    }
  }
  return normalizeExtractedText(parts.join(' '))
}

async function renderPdfPageForOcr(page: import('pdfjs-dist').PDFPageProxy): Promise<HTMLCanvasElement> {
  if (typeof document === 'undefined') {
    throw new Error('PDF OCR rendering requires a browser canvas.')
  }

  let scale = PDF_OCR_RENDER_SCALE
  let viewport = page.getViewport({ scale })
  const pixels = viewport.width * viewport.height
  if (pixels > MAX_OCR_CANVAS_PIXELS) {
    scale = Math.max(1, scale * Math.sqrt(MAX_OCR_CANVAS_PIXELS / pixels))
    viewport = page.getViewport({ scale })
  }

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.ceil(viewport.width))
  canvas.height = Math.max(1, Math.ceil(viewport.height))

  await page.render({ canvas, viewport }).promise
  return canvas
}

export function createDefaultPdfAdapter(): PdfAdapter {
  return {
    async getPageCount(file) {
      const resource = await loadPdfDocument(file)
      try {
        return resource.pdf.numPages
      } finally {
        await releasePdfDocument(resource)
      }
    },

    async extract(file): Promise<PdfExtraction> {
      const resource = await loadPdfDocument(file)
      const { pdf } = resource
      try {
        const pages: PdfPageExtraction[] = []
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber)
          const content = await page.getTextContent()
          const text = textContentToString(content)
          const pageOutput: PdfPageExtraction = { pageNumber, text }

          if (!isMeaningfulExtractedText(text)) {
            try {
              pageOutput.ocrInput = await renderPdfPageForOcr(page)
            } catch {
              // The page can still be ignored if other pages produce useful text.
            }
          }

          pages.push(pageOutput)
        }

        return { pageCount: pdf.numPages, pages }
      } finally {
        await releasePdfDocument(resource)
      }
    }
  }
}

export async function getPdfPageCount(file: File, adapter: PdfAdapter = createDefaultPdfAdapter()) {
  return adapter.getPageCount(file)
}
