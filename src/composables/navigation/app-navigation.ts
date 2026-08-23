export type AppRouter = {
  back: () => void
  forward: () => void
  push: (to: string) => unknown
  replace: (to: string) => unknown
}

export type AppShortcutAction =
  | { type: 'back' }
  | { type: 'forward' }
  | { type: 'focus-search' }
  | { type: 'navigate'; to: string; replace?: boolean }

type ShortcutEvent = Pick<
  KeyboardEvent,
  'altKey' | 'code' | 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'
>

export function flashcardSetIdFromPath(path: string): string | null {
  const fullscreenMatch = path.match(/^\/set\/(.+)-(?:flashcards|learn|match|test)\/?$/)
  if (fullscreenMatch?.[1]) return fullscreenMatch[1]

  const setMatch = path.match(/^\/set\/([^/]+)(?:\/(?:edit|results))?\/?$/)
  return setMatch?.[1] ?? null
}

export function fallbackBackTarget(path: string): string {
  const fullscreenMatch = path.match(/^\/(set|study-guide)\/(.+)-(?:flashcards|learn|match|test)\/?$/)
  if (fullscreenMatch?.[1] && fullscreenMatch[2]) {
    return `/${fullscreenMatch[1]}/${fullscreenMatch[2]}`
  }

  return '/'
}

export function hasInAppBackEntry(historyState: unknown): boolean {
  if (!historyState || typeof historyState !== 'object') return false
  const back = (historyState as { back?: unknown }).back
  return typeof back === 'string' && back.startsWith('/')
}

export function navigateBack(
  router: AppRouter,
  path: string,
  historyState: unknown,
) {
  if (hasInAppBackEntry(historyState)) {
    router.back()
    return
  }

  void router.push(fallbackBackTarget(path))
}

export function resolveAppShortcut(
  event: ShortcutEvent,
  path: string,
): AppShortcutAction | null {
  const primary = event.metaKey || event.ctrlKey
  if (!primary) return null

  if (!event.altKey && !event.shiftKey && (event.key === '[' || event.key === 'ArrowLeft')) {
    return { type: 'back' }
  }

  if (!event.altKey && !event.shiftKey && (event.key === ']' || event.key === 'ArrowRight')) {
    return { type: 'forward' }
  }

  if (!event.altKey && !event.shiftKey && event.key === ',') {
    return { type: 'navigate', to: '/settings' }
  }

  if (!event.altKey && !event.shiftKey && event.key.toLowerCase() === 'l') {
    return { type: 'focus-search' }
  }

  const setId = flashcardSetIdFromPath(path)

  if (!event.altKey && !event.shiftKey && event.key.toLowerCase() === 'e') {
    return setId ? { type: 'navigate', to: `/set/${setId}/edit` } : null
  }

  if (!event.altKey && !event.shiftKey) {
    if (event.code === 'Digit1') return { type: 'navigate', to: '/create/basic' }
    if (event.code === 'Digit2') return { type: 'navigate', to: '/create/synthesize' }
    if (event.code === 'Digit3') return { type: 'navigate', to: '/create/generate' }
  }

  if (!event.shiftKey && event.altKey && setId) {
    if (event.code === 'Digit1') {
      return { type: 'navigate', to: `/set/${setId}?mode=flashcards`, replace: true }
    }
    if (event.code === 'Digit2') {
      return { type: 'navigate', to: `/set/${setId}?mode=learn`, replace: true }
    }
    if (event.code === 'Digit3') {
      return { type: 'navigate', to: `/set/${setId}?mode=match`, replace: true }
    }
    if (event.code === 'Digit4') {
      return { type: 'navigate', to: `/set/${setId}?mode=chat`, replace: true }
    }
  }

  return null
}
