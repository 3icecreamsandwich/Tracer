import { beforeEach, describe, expect, it, vi } from 'vitest'

const { submitClassroomAttempt } = vi.hoisted(() => ({
  submitClassroomAttempt: vi.fn(async () => undefined),
}))

vi.mock('../../src/composables/classrooms', () => ({
  submitClassroomAttempt,
}))

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
  submitClassroomAttempt.mockClear()
  const windowStub = {
    localStorage: new MemoryStorage(),
    sessionStorage: new MemoryStorage(),
  }
  Object.defineProperty(globalThis, 'window', { configurable: true, value: windowStub })
})

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

    expect(submitClassroomAttempt).toHaveBeenCalledTimes(1)
    expect(submitClassroomAttempt).toHaveBeenCalledWith(expect.objectContaining({
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

    expect(submitClassroomAttempt).toHaveBeenCalledWith(expect.objectContaining({
      scoreEarned: 0,
      scorePossible: 0,
    }))
  })
})
