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
