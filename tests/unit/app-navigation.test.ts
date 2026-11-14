import { describe, expect, it, vi } from 'vitest'

import {
  fallbackBackTarget,
  flashcardSetIdFromPath,
  hasInAppBackEntry,
  navigateBack,
  resolveAppShortcut,
  shouldPreventFullscreenExit,
} from '../../src/composables/navigation/app-navigation'

function shortcut(
  overrides: Partial<Parameters<typeof resolveAppShortcut>[0]>,
  path = '/',
  isDesktop = false,
) {
  return resolveAppShortcut(
    {
      altKey: false,
      code: '',
      ctrlKey: false,
      key: '',
      metaKey: true,
      shiftKey: false,
      ...overrides,
    },
    path,
    isDesktop,
  )
}

describe('app navigation', () => {
  it('extracts set IDs from set, nested, and fullscreen routes', () => {
    expect(flashcardSetIdFromPath('/set/demo')).toBe('demo')
    expect(flashcardSetIdFromPath('/set/demo/edit')).toBe('demo')
    expect(flashcardSetIdFromPath('/set/id-with-hyphens-flashcards')).toBe('id-with-hyphens')
    expect(flashcardSetIdFromPath('/set/id-with-hyphens-test')).toBe('id-with-hyphens')
    expect(flashcardSetIdFromPath('/study-guide/demo')).toBeNull()
  })

  it('uses in-app history for Back and deterministic deep-link fallbacks', () => {
    const router = { back: vi.fn(), forward: vi.fn(), push: vi.fn(), replace: vi.fn() }

    navigateBack(router, '/set/demo', { back: '/' })
    expect(router.back).toHaveBeenCalledOnce()
    expect(router.push).not.toHaveBeenCalled()

    navigateBack(router, '/set/demo-flashcards', { back: null })
    expect(router.push).toHaveBeenCalledWith('/set/demo')
    navigateBack(router, '/set/demo-match', { back: '/set/demo-learn' })
    expect(router.push).toHaveBeenLastCalledWith('/set/demo')
    expect(router.back).toHaveBeenCalledOnce()
    navigateBack(router, '/set/demo-flashcards', { back: '/set/demo' })
    expect(router.back).toHaveBeenCalledTimes(2)
    expect(fallbackBackTarget('/set/demo-test')).toBe('/set/demo')
    expect(fallbackBackTarget('/study-guide/demo')).toBe('/')
    expect(hasInAppBackEntry({ back: 'https://example.com' })).toBe(false)
  })

  it('resolves global shortcuts and leaves create mode digits unhandled', () => {
    expect(shortcut({ key: '[' })).toEqual({ type: 'back' })
    expect(shortcut({ key: 'ArrowLeft' })).toEqual({ type: 'back' })
    expect(shortcut({ key: ']' })).toEqual({ type: 'forward' })
    expect(shortcut({ key: 'ArrowRight' })).toEqual({ type: 'forward' })
    expect(shortcut({ key: ',' })).toEqual({ type: 'navigate', to: '/settings' })
    expect(shortcut({ key: 'l' })).toBeNull()
    expect(shortcut({ key: 'l' }, '/', true)).toEqual({ type: 'focus-search' })
    expect(shortcut({ key: 'l', metaKey: false, ctrlKey: true }, '/', true)).toEqual({ type: 'focus-search' })
    expect(shortcut({ key: '/', metaKey: false })).toEqual({ type: 'focus-search' })
    expect(shortcut({ key: '/', metaKey: false }, '/', true)).toEqual({ type: 'focus-search' })
    expect(shortcut({ key: '/', metaKey: true })).toBeNull()
    expect(shortcut({ key: 'r' })).toEqual({ type: 'reload' })
    expect(shortcut({ ctrlKey: true, key: 'R', metaKey: false })).toEqual({ type: 'reload' })
    for (const digit of ['1', '2', '3']) {
      expect(shortcut({ code: `Digit${digit}`, key: digit })).toBeNull()
      expect(shortcut({ code: `Digit${digit}`, key: digit, ctrlKey: true, metaKey: false })).toBeNull()
    }
    expect(shortcut({ code: 'Digit3', key: '#', shiftKey: true })).toBeNull()
  })

  it('prevents only bare Escape from triggering the native fullscreen exit', () => {
    expect(shouldPreventFullscreenExit(shortcutEvent({ key: 'Escape' }))).toBe(true)
    expect(shouldPreventFullscreenExit(shortcutEvent({ key: 'Escape', shiftKey: true }))).toBe(false)
    expect(shouldPreventFullscreenExit(shortcutEvent({ key: 'Enter' }))).toBe(false)
  })

  it('resolves set-only Edit and study mode shortcuts', () => {
    expect(shortcut({ key: 'e' }, '/')).toBeNull()
    expect(shortcut({ key: 'e' }, '/set/demo-flashcards')).toEqual({
      type: 'navigate',
      to: '/set/demo/edit',
    })

    const path = '/set/demo'
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit1' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=flashcards',
      replace: true,
    })
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit2' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=learn',
      replace: true,
    })
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit3' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=chat',
      replace: true,
    })
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit4' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=match',
      replace: true,
    })
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit5' }, path)).toEqual({
      type: 'navigate',
      to: '/study-guide/demo',
      replace: true,
    })
    expect(shortcut({ altKey: true, metaKey: false, code: 'Digit1' }, '/study-guide/demo')).toBeNull()
  })
})

function shortcutEvent(
  overrides: Partial<Parameters<typeof resolveAppShortcut>[0]>,
): Parameters<typeof resolveAppShortcut>[0] {
  return {
    altKey: false,
    code: '',
    ctrlKey: false,
    key: '',
    metaKey: false,
    shiftKey: false,
    ...overrides,
  }
}
