import type { Term, Uuid } from '../db/types'
import { createSeededRandom, shuffleWith } from '../random'

export type LearnTrueFalseQuestion = {
  id: string
  kind: 'true_false'
  prompt: string
  answer: boolean
  termId: Uuid
}

export type LearnMultipleChoiceQuestion = {
  id: string
  kind: 'multiple_choice'
  prompt: string
  options: string[]
  answerIndex: number
  termId: Uuid
}

export type LearnWrittenQuestion = {
  id: string
  kind: 'written'
  prompt: string
  answer: string
  termId: Uuid
}

export type LearnQuestionKind = LearnTrueFalseQuestion['kind'] | LearnMultipleChoiceQuestion['kind'] | LearnWrittenQuestion['kind']

export type LearnQuestion = LearnTrueFalseQuestion | LearnMultipleChoiceQuestion | LearnWrittenQuestion

export type LearnGeneratorOptions = {
  seed: number
  maxQuestions?: number
  questionTypes?: LearnQuestionKind[]
  shuffle?: boolean
}

function clampMaxQuestions(v: number | undefined) {
  if (v === undefined) return 40
  const n = Math.floor(v)
  if (!Number.isFinite(n)) return 40
  return Math.min(Math.max(n, 1), 200)
}

function normalizeCell(s: string) {
  return String(s ?? '').replace(/\s+/g, ' ').trim()
}

function formatTfPrompt(front: string, back: string) {
  return `True or False: "${front}" means "${back}".`
}

function formatMcPrompt(front: string) {
  return `What is the definition of "${front}"?`
}

function uniqueBy<T>(items: T[], key: (t: T) => string) {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of items) {
    const k = key(item)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(item)
  }
  return out
}

export function generateLearnQuestions(terms: Term[], options: LearnGeneratorOptions): LearnQuestion[] {
  const seed = Number.isFinite(options.seed) ? Math.floor(options.seed) : 1
  const maxQuestions = clampMaxQuestions(options.maxQuestions)
  const rand = createSeededRandom(seed)
  const requestedTypes = new Set<LearnQuestionKind>(
    options.questionTypes?.length ? options.questionTypes : ['true_false', 'multiple_choice']
  )
  const requestedTypeList = Array.from(requestedTypes)

  const normalizedTerms = terms
    .map((t) => ({ ...t, front: normalizeCell(t.front), back: normalizeCell(t.back) }))
    .filter((t) => t.id && t.front && t.back)

  if (normalizedTerms.length === 0) return []

  const poolById = new Map<Uuid, { id: Uuid; front: string; back: string }>()
  for (const t of normalizedTerms) poolById.set(t.id as Uuid, t as any)

  const uniqueBackTerms = uniqueBy(normalizedTerms, (t) => t.back)

  const questions: LearnQuestion[] = []

  for (let termIndex = 0; termIndex < normalizedTerms.length; termIndex += 1) {
    const t = normalizedTerms[termIndex]!
    const termQuestions: LearnQuestion[] = []
    if (requestedTypes.has('true_false')) {
      const truth = rand() < 0.5

      let shownBack = t.back
      let backSourceId: string = t.id
      let answer = true

      if (!truth) {
        const candidates = uniqueBackTerms.filter((x) => x.id !== t.id && x.back !== t.back)
        if (candidates.length > 0) {
          const wrong = candidates[Math.floor(rand() * candidates.length)]!
          shownBack = wrong.back
          backSourceId = wrong.id
          answer = false
        }
      }

      termQuestions.push({
        id: `tf:${t.id}:${answer ? 't' : 'f'}:${backSourceId}`,
        kind: 'true_false',
        prompt: formatTfPrompt(t.front, shownBack),
        answer,
        termId: t.id as Uuid
      })
    }

    if (requestedTypes.has('multiple_choice')) {
      const distractorCandidates = uniqueBackTerms
        .filter((x) => x.id !== t.id && x.back !== t.back)
        .map((x) => x.back)

      if (distractorCandidates.length >= 3) {
        const shuffled = shuffleWith(distractorCandidates, rand)
        const distractors = shuffled.slice(0, 3)
        const rawOptions = [t.back, ...distractors]
        const choices = shuffleWith(rawOptions, rand)
        const answerIndex = choices.indexOf(t.back)
        const unique = new Set(choices)

        if (unique.size === choices.length && answerIndex >= 0) {
          termQuestions.push({
            id: `mc:${t.id}`,
            kind: 'multiple_choice',
            prompt: formatMcPrompt(t.front),
            options: choices,
            answerIndex,
            termId: t.id as Uuid
          })
        }
      }
    }

    if (requestedTypes.has('written')) {
      termQuestions.push({
        id: `written:${t.id}`,
        kind: 'written',
        prompt: `Write the definition of "${t.front}".`,
        answer: t.back,
        termId: t.id as Uuid
      })
    }

    const preferredKind = requestedTypeList[termIndex % requestedTypeList.length]
    const selected = termQuestions.find((question) => question.kind === preferredKind) ?? termQuestions[0]
    if (selected) questions.push(selected)
  }

  const mixed = options.shuffle === false ? questions : shuffleWith(questions, rand)
  return mixed.slice(0, Math.min(maxQuestions, mixed.length))
}
