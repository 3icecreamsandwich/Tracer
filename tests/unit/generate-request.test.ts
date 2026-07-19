import { describe, expect, it } from 'vitest'

import {
  GenerateTextRequestFormatError,
  normalizeGenerateRequestError
} from '../../src/composables/ai/generate-request'
import {
  assertGenerateSourceLimits,
  buildGenerateTextPrompt,
  type ExtractedGenerateSource
} from '../../src/composables/generate/source-extraction'

describe('generate request helpers', () => {
  it('builds a text-only prompt from extracted sources', () => {
    const sources: ExtractedGenerateSource[] = [
      {
        id: 'pdf-1',
        filename: 'notes.pdf',
        kind: 'pdf',
        pageCount: 2,
        method: 'mixed',
        text: '### Page 1\nPhotosynthesis converts light into chemical energy.\n\n```source fence```'
      },
      {
        id: 'image-1',
        filename: 'diagram.png',
        kind: 'image',
        method: 'ocr',
        text: 'Chloroplast labels: thylakoid, stroma, granum.'
      }
    ]

    const prompt = buildGenerateTextPrompt({ instructions: 'Focus on definitions.', sources })

    expect(typeof prompt).toBe('string')
    expect(prompt).toContain('```study_guide_md')
    expect(prompt).toContain('```flashcards_tsv')
    expect(prompt).toContain('User instructions: Focus on definitions.')
    expect(prompt).toContain('## Source: notes.pdf')
    expect(prompt).toContain('Extraction: mixed')
    expect(prompt).toContain('## Source: diagram.png')
    expect(prompt).toContain("'''source fence'''")
    expect(prompt).not.toContain('"type":"file"')
    expect(prompt).not.toContain('"type":"image"')
  })

  it('normalizes provider invalid-message-format failures to a text-request error', () => {
    const out = normalizeGenerateRequestError(new Error('invalid message format'))
    expect(out).toBeInstanceOf(GenerateTextRequestFormatError)
    expect((out as Error).message).toContain('parsed the uploaded files into text')
  })

  it('validates combined Generate source limits', () => {
    expect(() => assertGenerateSourceLimits({ pdfPages: 50, imageCount: 10 })).not.toThrow()
    expect(() => assertGenerateSourceLimits({ pdfPages: 51, imageCount: 1 })).toThrow(
      /PDF page limit exceeded/
    )
    expect(() => assertGenerateSourceLimits({ pdfPages: 1, imageCount: 11 })).toThrow(
      /Too many images/
    )
  })
})
