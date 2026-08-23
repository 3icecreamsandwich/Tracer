import {
  submitClassroomAttempt,
  type ClassroomAttemptMode,
} from './classrooms'

const ACTIVE_PREFIX = 'tracer:classroom-attempt:'
const PENDING_KEY = 'tracer:pending-classroom-attempts'

export type PendingClassroomAttempt = {
  assignmentId: string
  clientAttemptId: string
  mode: ClassroomAttemptMode
  startedAt: string
  submittedAt: string
  scoreEarned: number
  scorePossible: number
  durationSeconds: number
}

type ActiveClassroomAttempt = Pick<PendingClassroomAttempt, 'assignmentId' | 'clientAttemptId' | 'mode' | 'startedAt'> & {
  setId: string
}

const memoryAttempts = new Map<string, ActiveClassroomAttempt>()

function storageAvailable(storage: 'localStorage' | 'sessionStorage'): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window[storage]
  } catch {
    return null
  }
}

function activeKey(assignmentId: string, mode: ClassroomAttemptMode) {
  return `${ACTIVE_PREFIX}${assignmentId}:${mode}`
}

function createUuid(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (value) => {
    const random = Math.floor(Math.random() * 16)
    return (value === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

function readPending(): PendingClassroomAttempt[] {
  const storage = storageAvailable('localStorage')
  if (!storage) return []
  try {
    const parsed = JSON.parse(storage.getItem(PENDING_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed as PendingClassroomAttempt[] : []
  } catch {
    return []
  }
}

function writePending(attempts: PendingClassroomAttempt[]): boolean {
  const storage = storageAvailable('localStorage')
  if (!storage) return false
  try {
    storage.setItem(PENDING_KEY, JSON.stringify(attempts))
    return true
  } catch {
    return false
  }
}

function readActive(key: string): ActiveClassroomAttempt | null {
  const inMemory = memoryAttempts.get(key)
  if (inMemory) return inMemory
  const storage = storageAvailable('sessionStorage')
  if (!storage) return null
  try {
    const parsed = JSON.parse(storage.getItem(key) ?? 'null')
    return parsed && typeof parsed === 'object' ? parsed as ActiveClassroomAttempt : null
  } catch {
    return null
  }
}

function writeActive(key: string, attempt: ActiveClassroomAttempt | null) {
  if (attempt) memoryAttempts.set(key, attempt)
  else memoryAttempts.delete(key)
  const storage = storageAvailable('sessionStorage')
  if (!storage) return
  if (attempt) storage.setItem(key, JSON.stringify(attempt))
  else storage.removeItem(key)
}

export function parseAssignedAssignmentId(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.trim()
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)
    ? normalized
    : null
}

export function beginAssignedAttempt(input: {
  assignmentId: string | null
  setId: string
  mode: ClassroomAttemptMode
}) {
  if (!input.assignmentId) return
  const key = activeKey(input.assignmentId, input.mode)
  writeActive(key, {
    assignmentId: input.assignmentId,
    clientAttemptId: createUuid(),
    mode: input.mode,
    setId: input.setId,
    startedAt: new Date().toISOString(),
  })
  void flushPendingAssignedAttempts()
}

export async function completeAssignedAttempt(input: {
  assignmentId: string | null
  setId: string
  mode: ClassroomAttemptMode
  scoreEarned: number
  scorePossible: number
}) {
  if (!input.assignmentId || input.scorePossible <= 0) return
  const key = activeKey(input.assignmentId, input.mode)
  const active = readActive(key)
  if (!active || active.setId !== input.setId) return
  writeActive(key, null)
  const submittedAt = new Date()
  const startedAt = new Date(active.startedAt)
  const attempt: PendingClassroomAttempt = {
    assignmentId: input.assignmentId,
    clientAttemptId: active.clientAttemptId,
    mode: input.mode,
    startedAt: active.startedAt,
    submittedAt: submittedAt.toISOString(),
    scoreEarned: Math.max(0, Math.min(input.scoreEarned, input.scorePossible)),
    scorePossible: input.scorePossible,
    durationSeconds: Math.max(0, Math.round((submittedAt.getTime() - startedAt.getTime()) / 1000)),
  }
  const pending = readPending()
  const queued = writePending([...pending.filter((item) => item.clientAttemptId !== attempt.clientAttemptId), attempt])
  if (queued) await flushPendingAssignedAttempts()
  else await submitClassroomAttempt(attempt)
}

let flushRequest: Promise<void> | null = null

export async function flushPendingAssignedAttempts(): Promise<void> {
  if (flushRequest) return flushRequest
  const request = (async () => {
    const pending = readPending()
    const succeeded = new Set<string>()
    for (const attempt of pending) {
      try {
        await submitClassroomAttempt(attempt)
        succeeded.add(attempt.clientAttemptId)
      } catch {
        // Keep the attempt queued for the next online retry.
      }
    }
    const current = readPending()
    writePending(current.filter((attempt) => !succeeded.has(attempt.clientAttemptId)))
  })().finally(() => {
    if (flushRequest === request) flushRequest = null
  })
  flushRequest = request
  return request
}
