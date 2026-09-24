export const FLASHCARD_FLIP_DURATION_MS = 320
export const FLASHCARD_NAVIGATION_DURATION_MS = 250

type FlashcardMotionOptions = {
  getFlipCardCount: () => number
  getNavigationCardCount: () => number
  getCursorIndex: () => number
  setCursorIndex: (index: number) => void
  getFlipped: () => boolean
  setFlipped: (flipped: boolean) => void
  getFlipping: () => boolean
  setFlipping: (flipping: boolean) => void
  setNavigating: (direction: 'prev' | 'next' | null) => void
  onNavigate?: (direction: 'prev' | 'next') => void
  isBusy: () => boolean
}

export function createFlashcardMotion(options: FlashcardMotionOptions) {
  let flipSwapTimeout: ReturnType<typeof setTimeout> | null = null
  let flipEndTimeout: ReturnType<typeof setTimeout> | null = null
  let navigationSwapTimeout: ReturnType<typeof setTimeout> | null = null
  let navigationEndTimeout: ReturnType<typeof setTimeout> | null = null

  function toggleFlip() {
    if (options.getFlipCardCount() === 0 || options.isBusy() || options.getFlipping() || navigationEndTimeout !== null) return
    options.setFlipping(true)

    flipSwapTimeout = setTimeout(() => {
      options.setFlipped(!options.getFlipped())
      flipSwapTimeout = null
    }, FLASHCARD_FLIP_DURATION_MS / 2)

    flipEndTimeout = setTimeout(() => {
      options.setFlipping(false)
      flipEndTimeout = null
    }, FLASHCARD_FLIP_DURATION_MS)
  }

  function navigate(direction: 'prev' | 'next') {
    const count = options.getNavigationCardCount()
    if (count === 0 || options.isBusy() || options.getFlipping() || navigationEndTimeout !== null) return
    const offset = direction === 'prev' ? -1 : 1
    const current = options.getCursorIndex()
    const next = Math.min(Math.max(current + offset, 0), count - 1)
    if (next === current) return

    options.onNavigate?.(direction)
    options.setNavigating(direction)
    navigationSwapTimeout = setTimeout(() => {
      options.setCursorIndex(next)
      options.setFlipped(false)
      navigationSwapTimeout = null
    }, FLASHCARD_NAVIGATION_DURATION_MS / 2)
    navigationEndTimeout = setTimeout(() => {
      options.setNavigating(null)
      navigationEndTimeout = null
    }, FLASHCARD_NAVIGATION_DURATION_MS)
  }

  function cancel() {
    if (flipSwapTimeout !== null) clearTimeout(flipSwapTimeout)
    if (flipEndTimeout !== null) clearTimeout(flipEndTimeout)
    if (navigationSwapTimeout !== null) clearTimeout(navigationSwapTimeout)
    if (navigationEndTimeout !== null) clearTimeout(navigationEndTimeout)
    flipSwapTimeout = null
    flipEndTimeout = null
    navigationSwapTimeout = null
    navigationEndTimeout = null
    options.setNavigating(null)
  }

  return {
    toggleFlip,
    goPrev: () => navigate('prev'),
    goNext: () => navigate('next'),
    cancel
  }
}

export function createFlashcardSwipe(options: {
  goPrev: () => void
  goNext: () => void
  flip: () => void
}) {
  let start: { x: number; y: number } | null = null
  let suppressClickUntil = 0

  return {
    onTouchStart(event: TouchEvent) {
      const touch = event.touches[0]
      start = touch ? { x: touch.clientX, y: touch.clientY } : null
    },
    onTouchEnd(event: TouchEvent) {
      const touch = event.changedTouches[0]
      if (!start || !touch) return
      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      start = null
      if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy) * 1.25) return
      suppressClickUntil = Date.now() + 500
      if (dx < 0) options.goNext()
      else options.goPrev()
    },
    onTouchCancel() { start = null },
    onClick() {
      if (Date.now() < suppressClickUntil) {
        suppressClickUntil = 0
        return
      }
      options.flip()
    }
  }
}
