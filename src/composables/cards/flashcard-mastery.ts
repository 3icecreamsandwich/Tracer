import type { Uuid } from '../db/types'

export const FLASHCARD_MASTERY_CORRECT_THRESHOLD = 2
export const FLASHCARD_MASTERY_MISSED_THRESHOLD = 2
export const DEFAULT_FLASHCARD_STUDY_FILTER = 'all' as const

export type FlashcardStudyFilter = 'learning' | 'mastered' | 'all'

export type FlashcardMastery = {
  correctCount: number
  masteredMissCount: number
  mastered: boolean
  /** The most recent answer drives the visible Terms-list study group. */
  lastAnswer?: 'correct' | 'incorrect'
}

export type FlashcardMasteryByTermId = Record<Uuid, FlashcardMastery>

export function defaultFlashcardMastery(): FlashcardMastery {
  return { correctCount: 0, masteredMissCount: 0, mastered: false }
}

export function updateFlashcardMastery(
  current: FlashcardMastery | undefined,
  answer: 'correct' | 'incorrect'
): FlashcardMastery {
  const next = { ...(current ?? defaultFlashcardMastery()) }
  if (answer === 'correct') {
    next.lastAnswer = 'correct'
    if (!next.mastered) {
      next.correctCount += 1
      if (next.correctCount >= FLASHCARD_MASTERY_CORRECT_THRESHOLD) {
        next.mastered = true
        next.masteredMissCount = 0
      }
    }
    return next
  }

  next.lastAnswer = 'incorrect'
  if (next.mastered) {
    next.masteredMissCount += 1
    if (next.masteredMissCount >= FLASHCARD_MASTERY_MISSED_THRESHOLD) {
      return defaultFlashcardMastery()
    }
  }
  return next
}

export function sanitizeFlashcardMastery(value: unknown): FlashcardMasteryByTermId {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result: FlashcardMasteryByTermId = {}
  for (const [id, raw] of Object.entries(value)) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) continue
    const item = raw as Partial<FlashcardMastery>
    result[id] = {
      correctCount: Math.max(0, Math.floor(Number(item.correctCount) || 0)),
      masteredMissCount: Math.max(0, Math.floor(Number(item.masteredMissCount) || 0)),
      mastered: item.mastered === true,
      // Older saved runs did not store the last answer. Preserve the progress
      // users already earned by treating a prior correct streak as improving.
      lastAnswer: item.lastAnswer === 'correct' || item.lastAnswer === 'incorrect'
        ? item.lastAnswer
        : item.mastered === true || Number(item.correctCount) > 0
          ? 'correct'
          : undefined
    }
  }
  return result
}

export function isFlashcardGettingBetter(mastery: FlashcardMastery | undefined) {
  return mastery?.mastered !== true && (
    mastery?.lastAnswer === 'correct' ||
    (mastery?.lastAnswer === undefined && (mastery?.correctCount ?? 0) > 0)
  )
}

export function flashcardStudyGroup(mastery: FlashcardMastery | undefined) {
  if (mastery?.mastered === true) return 'mastered' as const
  if (isFlashcardGettingBetter(mastery)) return 'gettingBetter' as const
  return 'learning' as const
}

export function sortTermsByFlashcardMastery<T extends { id: Uuid }>(
  terms: T[],
  masteryByTermId: FlashcardMasteryByTermId
) {
  const rank = { learning: 0, gettingBetter: 1, mastered: 2 }
  return [...terms].sort(
    (left, right) =>
      rank[flashcardStudyGroup(masteryByTermId[left.id])] -
      rank[flashcardStudyGroup(masteryByTermId[right.id])]
  )
}
