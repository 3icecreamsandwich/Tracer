export type GenerateSourceKind = 'pdf' | 'image' | 'text'

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
  method: 'pdf-text' | 'ocr' | 'mixed' | 'text'
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
