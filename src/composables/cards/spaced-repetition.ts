import type { Uuid } from '../db/types'

export type ReviewBucket = 'learning' | 'strong' | 'due'

export type CardReview = {
  schedulerVersion: 3
  lastReviewAt: number
  nextReviewAt: number
  difficulty: number
  stability: number
  repetitions: number
  lapses: number
}

const DAY_MS = 86_400_000
const TARGET_RETENTION = 0.9
const scope = (userId?: Uuid | null) => userId || 'local-user'
const enabledKey = (setId: Uuid, userId?: Uuid | null) => `tracer:smart-review:${scope(userId)}:${setId}`
const reviewKey = (setId: Uuid, userId?: Uuid | null) => `tracer:smart-review-cards:${scope(userId)}:${setId}`
const shuffleKey = (setId: Uuid, userId?: Uuid | null) => `tracer:flashcard-shuffle:${scope(userId)}:${setId}`

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeReview(value: unknown): CardReview | null {
  if (!value || typeof value !== 'object') return null
  const card = value as Partial<CardReview> & { dueAt?: number; streak?: number; misses?: number; lastReviewedAt?: number; interval?: number }
  const lastReviewAt = Number(card.lastReviewAt ?? card.lastReviewedAt ?? 0)
  const savedNextReviewAt = Number(card.nextReviewAt ?? card.dueAt ?? Date.now())
  let repetitions = Math.max(0, Number(card.repetitions ?? card.streak ?? 0))
  if (card.schedulerVersion !== 3 && repetitions >= 2) repetitions = 3
  const nextReviewAt = card.schedulerVersion === 3
    ? savedNextReviewAt
    : lastReviewAt + (repetitions >= 3 ? DAY_MS : repetitions === 2 ? 45 * 60_000 : 15 * 60_000)
  if (!Number.isFinite(lastReviewAt) || !Number.isFinite(nextReviewAt)) return null
  return {
    schedulerVersion: 3,
    lastReviewAt,
    nextReviewAt,
    difficulty: clamp(Number(card.difficulty ?? 5), 1, 10),
    stability: Math.max(0.01, Number(card.stability ?? Math.max(0.01, Number(card.interval ?? 0) / 86_400))),
    repetitions,
    lapses: Math.max(0, Number(card.lapses ?? card.misses ?? 0)),
  }
}

function readReviews(setId: Uuid, userId?: Uuid | null): Record<Uuid, CardReview> {
  try {
    const raw = JSON.parse(localStorage.getItem(reviewKey(setId, userId)) || '{}')
    if (!raw || typeof raw !== 'object') return {}
    const normalized = Object.fromEntries(Object.entries(raw).flatMap(([id, value]) => {
      const card = normalizeReview(value)
      return card ? [[id, card]] : []
    }))
    localStorage.setItem(reviewKey(setId, userId), JSON.stringify(normalized))
    return normalized
  } catch { return {} }
}

export function isSmartReviewEnabled(setId: Uuid, userId?: Uuid | null) {
  try { return localStorage.getItem(enabledKey(setId, userId)) === 'true' } catch { return false }
}

export function saveSmartReviewEnabled(setId: Uuid, enabled: boolean, userId?: Uuid | null) {
  try { localStorage.setItem(enabledKey(setId, userId), String(enabled)) } catch {}
}

export function isFlashcardShuffleEnabled(setId: Uuid, userId?: Uuid | null) {
  try { return localStorage.getItem(shuffleKey(setId, userId)) === 'true' } catch { return false }
}

export function saveFlashcardShuffleEnabled(setId: Uuid, enabled: boolean, userId?: Uuid | null) {
  try { localStorage.setItem(shuffleKey(setId, userId), String(enabled)) } catch {}
}

export function getCardReviews(setId: Uuid, userId?: Uuid | null) {
  return readReviews(setId, userId)
}

// FSRS-style scheduling: update difficulty and memory stability from the
// estimated retrievability. Got It maps to Good; Missed maps to Again.
export function recordCardReview(setId: Uuid, termId: Uuid, correct: boolean, userId?: Uuid | null) {
  const reviews = readReviews(setId, userId)
  const now = Date.now()
  const current = reviews[termId] || { schedulerVersion: 3 as const, lastReviewAt: 0, nextReviewAt: now, difficulty: 5, stability: 0.4, repetitions: 0, lapses: 0 }
  const elapsedDays = current.lastReviewAt ? Math.max(0, (now - current.lastReviewAt) / DAY_MS) : 0
  const retrievability = Math.pow(1 + elapsedDays / (9 * Math.max(0.01, current.stability)), -1)
  const difficulty = correct
    ? clamp(current.difficulty - 0.15 * (1 - retrievability), 1, 10)
    : clamp(current.difficulty + 1.2, 1, 10)
  let stability: number
  let intervalDays: number
  if (!correct) {
    // Anki-style Again step: bring the card back in about ten minutes.
    stability = clamp(Math.min(current.stability * 0.2, 0.35) * Math.pow(difficulty, -0.15), 15 / 1_440, 1)
    intervalDays = 15 / 1_440
  } else if (current.repetitions === 0) {
    // First successful learning step.
    stability = 15 / 1_440
    intervalDays = 15 / 1_440
  } else if (current.repetitions === 1) {
    // Second successful learning step.
    stability = 45 / 1_440
    intervalDays = 45 / 1_440
  } else if (current.repetitions === 2) {
    // Third success graduates the card to Strong, due the next day.
    stability = 1
    intervalDays = 1
  } else {
    stability = clamp(current.stability * (1 + Math.exp(3.2) * Math.pow(11 - difficulty, 0.3) * Math.pow(Math.max(0.05, 1 - retrievability), 0.8) * 0.025), 0.04, 36_500)
    intervalDays = clamp(stability * (Math.pow(TARGET_RETENTION, -1) - 1) * 9, 10 / 1_440, 36_500)
  }
  const next: CardReview = {
    schedulerVersion: 3,
    lastReviewAt: now,
    nextReviewAt: now + intervalDays * DAY_MS,
    difficulty,
    stability,
    repetitions: correct ? current.repetitions + 1 : 0,
    lapses: current.lapses + (correct ? 0 : 1),
  }
  reviews[termId] = next
  try { localStorage.setItem(reviewKey(setId, userId), JSON.stringify(reviews)) } catch {}
  return next
}

export function reviewBucket(review: CardReview | undefined): ReviewBucket {
  if (!review) return 'learning'
  if (review.nextReviewAt <= Date.now()) return 'due'
  if (review.repetitions < 3) return 'learning'
  return 'strong'
}
