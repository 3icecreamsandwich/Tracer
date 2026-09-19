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
  it('unwraps the provider error from an AI SDK retry error', () => {
    const providerError = Object.assign(new Error('The AI provider returned 429. Check its key and quota in Settings.'), { status: 429 })
    const retryError = Object.assign(new Error('Failed after 3 attempts. Last error:'), { lastError: providerError })

    const out = normalizeGenerateRequestError(retryError) as Error & { status?: number }
    expect(out.message).toBe(providerError.message)
    expect(out.status).toBe(429)
  })

  it('recovers a provider status from an AI SDK retry response body', () => {
    const retryError = Object.assign(new Error('Failed after 3 attempts. Last error:'), {
      lastError: { statusCode: 429, responseBody: '{"error":{"message":"Quota exhausted"}}' }
    })

    const out = normalizeGenerateRequestError(retryError) as Error & { status?: number }
    expect(out.message).toBe('Quota exhausted')
    expect(out.status).toBe(429)
  })

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
    expect(() => assertGenerateSourceLimits({ pdfPages: 15, imageCount: 5 })).not.toThrow()
    expect(() => assertGenerateSourceLimits({ pdfPages: 16, imageCount: 1 })).toThrow(
      /PDF page limit exceeded/
    )
    expect(() => assertGenerateSourceLimits({ pdfPages: 1, imageCount: 6 })).toThrow(
      /Too many images/
    )
  })
})
