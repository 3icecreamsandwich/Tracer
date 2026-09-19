import { beforeEach, describe, expect, it, vi } from 'vitest'

const generateTextMock = vi.hoisted(() => vi.fn())

vi.mock('ai', () => ({
  generateText: generateTextMock
}))

import { batchGenerateSources } from '../../src/composables/generate/linked-folders/batches'

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
    const generationModel = { modelId: 'generation-route' }
    const defaultModel = { modelId: 'default-model' }
    const resolveRepairModel = vi.fn().mockResolvedValue(defaultModel)
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
      model: generationModel,
      resolveRepairModel,
      sources: [source('limits')]
    })

    expect(generateTextMock).toHaveBeenCalledTimes(2)
    expect(generateTextMock.mock.calls[0]?.[0]?.model).toBe(generationModel)
    expect(generateTextMock.mock.calls[1]?.[0]?.model).toBe(defaultModel)
    expect(resolveRepairModel).toHaveBeenCalledTimes(1)
    expect(generateTextMock.mock.calls[1]?.[0]?.prompt).toContain(
      'Repair the formatting'
    )
    expect(generateTextMock.mock.calls[1]?.[0]?.prompt).toContain(
      'Tracer parser report:\nFlashcard TSV: line 1 must contain a comma or tab separator'
    )
    expect(result.terms).toEqual([
      expect.objectContaining({
        front: 'Limit of a function',
        back: 'The value approached by the function.'
      })
    ])
  })

  it('feeds each failed repair back to the default model and stops when parsing succeeds', async () => {
    const initialRaw = '```study_guide_md\n# Initial\n```\n```flashcards_tsv\nMissing separator\n```'
    const firstRepair = '```study_guide_md\n# First\n```\n```flashcards_tsv\nStill missing separator\n```'
    const secondRepair = '```study_guide_md\n# Fixed\n```\n```flashcards_tsv\nCell\tBasic unit of life\n```'
    const defaultModel = { modelId: 'default-model' }
    const resolveRepairModel = vi.fn().mockResolvedValue(defaultModel)

    generateTextMock
      .mockResolvedValueOnce({ text: initialRaw })
      .mockResolvedValueOnce({ text: firstRepair })
      .mockResolvedValueOnce({ text: secondRepair })

    const result = await generateLinkedFolderContent({
      model: { modelId: 'generation-route' },
      resolveRepairModel,
      sources: [source('biology')]
    })

    expect(generateTextMock).toHaveBeenCalledTimes(3)
    expect(generateTextMock.mock.calls[1]?.[0]?.model).toBe(defaultModel)
    expect(generateTextMock.mock.calls[2]?.[0]?.model).toBe(defaultModel)
    expect(generateTextMock.mock.calls[2]?.[0]?.prompt).toContain(firstRepair)
    expect(result.terms).toEqual([
      expect.objectContaining({ front: 'Cell', back: 'Basic unit of life' })
    ])
  })

  it('throws the third repair parser error after three failed repair attempts', async () => {
    const invalidOutputs = [
      'Initial invalid row',
      'First invalid repair',
      'Second invalid repair',
      'Third invalid repair'
    ].map((row) => `\`\`\`study_guide_md\n# Guide\n\`\`\`\n\`\`\`flashcards_tsv\n${row}\n\`\`\``)
    const defaultModel = { modelId: 'default-model' }

    for (const text of invalidOutputs) generateTextMock.mockResolvedValueOnce({ text })

    await expect(generateLinkedFolderContent({
      model: { modelId: 'generation-route' },
      resolveRepairModel: async () => defaultModel,
      sources: [source('biology')]
    })).rejects.toThrow('line 1 must contain a comma or tab separator')

    expect(generateTextMock).toHaveBeenCalledTimes(4)
    expect(generateTextMock.mock.calls.slice(1).every((call) => call[0]?.model === defaultModel)).toBe(true)
    expect(generateTextMock.mock.calls[3]?.[0]?.prompt).toContain('Second invalid repair')
  })

  it('splits a large individual PDF without losing text', () => {
    const text = ('A paragraph about cells.\n\n').repeat(3000)
    const batches = batchGenerateSources([source('large', { kind: 'pdf', text, pageCount: 50 })])
    expect(batches.length).toBeGreaterThan(1)
    expect(batches.flat().map((item) => item.text).join('')).toBe(text)
    expect(batches.every((batch) => batch.reduce((sum, item) => sum + item.text.length, 0) <= 60000)).toBe(true)
  })

  it('runs provider requests sequentially and merges in source order', async () => {
    let active = 0
    let peak = 0
    const releases: Array<() => void> = []
    generateTextMock.mockImplementation(async () => {
      const index = releases.length
      active += 1
      peak = Math.max(peak, active)
      await new Promise<void>((resolve) => releases.push(resolve))
      active -= 1
      return { text: `\`\`\`study_guide_md\n# Guide ${index}\n\`\`\`\n\`\`\`flashcards_tsv\nTerm ${index}\tDefinition ${index}\n\`\`\`` }
    })
    const pending = generateLinkedFolderContent({ model: {}, sources: [source('large', { text: 'x'.repeat(220000) })] })
    await vi.waitFor(() => expect(releases).toHaveLength(1))
    releases[0]!()
    await vi.waitFor(() => expect(releases).toHaveLength(2))
    releases[1]!()
    await vi.waitFor(() => expect(releases).toHaveLength(3))
    releases[2]!()
    await vi.waitFor(() => expect(releases).toHaveLength(4))
    releases[3]!()
    const output = await pending
    expect(peak).toBe(1)
    expect(output.terms.map((term) => term.front)).toEqual(['Term 0', 'Term 1', 'Term 2', 'Term 3'])
  })

  it('stops scheduling batches after a failure', async () => {
    const onRawOutput = vi.fn()
    let calls = 0
    generateTextMock.mockImplementation(async () => {
      calls += 1
      if (calls === 1) throw new Error('Provider unavailable')
      await new Promise((resolve) => setTimeout(resolve, 10))
      return { text: '```study_guide_md\n# Guide\n```\n```flashcards_tsv\nCell\tBasic unit of life\n```' }
    })
    await expect(generateLinkedFolderContent({
      model: {}, sources: [source('large', { text: 'x'.repeat(90000) })], onRawOutput
    })).rejects.toThrow('Provider unavailable')
    expect(calls).toBe(1)
    expect(onRawOutput).not.toHaveBeenCalled()
  })

})
