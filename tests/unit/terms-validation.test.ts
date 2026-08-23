import { describe, expect, it } from 'vitest'
import {
  normalizeTerms,
  TermsValidationError
} from '../../src/composables/db/validators/terms'

describe('normalizeTerms', () => {
  it('normalizes front/back, ensures non-empty, and generates id when missing', () => {
    const ids = ['11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222']
    let idx = 0
    const randomUuid = () => ids[idx++]!

    const out = normalizeTerms(
      [
        { front: '  hello  ', back: ' world ' },
        { id: 'custom-id', front: 'x', back: 'y' },
        { front: 'a', back: 'b' }
      ],
      { randomUuid }
    )

    expect(out).toEqual([
      { id: ids[0], front: 'hello', back: 'world' },
      { id: 'custom-id', front: 'x', back: 'y' },
      { id: ids[1], front: 'a', back: 'b' }
    ])
  })

  it('preserves valid per-side image metadata', () => {
    const out = normalizeTerms(
      [
        {
          id: 'term-with-images',
          front: 'leaf',
          back: 'plant organ',
          frontImage: {
            filename: 'leaf.png',
            mimeType: 'image/png',
            dataUrl: 'data:image/png;base64,AAAA'
          },
          backImage: {
            filename: 'diagram.svg',
            mimeType: 'image/svg+xml',
            dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+'
          }
        }
      ],
      { randomUuid: () => 'unused' }
    )

    expect(out).toEqual([
      {
        id: 'term-with-images',
        front: 'leaf',
        back: 'plant organ',
        frontImage: {
          filename: 'leaf.png',
          mimeType: 'image/png',
          dataUrl: 'data:image/png;base64,AAAA'
        },
        backImage: {
          filename: 'diagram.svg',
          mimeType: 'image/svg+xml',
          dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+'
        }
      }
    ])
  })

  it('allows a side to use only image metadata', () => {
    const out = normalizeTerms(
      [
        {
          id: 'image-only-front',
          front: '',
          back: 'plant organ',
          frontImage: {
            filename: 'leaf.png',
            mimeType: 'image/png',
            dataUrl: 'data:image/png;base64,AAAA'
          }
        },
        {
          id: 'image-only-back',
          front: 'stem',
          back: '',
          backImage: {
            filename: 'stem.svg',
            mimeType: 'image/svg+xml',
            dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+'
          }
        }
      ],
      { randomUuid: () => 'unused' }
    )

    expect(out).toEqual([
      {
        id: 'image-only-front',
        front: '',
        back: 'plant organ',
        frontImage: {
          filename: 'leaf.png',
          mimeType: 'image/png',
          dataUrl: 'data:image/png;base64,AAAA'
        }
      },
      {
        id: 'image-only-back',
        front: 'stem',
        back: '',
        backImage: {
          filename: 'stem.svg',
          mimeType: 'image/svg+xml',
          dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+'
        }
      }
    ])
  })

  it('rejects image metadata when the data URL does not match the mime type', () => {
    expect(() =>
      normalizeTerms([
        {
          front: 'x',
          back: 'y',
          frontImage: {
            filename: 'bad.png',
            mimeType: 'image/png',
            dataUrl: 'data:image/jpeg;base64,AAAA'
          }
        }
      ])
    ).toThrow(TermsValidationError)
  })

  it('rejects empty front', () => {
    expect(() => normalizeTerms([{ front: '  ', back: 'x' }])).toThrow(TermsValidationError)
  })

  it('rejects empty back', () => {
    expect(() => normalizeTerms([{ front: 'x', back: '' }])).toThrow(TermsValidationError)
  })
})
