import { describe, expect, it } from 'vitest'
import {
  DEFAULT_FLASHCARD_STUDY_FILTER,
  isFlashcardGettingBetter,
  flashcardStudyGroup,
  sanitizeFlashcardMastery,
  sortTermsByFlashcardMastery,
  updateFlashcardMastery,
} from '../../src/composables/cards/flashcard-mastery'

describe('flashcard mastery', () => {
  it('shows all flashcards by default', () => {
    expect(DEFAULT_FLASHCARD_STUDY_FILTER).toBe('all')
  })

  it('masters after two correct answers', () => {
    let progress
    progress = updateFlashcardMastery(progress, 'correct')
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

  it('uses the latest answer to place a card in the Terms study groups', () => {
    let progress
    progress = updateFlashcardMastery(progress, 'correct')
    expect(isFlashcardGettingBetter(progress)).toBe(true)
    progress = updateFlashcardMastery(progress, 'incorrect')
    expect(isFlashcardGettingBetter(progress)).toBe(false)
  })

  it('places a correctly answered card in improving after saving and sorts it between learning and mastered', () => {
    const saved = sanitizeFlashcardMastery({
      improving: updateFlashcardMastery(undefined, 'correct'),
      mastered: updateFlashcardMastery(updateFlashcardMastery(undefined, 'correct'), 'correct'),
    })
    expect(flashcardStudyGroup(saved.improving)).toBe('gettingBetter')
    const terms = [{ id: 'mastered' }, { id: 'improving' }, { id: 'learning' }]
    expect(sortTermsByFlashcardMastery(terms, saved).map(term => term.id)).toEqual(['learning', 'improving', 'mastered'])
    expect(flashcardStudyGroup(updateFlashcardMastery(saved.improving, 'incorrect'))).toBe('learning')
  })

  it('sorts learning cards before cards getting better after persisted state is loaded', () => {
    const terms = [{ id: 'mastered', front: 'B' }, { id: 'learning', front: 'A' }]
    const sorted = sortTermsByFlashcardMastery(terms, {
      mastered: { correctCount: 3, masteredMissCount: 0, mastered: true, lastAnswer: 'correct' },
    })
    expect(sorted.map((term) => term.id)).toEqual(['learning', 'mastered'])
  })
})
