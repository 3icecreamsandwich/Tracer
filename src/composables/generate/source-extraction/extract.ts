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
  adapters: SourceExtractionAdapters = {}
): Promise<ExtractGenerateSourcesResult> {
  const pdf = adapters.pdf ?? createDefaultPdfAdapter()
  let ownedOcr: OcrAdapter | null = null
  let ocrQueue = Promise.resolve()

  const getRawOcr = async () => {
    if (adapters.ocr) return adapters.ocr
    if (!ownedOcr) ownedOcr = await createDefaultOcrAdapter()
    return ownedOcr
  }

  const serializedOcr: OcrAdapter = {
    recognize(input) {
      const job = ocrQueue.then(async () => (await getRawOcr()).recognize(input))
      ocrQueue = job.then(() => undefined, () => undefined)
      return job
    }
  }
  const getOcr = async () => serializedOcr

  try {
    const results = await mapWithConcurrency(files, 2, async (source) => {
      try {
        if (source.kind === 'pdf') {
          return { extracted: await extractPdfSource(source, pdf, getOcr) }
        }
        if (source.kind === 'image') {
          return { extracted: await extractImageSource(source, getOcr) }
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
    const ocrToTerminate = ownedOcr as OcrAdapter | null
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
