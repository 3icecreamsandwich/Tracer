import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createFlashcardMotion,
  FLASHCARD_FLIP_DURATION_MS,
  FLASHCARD_NAVIGATION_DURATION_MS
} from '../../src/composables/cards/flashcard-motion'

describe('flashcard motion', () => {
  afterEach(() => vi.useRealTimers())

  it('swaps the card at the flip midpoint and completes at the existing duration', () => {
    vi.useFakeTimers()
    let flipped = false
    let flipping = false
    const motion = createFlashcardMotion({
      getFlipCardCount: () => 2,
      getNavigationCardCount: () => 2,
      getCursorIndex: () => 0,
      setCursorIndex: () => {},
      getFlipped: () => flipped,
      setFlipped: (value) => { flipped = value },
      getFlipping: () => flipping,
      setFlipping: (value) => { flipping = value },
      setNavigating: () => {},
      isBusy: () => false
    })

    motion.toggleFlip()
    expect(flipping).toBe(true)
    vi.advanceTimersByTime(FLASHCARD_FLIP_DURATION_MS / 2)
    expect(flipped).toBe(true)
    vi.advanceTimersByTime(FLASHCARD_FLIP_DURATION_MS / 2)
    expect(flipping).toBe(false)
  })

  it('moves within bounds after the existing navigation delay', () => {
    vi.useFakeTimers()
    let cursor = 0
    let navigating: 'prev' | 'next' | null = null
    const motion = createFlashcardMotion({
      getFlipCardCount: () => 2,
      getNavigationCardCount: () => 2,
      getCursorIndex: () => cursor,
      setCursorIndex: (value) => { cursor = value },
      getFlipped: () => true,
      setFlipped: () => {},
      getFlipping: () => false,
      setFlipping: () => {},
      setNavigating: (value) => { navigating = value },
      isBusy: () => false
    })

    motion.goNext()
    expect(navigating).toBe('next')
    vi.advanceTimersByTime(FLASHCARD_NAVIGATION_DURATION_MS)
    expect(cursor).toBe(1)
    expect(navigating).toBeNull()

    motion.goNext()
    vi.advanceTimersByTime(FLASHCARD_NAVIGATION_DURATION_MS)
    expect(cursor).toBe(1)
  })
})
