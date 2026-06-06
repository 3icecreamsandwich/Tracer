import { ensureReadableStreamValues } from '../platform/readable-stream'

export type GenerateSourceKind = 'pdf' | 'image'

export type GenerateSourceFile = {
  id: string
  file: File
  kind: GenerateSourceKind
}

export type ExtractedGenerateSource = {
  id: string
  filename: string
  kind: GenerateSourceKind
  text: string
  pageCount?: number
  method: 'pdf-text' | 'ocr' | 'mixed'
}

export type FailedGenerateSource = {
  id: string
  filename: string
  kind: GenerateSourceKind
  reason: string
}

export type ExtractGenerateSourcesResult = {
  extracted: ExtractedGenerateSource[]
  failed: FailedGenerateSource[]
}

export type GenerateParseDecision =
  | { action: 'generate'; extracted: ExtractedGenerateSource[]; failed: FailedGenerateSource[]; canContinue: false }
  | { action: 'confirm'; extracted: ExtractedGenerateSource[]; failed: FailedGenerateSource[]; canContinue: true }
  | { action: 'block'; extracted: ExtractedGenerateSource[]; failed: FailedGenerateSource[]; canContinue: false }

export type GenerateOcrInput = File | Blob | HTMLCanvasElement | OffscreenCanvas | string

export type OcrAdapter = {
  recognize(input: GenerateOcrInput): Promise<string>
  terminate?(): Promise<void>
}

export type PdfPageExtraction = {
  pageNumber: number
  text: string
  ocrInput?: GenerateOcrInput
}

export type PdfExtraction = {
  pageCount: number
  pages: PdfPageExtraction[]
}

export type PdfAdapter = {
  getPageCount(file: File): Promise<number>
  extract(file: File): Promise<PdfExtraction>
}

export type SourceExtractionAdapters = {
  pdf?: PdfAdapter
  ocr?: OcrAdapter
}

type PdfJsModule = typeof import('pdfjs-dist')
type PdfDocumentResource = {
  pdf: import('pdfjs-dist').PDFDocumentProxy
  loadingTask?: import('pdfjs-dist').PDFDocumentLoadingTask
}

const PDF_OCR_RENDER_SCALE = 1.5
const MAX_OCR_CANVAS_PIXELS = 3_200_000

let pdfWorkerConfigured = false

export function assertGenerateSourceLimits(input: { pdfPages: number; imageCount: number }) {
  if (input.imageCount > 10) {
    throw new Error(`Too many images selected. Max is 10; selected files contain ${input.imageCount} images.`)
  }

  if (input.pdfPages > 10) {
    throw new Error(`PDF page limit exceeded. Max is 10 pages total; selected PDFs contain ${input.pdfPages} pages.`)
  }
}

export function normalizeExtractedText(text: string) {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function isMeaningfulExtractedText(text: string) {
  return normalizeExtractedText(text).replace(/\s+/g, '').length >= 8
}

function cleanFailureReason(err: unknown, fallback: string) {
  let message = fallback
  if (typeof err === 'string') message = err
  else if (err instanceof Error && err.message.trim()) message = err.message
  else if (typeof err === 'object' && err !== null && 'message' in err) {
    const maybe = (err as { message?: unknown }).message
    if (typeof maybe === 'string' && maybe.trim()) message = maybe
  }

  message = message.replace(/\s+/g, ' ').trim()
  if (!message) return fallback
  if (message.length <= 180) return message
  return `${message.slice(0, 177)}...`
}

function sourceFilename(file: File) {
  return file.name?.trim() || 'Untitled source'
}

function escapeSourceMarkdown(text: string) {
  return text.replace(/```/g, "'''")
}

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

    async extract(file) {
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

async function createDefaultOcrAdapter(): Promise<OcrAdapter> {
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

export async function getPdfPageCount(file: File, adapter: PdfAdapter = createDefaultPdfAdapter()) {
  return adapter.getPageCount(file)
}

async function extractPdfSource(
  source: GenerateSourceFile,
  pdf: PdfAdapter,
  getOcr: () => Promise<OcrAdapter>
): Promise<ExtractedGenerateSource> {
  const extracted = await pdf.extract(source.file)
  const pageBlocks: string[] = []
  let directTextUsed = false
  let ocrTextUsed = false
  let ocrAttempted = false

  for (const page of extracted.pages) {
    const directText = normalizeExtractedText(page.text)
    if (isMeaningfulExtractedText(directText)) {
      directTextUsed = true
      pageBlocks.push(`### Page ${page.pageNumber}\n${directText}`)
      continue
    }

    if (!page.ocrInput) continue
    ocrAttempted = true
    try {
      const ocrText = normalizeExtractedText(await (await getOcr()).recognize(page.ocrInput))
      if (isMeaningfulExtractedText(ocrText)) {
        ocrTextUsed = true
        pageBlocks.push(`### Page ${page.pageNumber} (OCR)\n${ocrText}`)
      }
    } catch {
      // A source can still succeed when at least one page yields readable text.
    }
  }

  const text = normalizeExtractedText(pageBlocks.join('\n\n'))
  if (!isMeaningfulExtractedText(text)) {
    throw new Error(ocrAttempted ? 'OCR did not find readable text in this PDF.' : 'No readable text found in this PDF.')
  }

  const method: ExtractedGenerateSource['method'] =
    directTextUsed && ocrTextUsed ? 'mixed' : ocrTextUsed ? 'ocr' : 'pdf-text'

  return {
    id: source.id,
    filename: sourceFilename(source.file),
    kind: 'pdf',
    text,
    pageCount: extracted.pageCount,
    method
  }
}

