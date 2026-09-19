import { generateText } from 'ai'
import type { Term } from '../../db'
import {
  normalizeTerms,
  parseTermsDelimited,
  TermsValidationError,
  TsvParseError
} from '../../db/validators'
import {
  GenerateContractParseError,
  parseGenerateContractOutput
} from '../../ai/generate-contract'
import { buildGenerateTextPrompt, type ExtractedGenerateSource } from '../source-extraction'
import { batchGenerateSources } from './batches'

export type LinkedFolderGeneratedContent = {
  studyGuideMarkdown: string
  terms: Term[]
  rawOutput: string
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>
): Promise<R[]> {
  const output = new Array<R>(values.length)
  let nextIndex = 0
  let failed = false

  async function worker() {
    while (!failed && nextIndex < values.length) {
      const index = nextIndex
      nextIndex += 1
      try {
        output[index] = await mapper(values[index]!, index)
      } catch (error) {
        failed = true
        throw error
      }
    }
  }

  const settled = await Promise.allSettled(
    Array.from({ length: Math.min(Math.max(1, concurrency), values.length) }, () => worker())
  )
  const failure = settled.find((result) => result.status === 'rejected')
  if (failure?.status === 'rejected') throw failure.reason
  return output
}

function parseTerms(tsv: string) {
  const inputs = parseTermsDelimited(tsv, {
    delimiter: 'tab',
    allowContinuationLines: true
  }).map((term) => ({
    front: term.front.split('\t').join(' ').trim(),
    back: term.back.split('\t').join(' ').trim()
  }))
  return normalizeTerms(inputs)
}

function parseBatchOutput(raw: string) {
  const parsed = parseGenerateContractOutput(raw.trim())
  return {
    studyGuideMarkdown: parsed.studyGuideMarkdown,
    terms: parseTerms(parsed.flashcardsTsv)
  }
}

function isGeneratedOutputParseError(error: unknown) {
  return (
    error instanceof GenerateContractParseError ||
    error instanceof TsvParseError ||
    error instanceof TermsValidationError
  )
}

function summarizeGeneratedOutputParseError(error: unknown) {
  const message = error instanceof Error && error.message.trim()
    ? error.message.trim()
    : 'The generated output did not match Tracer\'s expected format.'

  if (error instanceof GenerateContractParseError) return `Output structure: ${message}`
  if (error instanceof TsvParseError) return `Flashcard TSV: ${message}`
  if (error instanceof TermsValidationError) return `Flashcard validation: ${message}`
  return message
}

function buildFormatRepairPrompt(raw: string, parseError: unknown) {
  return [
    'Repair the formatting of the previous study-material output without adding, removing, or changing facts.',
    '',
    'Tracer parser report:',
    summarizeGeneratedOutputParseError(parseError),
    'Return EXACTLY two fenced code blocks and NOTHING else:',
    '',
    '```study_guide_md',
    '(the same study guide markdown)',
    '```',
    '',
    '```flashcards_tsv',
    'term<TAB>definition',
    '```',
    '',
    'Inside flashcards_tsv, every card must occupy exactly one physical line with exactly one literal tab.',
    'Replace any line breaks inside a term or definition with the literal two-character sequence "\\n".',
    'Do not include a header, bullets, numbering, commentary, or blank lines in flashcards_tsv.',
    '',
    '<previous_output>',
    raw.replaceAll('</previous_output>', '&lt;/previous_output&gt;'),
    '</previous_output>'
  ].join('\n')
}

const MAX_FORMAT_REPAIR_ATTEMPTS = 3

async function parseOrRepairBatchOutput(
  model: any,
  raw: string,
  resolveRepairModel?: () => Promise<any>
) {
  try {
    return { raw, ...parseBatchOutput(raw) }
  } catch (error) {
    if (!isGeneratedOutputParseError(error)) throw error

    const repairModel = resolveRepairModel ? await resolveRepairModel() : model
    let failedRaw = raw
    let parseError = error

    for (let attempt = 0; attempt < MAX_FORMAT_REPAIR_ATTEMPTS; attempt += 1) {
      const repairedResponse = await generateText({
        model: repairModel,
        prompt: buildFormatRepairPrompt(failedRaw, parseError)
      })
      const repairedRaw = repairedResponse.text ?? ''

      try {
        return { raw: repairedRaw, ...parseBatchOutput(repairedRaw) }
      } catch (nextError) {
        if (!isGeneratedOutputParseError(nextError)) throw nextError
        failedRaw = repairedRaw
        parseError = nextError
      }
    }

    throw parseError
  }
}

function termKey(term: Pick<Term, 'front' | 'back'>) {
  return `${term.front.replace(/\s+/g, ' ').trim().toLocaleLowerCase()}\u0000${term.back
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase()}`
}

export function mergeGeneratedTerms(existing: Term[], additions: Term[]) {
  const keys = new Set(existing.map(termKey))
  const merged = [...existing]
  for (const term of additions) {
    const key = termKey(term)
    if (keys.has(key)) continue
    keys.add(key)
    merged.push(term)
  }
  return merged
}

export function appendStudyGuide(existing: string, addition: string) {
  const before = existing.trim()
  const after = addition.trim()
  if (!before) return after
  if (!after) return before
  return `${before}\n\n---\n\n${after}`
}

export async function generateLinkedFolderContent(input: {
  model: any
  resolveRepairModel?: () => Promise<any>
  sources: ExtractedGenerateSource[]
  instructions?: string
  incremental?: boolean
  onRawOutput?: (raw: string) => void
}): Promise<LinkedFolderGeneratedContent> {
  const batches = batchGenerateSources(input.sources)
  const rawBatches = new Array<string>(batches.length)
  // Linked folders often create several batches at once. Keep provider calls
  // sequential so low-RPM accounts are not rate-limited by a burst of requests.
  const outputs = await mapWithConcurrency(batches, 1, async (sources, index) => {
    const prompt = buildGenerateTextPrompt({
      instructions: input.instructions,
      sources,
      incremental: input.incremental === true || index > 0
    })
    const response = await generateText({ model: input.model, prompt })
    const raw = response.text ?? ''
    rawBatches[index] = raw
    input.onRawOutput?.(rawBatches.map((text, i) => text ? `Batch ${i + 1}\n\n${text}` : '').filter(Boolean).join('\n\n'))
    return parseOrRepairBatchOutput(input.model, raw, input.resolveRepairModel)
  })

  return {
    studyGuideMarkdown: outputs.map((output) => output.studyGuideMarkdown.trim()).join('\n\n---\n\n'),
    terms: mergeGeneratedTerms([], outputs.flatMap((output) => output.terms)),
    rawOutput: outputs.map((output, index) => `Batch ${index + 1}\n\n${output.raw}`).join('\n\n')
  }
}
