import type { Uuid } from '../db/types'

export const FLASHCARD_MASTERY_CORRECT_THRESHOLD = 3
export const FLASHCARD_MASTERY_MISSED_THRESHOLD = 2
export const DEFAULT_FLASHCARD_STUDY_FILTER = 'all' as const

export type FlashcardStudyFilter = 'learning' | 'mastered' | 'all'

export type FlashcardMastery = {
  correctCount: number
  masteredMissCount: number
  mastered: boolean
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
    if (!next.mastered) {
      next.correctCount += 1
      if (next.correctCount >= FLASHCARD_MASTERY_CORRECT_THRESHOLD) {
        next.mastered = true
        next.masteredMissCount = 0
      }
    }
    return next
  }

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
      mastered: item.mastered === true
    }
  }
  return result
}

export function sortTermsByFlashcardMastery<T extends { id: Uuid }>(
  terms: T[],
  masteryByTermId: FlashcardMasteryByTermId
) {
  return [...terms].sort(
    (left, right) =>
      Number(masteryByTermId[left.id]?.mastered === true) -
      Number(masteryByTermId[right.id]?.mastered === true)
  )
}
