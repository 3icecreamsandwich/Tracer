import { beforeEach, describe, expect, it } from 'vitest'

import {
  beginAssignedAttempt,
  completeAssignedAttempt,
} from '../../src/composables/assignment-progress'

class MemoryStorage {
  private values = new Map<string, string>()
  getItem(key: string) { return this.values.get(key) ?? null }
  setItem(key: string, value: string) { this.values.set(key, value) }
  removeItem(key: string) { this.values.delete(key) }
}

const assignmentId = '12345678-1234-4123-8123-123456789abc'

beforeEach(() => {
  const windowStub = {
    localStorage: new MemoryStorage(),
    sessionStorage: new MemoryStorage(),
  }
  Object.defineProperty(globalThis, 'window', { configurable: true, value: windowStub })
})

function pendingAttempts() {
  return JSON.parse(window.localStorage.getItem('tracer:pending-classroom-attempts') ?? '[]')
}

describe('assigned attempt lifecycle', () => {
  it('keeps one attempt identity while a mode is restarted during the same visit', async () => {
    beginAssignedAttempt({ assignmentId, setId: 'set-1', mode: 'flashcards' })
    beginAssignedAttempt({ assignmentId, setId: 'set-1', mode: 'flashcards' })
    await completeAssignedAttempt({
      assignmentId,
      setId: 'set-1',
      mode: 'flashcards',
      scoreEarned: 1,
      scorePossible: 2,
    })

    expect(pendingAttempts()).toHaveLength(1)
    expect(pendingAttempts()).toContainEqual(expect.objectContaining({
      scoreEarned: 1,
      scorePossible: 2,
    }))
  })

  it('submits a zero-answer exit so reporting can show no accuracy', async () => {
    beginAssignedAttempt({ assignmentId, setId: 'set-2', mode: 'practice' })
    await completeAssignedAttempt({
      assignmentId,
      setId: 'set-2',
      mode: 'practice',
      scoreEarned: 0,
      scorePossible: 0,
    })

    expect(pendingAttempts()).toContainEqual(expect.objectContaining({
      scoreEarned: 0,
      scorePossible: 0,
      completed: true,
    }))
  })

  it('persists exact Match duration and excludes unfinished runs from the leaderboard', async () => {
    beginAssignedAttempt({ assignmentId, setId: 'set-3', mode: 'match' })
    await completeAssignedAttempt({
      assignmentId,
      setId: 'set-3',
      mode: 'match',
      scoreEarned: 8,
      scorePossible: 10,
      durationMs: 38_151,
      completed: false,
    })

    expect(pendingAttempts()).toContainEqual(expect.objectContaining({
      durationMs: 38_151,
      durationSeconds: 38,
      completed: false,
    }))
  })
})
