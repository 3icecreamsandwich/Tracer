import { describe, expect, it } from 'vitest'
import {
  DEFAULT_FLASHCARD_STUDY_FILTER,
  sortTermsByFlashcardMastery,
  updateFlashcardMastery,
} from '../../src/composables/cards/flashcard-mastery'

describe('flashcard mastery', () => {
  it('shows all flashcards by default', () => {
    expect(DEFAULT_FLASHCARD_STUDY_FILTER).toBe('all')
  })

  it('masters after three correct answers', () => {
    let progress
    progress = updateFlashcardMastery(progress, 'correct')
    progress = updateFlashcardMastery(progress, 'correct')
    expect(progress.mastered).toBe(false)
    progress = updateFlashcardMastery(progress, 'correct')
    expect(progress.mastered).toBe(true)
  })

  it('moves a mastered card back to learning after two misses', () => {
    let progress = { correctCount: 3, masteredMissCount: 0, mastered: true }
    progress = updateFlashcardMastery(progress, 'incorrect')
    expect(progress.mastered).toBe(true)
    progress = updateFlashcardMastery(progress, 'correct')
    progress = updateFlashcardMastery(progress, 'incorrect')
    expect(progress).toEqual({ correctCount: 0, masteredMissCount: 0, mastered: false })
  })

  it('sorts learning cards before mastered cards after persisted state is loaded', () => {
    const terms = [{ id: 'mastered', front: 'B' }, { id: 'learning', front: 'A' }]
    const sorted = sortTermsByFlashcardMastery(terms, {
      mastered: { correctCount: 3, masteredMissCount: 0, mastered: true },
    })
    expect(sorted.map((term) => term.id)).toEqual(['learning', 'mastered'])
  })
})
