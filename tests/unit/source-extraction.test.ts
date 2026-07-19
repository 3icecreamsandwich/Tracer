import { describe, expect, it, vi } from 'vitest'

import {
  assertGenerateSourceLimits,
  createGenerateParseDecision,
  extractGenerateSources,
  releasePdfDocument,
  type OcrAdapter,
  type PdfAdapter
} from '../../src/composables/generate/source-extraction'

class TestFile extends Blob {
  name: string
  lastModified: number

  constructor(parts: BlobPart[], name: string, options?: FilePropertyBag) {
    super(parts, options)
    this.name = name
    this.lastModified = options?.lastModified ?? Date.now()
  }
}

const File = TestFile as unknown as typeof globalThis.File

function makeFile(name: string, type: string) {
  return new File(['sample'], name, { type })
}

describe('generate source extraction', () => {
  it('extracts embedded PDF text without OCR', async () => {
    const pdf: PdfAdapter = {
      getPageCount: vi.fn(async () => 1),
      extract: vi.fn(async () => ({
        pageCount: 1,
        pages: [{ pageNumber: 1, text: 'Key embedded PDF text about cell membranes.' }]
      }))
    }
    const ocr: OcrAdapter = {
      recognize: vi.fn(async () => 'unused')
    }

    const result = await extractGenerateSources(
      [{ id: 'pdf-1', kind: 'pdf', file: makeFile('notes.pdf', 'application/pdf') }],
      { pdf, ocr }
    )

    expect(result.failed).toEqual([])
    expect(result.extracted).toEqual([
      expect.objectContaining({
        id: 'pdf-1',
        filename: 'notes.pdf',
        kind: 'pdf',
        pageCount: 1,
        method: 'pdf-text',
        text: expect.stringContaining('cell membranes')
      })
    ])
    expect(ocr.recognize).not.toHaveBeenCalled()
  })

  it('uses OCR for scanned or empty PDF pages', async () => {
    const pdf: PdfAdapter = {
      getPageCount: vi.fn(async () => 2),
      extract: vi.fn(async () => ({
        pageCount: 2,
        pages: [
          { pageNumber: 1, text: 'Embedded page text about mitosis.' },
          { pageNumber: 2, text: '', ocrInput: 'page-2-canvas' }
        ]
      }))
    }
    const ocr: OcrAdapter = {
      recognize: vi.fn(async (input) => {
        expect(input).toBe('page-2-canvas')
        return 'Scanned page text about cytokinesis.'
      })
    }

    const result = await extractGenerateSources(
      [{ id: 'pdf-1', kind: 'pdf', file: makeFile('scanned.pdf', 'application/pdf') }],
      { pdf, ocr }
    )

    expect(result.failed).toEqual([])
    expect(result.extracted[0]).toEqual(
      expect.objectContaining({
        method: 'mixed',
        text: expect.stringContaining('### Page 2 (OCR)')
      })
    )
    expect(result.extracted[0]?.text).toContain('cytokinesis')
  })

  it('extracts image text with OCR', async () => {
    const ocr: OcrAdapter = {
      recognize: vi.fn(async (input) => {
        expect(input).toBeInstanceOf(File)
        return 'Image OCR text describing a labeled nephron diagram.'
      })
    }

    const result = await extractGenerateSources(
      [{ id: 'image-1', kind: 'image', file: makeFile('diagram.png', 'image/png') }],
      { ocr }
    )

    expect(result.failed).toEqual([])
    expect(result.extracted[0]).toEqual(
      expect.objectContaining({
        id: 'image-1',
        filename: 'diagram.png',
        kind: 'image',
        method: 'ocr',
        text: expect.stringContaining('nephron')
      })
    )
  })

  it('reads UTF-8 text sources directly without OCR', async () => {
    const ocr: OcrAdapter = {
      recognize: vi.fn(async () => 'unused')
    }

    const result = await extractGenerateSources(
      [{
        id: 'text-1',
        kind: 'text',
        file: new File(['Readable UTF-8 notes.'], 'notes.txt', { type: 'text/plain' })
      }],
      { ocr }
    )

    expect(result.failed).toEqual([])
    expect(result.extracted[0]).toEqual(
      expect.objectContaining({
        id: 'text-1',
        kind: 'text',
        method: 'text',
        text: 'Readable UTF-8 notes.'
      })
    )
    expect(ocr.recognize).not.toHaveBeenCalled()
  })

  it('keeps result order while extracting independent PDFs concurrently', async () => {
    let active = 0
    let maxActive = 0
    const pdf: PdfAdapter = {
      getPageCount: vi.fn(async () => 1),
      extract: vi.fn(async (file) => {
        active += 1
        maxActive = Math.max(maxActive, active)
        await new Promise((resolve) => setTimeout(resolve, file.name === 'first.pdf' ? 15 : 1))
        active -= 1
        return {
          pageCount: 1,
          pages: [{ pageNumber: 1, text: `Readable text from ${file.name}.` }]
        }
      })
    }

    const result = await extractGenerateSources(
      [
        { id: 'first', kind: 'pdf', file: makeFile('first.pdf', 'application/pdf') },
        { id: 'second', kind: 'pdf', file: makeFile('second.pdf', 'application/pdf') }
      ],
      { pdf }
    )

    expect(maxActive).toBe(2)
    expect(result.extracted.map((source) => source.id)).toEqual(['first', 'second'])
  })

  it('records all-failed extraction so Generate can block AI generation', async () => {
    const pdf: PdfAdapter = {
      getPageCount: vi.fn(async () => 1),
      extract: vi.fn(async () => {
        throw new Error('Password-protected PDF')
      })
    }
    const ocr: OcrAdapter = {
      recognize: vi.fn(async () => '')
    }

    const result = await extractGenerateSources(
      [
        { id: 'pdf-1', kind: 'pdf', file: makeFile('locked.pdf', 'application/pdf') },
        { id: 'image-1', kind: 'image', file: makeFile('blank.png', 'image/png') }
      ],
      { pdf, ocr }
    )
    const decision = createGenerateParseDecision(result)

    expect(result.extracted).toEqual([])
    expect(result.failed).toHaveLength(2)
    expect(result.failed[0]).toEqual(expect.objectContaining({ filename: 'locked.pdf', reason: 'Password-protected PDF' }))
    expect(decision).toEqual({
      action: 'block',
      extracted: [],
      failed: result.failed,
      canContinue: false
    })
  })

  it('marks partial failures as confirmable with only successful sources', async () => {
    const pdf: PdfAdapter = {
      getPageCount: vi.fn(async () => 1),
      extract: vi.fn(async (file) => {
        if (file.name === 'bad.pdf') throw new Error('Unreadable PDF')
        return {
          pageCount: 1,
          pages: [{ pageNumber: 1, text: 'Readable PDF source text.' }]
        }
      })
    }

    const result = await extractGenerateSources(
      [
        { id: 'good', kind: 'pdf', file: makeFile('good.pdf', 'application/pdf') },
        { id: 'bad', kind: 'pdf', file: makeFile('bad.pdf', 'application/pdf') }
      ],
      { pdf }
    )
    const decision = createGenerateParseDecision(result)

    expect(decision.action).toBe('confirm')
    expect(decision.canContinue).toBe(true)
    expect(decision.extracted.map((source) => source.id)).toEqual(['good'])
    expect(decision.failed.map((source) => source.id)).toEqual(['bad'])
  })

  it('validates combined Generate source limits', () => {
    expect(() => assertGenerateSourceLimits({ pdfPages: 50, imageCount: 10 })).not.toThrow()
    expect(() => assertGenerateSourceLimits({ pdfPages: 51, imageCount: 0 })).toThrow(/PDF page limit exceeded/)
    expect(() => assertGenerateSourceLimits({ pdfPages: 0, imageCount: 11 })).toThrow(/Too many images/)
  })

  it('releases PDF resources without requiring pdf.destroy', async () => {
    const cleanup = vi.fn(async () => undefined)
    const destroyTask = vi.fn(async () => undefined)

    await expect(
      releasePdfDocument({
        pdf: { cleanup },
        loadingTask: { destroy: destroyTask }
      })
    ).resolves.toBeUndefined()

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(destroyTask).toHaveBeenCalledTimes(1)
  })
})
