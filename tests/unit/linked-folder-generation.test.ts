import { beforeEach, describe, expect, it, vi } from 'vitest'

const generateTextMock = vi.hoisted(() => vi.fn())

vi.mock('ai', () => ({
  generateText: generateTextMock
}))

import type { ExtractedGenerateSource } from '../../src/composables/generate/source-extraction'
import {
  appendStudyGuide,
  batchLinkedFolderSources,
  generateLinkedFolderContent,
  mergeGeneratedTerms
} from '../../src/composables/generate/linked-folders'

function source(
  id: string,
  input: Partial<ExtractedGenerateSource> = {}
): ExtractedGenerateSource {
  return {
    id,
    filename: `${id}.txt`,
    kind: 'text',
    text: 'Readable source text.',
    method: 'text',
    ...input
  }
}

describe('linked-folder generation', () => {
  beforeEach(() => {
    generateTextMock.mockReset()
  })

  it('batches sources at the existing PDF and image limits while preserving order', () => {
    const batches = batchLinkedFolderSources([
      source('pdf-a', { kind: 'pdf', method: 'pdf-text', pageCount: 40 }),
      source('pdf-b', { kind: 'pdf', method: 'pdf-text', pageCount: 20 }),
      ...Array.from({ length: 11 }, (_, index) =>
        source(`image-${index}`, { kind: 'image', method: 'ocr' })
      )
    ])

    expect(batches.flat().map((item) => item.id)).toEqual([
      'pdf-a',
      'pdf-b',
      ...Array.from({ length: 11 }, (_, index) => `image-${index}`)
    ])
    expect(batches.every((batch) =>
      batch.reduce((sum, item) => sum + (item.kind === 'pdf' ? item.pageCount ?? 1 : 0), 0) <= 50
    )).toBe(true)
    expect(batches.every((batch) => batch.filter((item) => item.kind === 'image').length <= 10)).toBe(true)
  })

  it('preserves existing cards and appends only unique generated cards', () => {
    const existing = [{ id: 'one', front: 'Derivative', back: 'Rate of change' }]
    const additions = [
      { id: 'duplicate', front: ' derivative ', back: 'Rate   of change' },
      { id: 'two', front: 'Integral', back: 'Accumulated change' }
    ]

    expect(mergeGeneratedTerms(existing, additions)).toEqual([
      existing[0],
      additions[1]
    ])
  })

  it('appends guide fragments without rewriting existing markdown', () => {
    expect(appendStudyGuide('# Manual notes\nKeep this.', '## New source\nAdded content.')).toBe(
      '# Manual notes\nKeep this.\n\n---\n\n## New source\nAdded content.'
    )
  })

  it('asks the model to repair an invalid flashcard block once', async () => {
    generateTextMock
      .mockResolvedValueOnce({
        text: [
          '```study_guide_md',
          '# Limits',
          '```',
          '```flashcards_tsv',
          'Limit of a function',
          'The value approached by the function.',
          '```'
        ].join('\n')
      })
      .mockResolvedValueOnce({
        text: [
          '```study_guide_md',
          '# Limits',
          '```',
          '```flashcards_tsv',
          'Limit of a function\tThe value approached by the function.',
          '```'
        ].join('\n')
      })

    const result = await generateLinkedFolderContent({
      model: { modelId: 'test-model' },
      sources: [source('limits')]
    })

    expect(generateTextMock).toHaveBeenCalledTimes(2)
    expect(generateTextMock.mock.calls[1]?.[0]?.prompt).toContain(
      'Repair the formatting'
    )
    expect(result.terms).toEqual([
      expect.objectContaining({
        front: 'Limit of a function',
        back: 'The value approached by the function.'
      })
    ])
  })
})
