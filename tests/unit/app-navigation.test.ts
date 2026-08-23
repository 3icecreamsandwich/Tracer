import { describe, expect, it, vi } from 'vitest'

import {
  fallbackBackTarget,
  flashcardSetIdFromPath,
  hasInAppBackEntry,
  navigateBack,
  resolveAppShortcut,
} from '../../src/composables/navigation/app-navigation'

function shortcut(
  overrides: Partial<Parameters<typeof resolveAppShortcut>[0]>,
  path = '/',
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
    expect(fallbackBackTarget('/set/demo-test')).toBe('/set/demo')
    expect(fallbackBackTarget('/study-guide/demo')).toBe('/')
    expect(hasInAppBackEntry({ back: 'https://example.com' })).toBe(false)
  })

  it('resolves global and create shortcuts', () => {
    expect(shortcut({ key: '[' })).toEqual({ type: 'back' })
    expect(shortcut({ key: 'ArrowLeft' })).toEqual({ type: 'back' })
    expect(shortcut({ key: ']' })).toEqual({ type: 'forward' })
    expect(shortcut({ key: 'ArrowRight' })).toEqual({ type: 'forward' })
    expect(shortcut({ key: ',' })).toEqual({ type: 'navigate', to: '/settings' })
    expect(shortcut({ key: 'l' })).toEqual({ type: 'focus-search' })
    expect(shortcut({ code: 'Digit1', key: '1' })).toEqual({
      type: 'navigate',
      to: '/create/basic',
    })
    expect(shortcut({ code: 'Digit2', key: '2' })).toEqual({
      type: 'navigate',
      to: '/create/synthesize',
    })
    expect(shortcut({ code: 'Digit3', key: '3' })).toEqual({
      type: 'navigate',
      to: '/create/generate',
    })
    expect(shortcut({ code: 'Digit3', key: '#', shiftKey: true })).toBeNull()
  })

  it('resolves set-only Edit and study mode shortcuts', () => {
    expect(shortcut({ key: 'e' }, '/')).toBeNull()
    expect(shortcut({ key: 'e' }, '/set/demo-flashcards')).toEqual({
      type: 'navigate',
      to: '/set/demo/edit',
    })

    const path = '/set/demo'
    expect(shortcut({ altKey: true, code: 'Digit1' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=flashcards',
      replace: true,
    })
    expect(shortcut({ altKey: true, code: 'Digit2' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=learn',
      replace: true,
    })
    expect(shortcut({ altKey: true, code: 'Digit3' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=match',
      replace: true,
    })
    expect(shortcut({ altKey: true, code: 'Digit4' }, path)).toEqual({
      type: 'navigate',
      to: '/set/demo?mode=chat',
      replace: true,
    })
    expect(shortcut({ altKey: true, code: 'Digit1' }, '/study-guide/demo')).toBeNull()
  })
})