async function extractImageSource(source: GenerateSourceFile, getOcr: () => Promise<OcrAdapter>) {
  const text = normalizeExtractedText(await (await getOcr()).recognize(source.file))
  if (!isMeaningfulExtractedText(text)) {
    throw new Error('OCR did not find readable text in this image.')
  }

  return {
    id: source.id,
    filename: sourceFilename(source.file),
    kind: 'image' as const,
    text,
    method: 'ocr' as const
  }
}

export async function extractGenerateSources(
  files: GenerateSourceFile[],
  adapters: SourceExtractionAdapters = {}
): Promise<ExtractGenerateSourcesResult> {
  const pdf = adapters.pdf ?? createDefaultPdfAdapter()
  let ownedOcr: OcrAdapter | null = null

  const getOcr = async () => {
    if (adapters.ocr) return adapters.ocr
    if (!ownedOcr) ownedOcr = await createDefaultOcrAdapter()
    return ownedOcr
  }

  const extracted: ExtractedGenerateSource[] = []
  const failed: FailedGenerateSource[] = []

  try {
    for (const source of files) {
      try {
        if (source.kind === 'pdf') {
          extracted.push(await extractPdfSource(source, pdf, getOcr))
        } else {
          extracted.push(await extractImageSource(source, getOcr))
        }
      } catch (err) {
        failed.push({
          id: source.id,
          filename: sourceFilename(source.file),
          kind: source.kind,
          reason: cleanFailureReason(err, 'Could not parse this file.')
        })
      }
    }
  } finally {
    if (ownedOcr?.terminate) {
      try {
        await ownedOcr.terminate()
      } catch {
      }
    }
  }

  return { extracted, failed }
}

export function createGenerateParseDecision(result: ExtractGenerateSourcesResult): GenerateParseDecision {
  if (result.failed.length === 0) {
    return { action: 'generate', extracted: result.extracted, failed: [], canContinue: false }
  }

  if (result.extracted.length > 0) {
    return { action: 'confirm', extracted: result.extracted, failed: result.failed, canContinue: true }
  }

  return { action: 'block', extracted: [], failed: result.failed, canContinue: false }
}

function sourceHeader(source: ExtractedGenerateSource) {
  const lines = [
    `## Source: ${source.filename}`,
    `Kind: ${source.kind === 'pdf' ? 'PDF' : 'Image'}`,
    `Extraction: ${source.method}`
  ]
  if (typeof source.pageCount === 'number') lines.push(`Page count: ${source.pageCount}`)
  if (source.method !== 'pdf-text') {
    lines.push('Extraction note: OCR text may contain recognition mistakes.')
  }
  return lines.join('\n')
}

export function buildGenerateTextPrompt(input: { instructions?: string; sources: ExtractedGenerateSource[] }) {
  const extra = input.instructions?.trim()
  const sourceSections = input.sources.map((source) => {
    return `${sourceHeader(source)}\n\n${escapeSourceMarkdown(source.text)}`
  })

  return [
    'You are creating study materials from extracted source text.',
    'Return EXACTLY two fenced code blocks and NOTHING else.',
    '',
    '1) A markdown study guide:',
    '```study_guide_md',
    '(markdown)',
    '```',
    '',
    '2) Flashcards as TSV with one card per line:',
    '```flashcards_tsv',
    'term<TAB>definition',
    '... (no header row)',
    '```',
    '',
    'Flashcards TSV rules:',
    '- Output TSV only inside the flashcards_tsv fence.',
    '- One card per line.',
    '- Each line must contain exactly ONE tab separator.',
    '- Do not include tabs inside term or definition (use spaces instead).',
    '- Do not include blank lines.',
    '- Do not include numbering or bullets.',
    '- If you need a line break inside a cell, use the literal sequence "\\n" (do not insert real newlines).',
    '- Do not include a header row.',
    '',
    extra ? `User instructions: ${extra}` : '',
    '',
    'Use the extracted source text below. Do not invent facts that are not supported by these sources.',
    '',
    sourceSections.join('\n\n---\n\n')
  ]
    .filter((line) => line.length > 0)
    .join('\n')
}
