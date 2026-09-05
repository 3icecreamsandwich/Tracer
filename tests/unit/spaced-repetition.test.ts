import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getCardReviews, recordCardReview, reviewBucket } from '../../src/composables/cards/spaced-repetition'

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE
const NOW = Date.UTC(2026, 8, 4, 12)
const key = 'tracer:smart-review-cards:user-a:set-a'

beforeEach(() => {
  const values = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  })
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('Smart Review scheduling', () => {
  it('learns at 15 minutes, 45 minutes, and one day, then grows the review interval', () => {
    expect(reviewBucket(undefined)).toBe('learning')
    for (const [index, delay] of [15 * MINUTE, 45 * MINUTE, DAY].entries()) {
      const now = Date.now()
      const review = recordCardReview('set-a', 'term-a', true, 'user-a')
      expect(review.repetitions).toBe(index + 1)
      expect(review.nextReviewAt - now).toBeCloseTo(delay)
      expect(reviewBucket(review)).toBe(index === 2 ? 'strong' : 'learning')
      expect(getCardReviews('set-a', 'user-a')['term-a']).toEqual(review)
      vi.setSystemTime(review.nextReviewAt - 1)
      expect(reviewBucket(review)).not.toBe('due')
      vi.setSystemTime(review.nextReviewAt)
      expect(reviewBucket(review)).toBe('due')
    }
    const graduated = recordCardReview('set-a', 'term-a', true, 'user-a')
    expect(graduated.nextReviewAt - Date.now()).toBeGreaterThan(DAY)
    expect(graduated.lapses).toBe(0)
  })

  it('returns a missed strong card to learning and restarts its successful steps', () => {
    for (let i = 0; i < 3; i++) recordCardReview('set-a', 'term-a', true, 'user-a')
    const missed = recordCardReview('set-a', 'term-a', false, 'user-a')
    expect(missed.repetitions).toBe(0)
    expect(missed.lapses).toBe(1)
    expect(missed.nextReviewAt - Date.now()).toBeCloseTo(15 * MINUTE)
    expect(reviewBucket(missed)).toBe('learning')
    vi.setSystemTime(missed.nextReviewAt)
    const recovered = recordCardReview('set-a', 'term-a', true, 'user-a')
    expect(recovered.repetitions).toBe(1)
    expect(recovered.lapses).toBe(1)
    expect(recovered.nextReviewAt - Date.now()).toBeCloseTo(15 * MINUTE)
  })

  it('isolates review histories by user, set, and term', () => {
    const first = recordCardReview('set-a', 'term-a', true, 'user-a')
    recordCardReview('set-a', 'term-b', false, 'user-a')
    recordCardReview('set-b', 'term-a', false, 'user-a')
    recordCardReview('set-a', 'term-a', false, 'user-b')
    expect(getCardReviews('set-a', 'user-a')['term-a']).toEqual(first)
    expect(getCardReviews('set-a', 'user-a')['term-b'].lapses).toBe(1)
    expect(getCardReviews('set-a', 'user-b')['term-a'].repetitions).toBe(0)
    expect(getCardReviews('set-a')).toEqual({})
  })

  it('migrates legacy learning and graduated records and persists version 3', () => {
    localStorage.setItem(key, JSON.stringify({
      learning: { lastReviewedAt: NOW, streak: 1, misses: 2 },
      graduated: { lastReviewedAt: NOW, streak: 2, interval: 86400 },
    }))
    const reviews = getCardReviews('set-a', 'user-a')
    expect(reviews.learning).toMatchObject({ schedulerVersion: 3, nextReviewAt: NOW + 15 * MINUTE, lapses: 2 })
    expect(reviews.graduated).toMatchObject({ schedulerVersion: 3, repetitions: 3, nextReviewAt: NOW + DAY })
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(reviews)
  })

  it('recovers from broken JSON and rejects invalid timestamps', () => {
    localStorage.setItem(key, '{broken')
    expect(getCardReviews('set-a', 'user-a')).toEqual({})
    localStorage.setItem(key, JSON.stringify({ bad: { schedulerVersion: 3, nextReviewAt: 'invalid' } }))
    expect(getCardReviews('set-a', 'user-a')).toEqual({})
    expect(recordCardReview('set-a', 'term-a', true, 'user-a').repetitions).toBe(1)
  })

  it('keeps scheduling finite and bounded across repeated successes and misses', () => {
    for (let i = 0; i < 150; i++) {
      const review = recordCardReview('set-a', 'term-a', i % 17 !== 0, 'user-a')
      expect(Object.values(review).every(Number.isFinite)).toBe(true)
      expect(review.difficulty).toBeGreaterThanOrEqual(1)
      expect(review.difficulty).toBeLessThanOrEqual(10)
      expect(review.nextReviewAt).toBeGreaterThan(Date.now())
      expect(review.nextReviewAt - Date.now()).toBeLessThanOrEqual(36_500 * DAY)
      vi.setSystemTime(review.nextReviewAt)
    }
  })

  it('does not throw when browser storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem() { throw new Error('Storage unavailable') },
      setItem() { throw new Error('Storage unavailable') },
    })
    expect(getCardReviews('set-a', 'user-a')).toEqual({})
    expect(recordCardReview('set-a', 'term-a', true, 'user-a').repetitions).toBe(1)
  })
})
