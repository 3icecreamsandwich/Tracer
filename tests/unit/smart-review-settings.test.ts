import { beforeEach, describe, expect, it } from 'vitest'

import {
  applyGlobalSmartReviewEnabled,
  getSmartReviewOverride,
  resolveSmartReviewEnabled,
  saveSmartReviewEnabled,
} from '../../src/composables/cards/spaced-repetition'

class MemoryStorage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  setItem(key: string, value: string) { this.values.set(key, value) }
  removeItem(key: string) { this.values.delete(key) }
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: new MemoryStorage(),
  })
})

describe('global Smart Review changes', () => {
  it('supersedes every local override for the active user', () => {
    saveSmartReviewEnabled('set-a', false, 'user-a')
    saveSmartReviewEnabled('set-b', false, 'user-a')
    saveSmartReviewEnabled('other-user-set', false, 'user-b')

    applyGlobalSmartReviewEnabled(true, 'user-a')

    expect(getSmartReviewOverride('set-a', 'user-a')).toBeNull()
    expect(getSmartReviewOverride('set-b', 'user-a')).toBeNull()
    expect(resolveSmartReviewEnabled('set-a', true, 'user-a')).toBe(true)
    expect(resolveSmartReviewEnabled('set-b', true, 'user-a')).toBe(true)
    expect(getSmartReviewOverride('other-user-set', 'user-b')).toBe(false)
  })

  it('allows a new local override until the global toggle changes again', () => {
    applyGlobalSmartReviewEnabled(true, 'user-a')
    saveSmartReviewEnabled('set-a', false, 'user-a')
    expect(resolveSmartReviewEnabled('set-a', true, 'user-a')).toBe(false)

    applyGlobalSmartReviewEnabled(false, 'user-a')
    expect(getSmartReviewOverride('set-a', 'user-a')).toBeNull()
    expect(resolveSmartReviewEnabled('set-a', false, 'user-a')).toBe(false)
  })
})
