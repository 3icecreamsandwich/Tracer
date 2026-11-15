import type { ObjectDirective } from 'vue'

type FitElement = HTMLElement & { cleanupFlashcardFit?: () => void; scheduleFlashcardFit?: () => void }

// Keep a readable minimum size; exceptionally long content remains scrollable.
const MIN_FONT_SIZE = 16

export const vMobileFlashcardFit: ObjectDirective<FitElement, string> = {
  mounted(element) {
    let frame = 0
    const media = window.matchMedia('(max-width: 639px)')
    const fit = () => {
      frame = 0
      element.style.removeProperty('font-size')
      if (!media.matches || !element.isConnected || !element.clientHeight) return
      const originalSize = parseFloat(getComputedStyle(element).fontSize)
      if (!Number.isFinite(originalSize) || element.scrollHeight <= element.clientHeight + 1) return
      let low = Math.min(MIN_FONT_SIZE, originalSize)
      let high = originalSize
      for (let i = 0; i < 8; i++) {
        const size = (low + high) / 2
        element.style.fontSize = `${size}px`
        if (element.scrollHeight <= element.clientHeight + 1) low = size
        else high = size
      }
      element.style.fontSize = `${low}px`
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }
    const resize = new ResizeObserver(schedule)
    if (element.parentElement) resize.observe(element.parentElement)
    const mutations = new MutationObserver(schedule)
    mutations.observe(element, { childList: true, subtree: true, characterData: true })
    element.addEventListener('load', schedule, true)
    media.addEventListener('change', schedule)
    element.scheduleFlashcardFit = schedule
    element.cleanupFlashcardFit = () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      mutations.disconnect()
      element.removeEventListener('load', schedule, true)
      media.removeEventListener('change', schedule)
    }
    schedule()
  },
  updated(element) { element.scheduleFlashcardFit?.() },
  unmounted(element) { element.cleanupFlashcardFit?.() },
}
