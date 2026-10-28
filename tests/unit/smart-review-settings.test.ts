import { beforeEach, describe, expect, it } from 'vitest'

import {
  recordCardReview, getCardReviews, reviewBucket,
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


describe('five-point scheduling', () => {
  it('assigns distinct, increasing first intervals and persists every grade', () => {
    const intervals = [1, 2, 3, 4, 5].map(value => {
      const rating = value as 1 | 2 | 3 | 4 | 5
      const review = recordCardReview('set', `card-${rating}`, rating, 'owner')
      expect(getCardReviews('set', 'owner')[`card-${rating}`]?.rating).toBe(rating)
      expect(reviewBucket(review)).toBe(rating <= 2 ? 'learning' : 'strong')
      return review.nextReviewAt - review.lastReviewAt
    })
    expect(intervals).toEqual([60_000, 600_000, 86_400_000, 259_200_000, 604_800_000])
    expect(getCardReviews('set', 'another-owner')).toEqual({})
  })
  it('grows successful intervals and resets a mastered card after a lapse', () => {
    const first = recordCardReview('set', 'card', 5)
    const next = recordCardReview('set', 'card', 5)
    expect(next.stability).toBeGreaterThan(first.stability)
    const missed = recordCardReview('set', 'card', 1)
    expect(missed.nextReviewAt - missed.lastReviewAt).toBe(60_000)
    expect(missed.repetitions).toBe(0)
    expect(missed.lapses).toBe(1)
    expect(missed.difficulty).toBeGreaterThan(next.difficulty)
  })
  it('reads earlier scheduler data without losing due dates', () => {
    localStorage.setItem('tracer:smart-review-cards:local-user:set', JSON.stringify({ old: {
      schedulerVersion: 3, lastReviewAt: 100, nextReviewAt: 200, difficulty: 5, stability: 1, repetitions: 3, lapses: 0,
    } }))
    expect(getCardReviews('set').old?.nextReviewAt).toBe(200)
  })
})
