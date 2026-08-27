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
  isBusy: () => boolean
}

export function createFlashcardMotion(options: FlashcardMotionOptions) {
  let flipSwapTimeout: ReturnType<typeof setTimeout> | null = null
  let flipEndTimeout: ReturnType<typeof setTimeout> | null = null

  function toggleFlip() {
    if (options.getFlipCardCount() === 0 || options.isBusy() || options.getFlipping()) return
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
    if (count === 0 || options.isBusy()) return
    const offset = direction === 'prev' ? -1 : 1
    const current = options.getCursorIndex()
    const next = Math.min(Math.max(current + offset, 0), count - 1)
    if (next === current) return

    options.setNavigating(direction)
    setTimeout(() => {
      options.setCursorIndex(next)
      options.setFlipped(false)
      options.setNavigating(null)
    }, FLASHCARD_NAVIGATION_DURATION_MS)
  }

  function cancel() {
    if (flipSwapTimeout !== null) clearTimeout(flipSwapTimeout)
    if (flipEndTimeout !== null) clearTimeout(flipEndTimeout)
    flipSwapTimeout = null
    flipEndTimeout = null
  }

  return {
    toggleFlip,
    goPrev: () => navigate('prev'),
    goNext: () => navigate('next'),
    cancel
  }
}
