import type { Uuid } from '../db/types'
import { sanitizeFlashcardMastery, type FlashcardMasteryByTermId } from './flashcard-mastery'

export type SavedFlashcardProgress = {
  currentTermId: Uuid
  correctTermIds: Uuid[]
  masteryByTermId: FlashcardMasteryByTermId
}

const FLASHCARD_FRONT_KEY = 'tracer:flashcards-definition-first'

function progressKey(setId: Uuid) {
  return `tracer:flashcard-progress:${setId}`
}

export function readWebFlashcardFrontPreference() {
  try {
    return window.localStorage.getItem(FLASHCARD_FRONT_KEY) === 'true'
  } catch {
    return false
  }
}

export function saveWebFlashcardFrontPreference(definitionFirst: boolean) {
  window.localStorage.setItem(FLASHCARD_FRONT_KEY, String(definitionFirst))
}

export function readWebFlashcardProgress(setId: Uuid): SavedFlashcardProgress | null {
  try {
    const raw = window.localStorage.getItem(progressKey(setId))
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as Partial<SavedFlashcardProgress>
      if (typeof parsed.currentTermId !== 'string') return null
      return {
        currentTermId: parsed.currentTermId,
        correctTermIds: Array.isArray(parsed.correctTermIds)
          ? parsed.correctTermIds.filter((id): id is Uuid => typeof id === 'string')
          : [],
        masteryByTermId: sanitizeFlashcardMastery(parsed.masteryByTermId)
      }
    } catch {
      return { currentTermId: raw, correctTermIds: [], masteryByTermId: {} }
    }
  } catch {
    return null
  }
}

export function saveWebFlashcardProgress(
  setId: Uuid,
  progress: SavedFlashcardProgress
) {
  try {
    window.localStorage.setItem(progressKey(setId), JSON.stringify(progress))
  } catch {}
}
