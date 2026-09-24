import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createFlashcardMotion,
  createFlashcardSwipe,
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

  it('swaps halfway through a sideways navigation and blocks overlapping moves', () => {
    vi.useFakeTimers()
    let cursor = 0
    let navigating: 'prev' | 'next' | null = null
    const navigated = vi.fn()
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
      onNavigate: navigated,
      isBusy: () => false
    })

    motion.goNext()
    expect(navigating).toBe('next')
    expect(navigated).toHaveBeenCalledWith('next')
    motion.goNext()
    expect(navigated).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(FLASHCARD_NAVIGATION_DURATION_MS / 2)
    expect(cursor).toBe(1)
    expect(navigating).toBe('next')
    vi.advanceTimersByTime(FLASHCARD_NAVIGATION_DURATION_MS / 2)
    expect(navigating).toBeNull()

    motion.goNext()
    vi.advanceTimersByTime(FLASHCARD_NAVIGATION_DURATION_MS)
    expect(cursor).toBe(1)
    expect(navigated).toHaveBeenCalledTimes(1)
  })

  it('navigates on a horizontal touch without flipping the card', () => {
    const goPrev = vi.fn()
    const goNext = vi.fn()
    const flip = vi.fn()
    const swipe = createFlashcardSwipe({ goPrev, goNext, flip })
    swipe.onTouchStart({ touches: [{ clientX: 180, clientY: 100 }] } as unknown as TouchEvent)
    swipe.onTouchEnd({ changedTouches: [{ clientX: 70, clientY: 110 }] } as unknown as TouchEvent)
    swipe.onClick()
    expect(goNext).toHaveBeenCalledOnce()
    expect(flip).not.toHaveBeenCalled()

    swipe.onTouchStart({ touches: [{ clientX: 100, clientY: 100 }] } as unknown as TouchEvent)
    swipe.onTouchEnd({ changedTouches: [{ clientX: 105, clientY: 180 }] } as unknown as TouchEvent)
    swipe.onClick()
    expect(flip).toHaveBeenCalledOnce()
    expect(goPrev).not.toHaveBeenCalled()
  })
})
