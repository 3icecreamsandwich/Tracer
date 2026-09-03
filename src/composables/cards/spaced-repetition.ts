import type { Uuid } from '../db/types'

export type ReviewBucket = 'learning' | 'strong' | 'due'

export type CardReview = {
  interval: number
  dueAt: number
  streak: number
  misses: number
  lastReviewedAt: number
}

const enabledKey = (setId: Uuid) => `tracer:smart-review:${setId}`
const reviewKey = (setId: Uuid) => `tracer:smart-review-cards:${setId}`

function readReviews(setId: Uuid): Record<Uuid, CardReview> {
  try {
    const value = JSON.parse(localStorage.getItem(reviewKey(setId)) || '{}')
    return value && typeof value === 'object' ? value : {}
  } catch { return {} }
}

export function isSmartReviewEnabled(setId: Uuid) {
  try { return localStorage.getItem(enabledKey(setId)) === 'true' } catch { return false }
}

export function saveSmartReviewEnabled(setId: Uuid, enabled: boolean) {
  try { localStorage.setItem(enabledKey(setId), String(enabled)) } catch {}
}

export function getCardReviews(setId: Uuid) { return readReviews(setId) }

export function recordCardReview(setId: Uuid, termId: Uuid, correct: boolean) {
  const reviews = readReviews(setId)
  const current = reviews[termId] || { interval: 0, dueAt: Date.now(), streak: 0, misses: 0, lastReviewedAt: 0 }
  const interval = correct
    ? Math.min(60 * 60 * 24 * 365, Math.max(60 * 10, current.interval ? current.interval * 2 : 60 * 60))
    : 60 * 10
  reviews[termId] = {
    interval,
    dueAt: Date.now() + interval * 1000,
    streak: correct ? current.streak + 1 : 0,
    misses: correct ? current.misses : current.misses + 1,
    lastReviewedAt: Date.now(),
  }
  try { localStorage.setItem(reviewKey(setId), JSON.stringify(reviews)) } catch {}
  return reviews[termId]
}

export function reviewBucket(review: CardReview | undefined): ReviewBucket {
  if (!review || review.streak < 2) return 'learning'
  if (review.dueAt <= Date.now()) return 'due'
  return 'strong'
}
