import { createDefaultOcrAdapter } from './ocr-adapter'
import { createDefaultPdfAdapter } from './pdf-adapter'
import type {
  ExtractedGenerateSource,
  ExtractGenerateSourcesResult,
  FailedGenerateSource,
  GenerateParseDecision,
  GenerateSourceFile,
  OcrAdapter,
  PdfAdapter,
  SourceExtractionAdapters
} from './types'
import { isMeaningfulExtractedText, normalizeExtractedText } from './text'

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

async function extractPdfSource(
  source: GenerateSourceFile,
  pdf: PdfAdapter,
  getOcr: () => Promise<OcrAdapter>,
  allowUnreadable: boolean
): Promise<ExtractedGenerateSource> {
  const extracted = await pdf.extract(source.file)
  const pageBlocks: string[] = []
  let directTextUsed = false
  let ocrTextUsed = false
  let ocrAttempted = false

  const blocks = await mapWithConcurrency(extracted.pages, 2, async (page) => {
    const directText = normalizeExtractedText(page.text)
    if (isMeaningfulExtractedText(directText)) {
      directTextUsed = true
      return `### Page ${page.pageNumber}\n${directText}`
    }

    if (!page.ocrInput) return null
    ocrAttempted = true
    try {
      const ocrText = normalizeExtractedText(await (await getOcr()).recognize(page.ocrInput))
      if (isMeaningfulExtractedText(ocrText)) {
        ocrTextUsed = true
        return `### Page ${page.pageNumber} (OCR)\n${ocrText}`
      }
    } catch {
      // A source can still succeed when at least one page yields readable text.
    }
    return null
  })
  pageBlocks.push(...blocks.filter((block): block is string => block !== null))

  const text = normalizeExtractedText(pageBlocks.join('\n\n'))
  if (!isMeaningfulExtractedText(text)) {
    if (allowUnreadable) {
      return {
        id: source.id,
        filename: sourceFilename(source.file),
        kind: 'pdf',
        text: '[No readable text could be extracted from this PDF. Follow the user instructions and make the best safe study material possible.]',
        pageCount: extracted.pageCount,
        method: 'unreadable'
      }
    }
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

async function extractImageSource(source: GenerateSourceFile, getOcr: () => Promise<OcrAdapter>, allowUnreadable: boolean) {
  const text = normalizeExtractedText(await (await getOcr()).recognize(source.file))
  if (!isMeaningfulExtractedText(text)) {
    if (allowUnreadable) {
      return {
        id: source.id,
        filename: sourceFilename(source.file),
        kind: 'image' as const,
        text: '[No readable text could be extracted from this image. Follow the user instructions and make the best safe study material possible.]',
        method: 'unreadable' as const
      }
    }
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

async function extractTextSource(source: GenerateSourceFile): Promise<ExtractedGenerateSource> {
  const text = normalizeExtractedText(await source.file.text())
  if (!isMeaningfulExtractedText(text)) {
    throw new Error('No readable text found in this file.')
  }
  return {
    id: source.id,
    filename: sourceFilename(source.file),
    kind: 'text',
    text,
    method: 'text'
  }
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(values.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await mapper(values[index]!, index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(Math.max(1, concurrency), values.length) }, () => worker())
  )
  return results
}

export async function extractGenerateSources(
  files: GenerateSourceFile[],
  adapters: SourceExtractionAdapters = {},
  options: { allowUnreadable?: boolean } = {}
): Promise<ExtractGenerateSourcesResult> {
  const pdf = adapters.pdf ?? createDefaultPdfAdapter()
  let ownedOcr: Promise<OcrAdapter> | null = null
  let ocrQueue = Promise.resolve()

  const getRawOcr = async () => {
    if (adapters.ocr) return adapters.ocr
    if (!ownedOcr) ownedOcr = createDefaultOcrAdapter()
    return ownedOcr
  }

  const serializedOcr: OcrAdapter = {
    recognize(input) {
      const job = ocrQueue.then(async () => (await getRawOcr()).recognize(input))
      ocrQueue = job.then(() => undefined, () => undefined)
      return job
    }
  }
  const getOcr = async () => adapters.ocr ? serializedOcr : getRawOcr()

  try {
    const results = await mapWithConcurrency(files, 2, async (source) => {
      try {
        if (source.kind === 'pdf') {
          return { extracted: await extractPdfSource(source, pdf, getOcr, options.allowUnreadable === true) }
        }
        if (source.kind === 'image') {
          return { extracted: await extractImageSource(source, getOcr, options.allowUnreadable === true) }
        }
        return { extracted: await extractTextSource(source) }
      } catch (err) {
        return {
          failed: {
            id: source.id,
            filename: sourceFilename(source.file),
            kind: source.kind,
            reason: cleanFailureReason(err, 'Could not parse this file.')
          } satisfies FailedGenerateSource
        }
      }
    })
    return {
      extracted: results.flatMap((result) => result.extracted ? [result.extracted] : []),
      failed: results.flatMap((result) => result.failed ? [result.failed] : [])
    }
  } finally {
    const ocrToTerminate = await (ownedOcr as Promise<OcrAdapter> | null)?.catch(() => null)
    if (ocrToTerminate?.terminate) {
      try {
        await ocrToTerminate.terminate()
      } catch {
      }
    }
  }
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
