import { useTracerDb } from './db'

export type StudySession = {
  id: string
  setId: string
  mode: 'practice' | 'test' | 'match' | 'flashcards'
  startedAt: string
  endedAt: string
  durationSeconds: number
  correct: number
  attempted: number
}

async function ready() {
  return useTracerDb()
}

export async function recordStudySession(input: Omit<StudySession, 'id' | 'endedAt' | 'durationSeconds'>) {
  const endedAt = new Date()
  const elapsed = endedAt.getTime() - new Date(input.startedAt).getTime()
  if (!Number.isFinite(elapsed) || elapsed < 1000) return
  const db = await ready()
  await db.execute(
    `INSERT INTO study_insight_sessions VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [crypto.randomUUID(), input.setId, input.mode, input.startedAt, endedAt.toISOString(),
      Math.min(4 * 3600, Math.round(elapsed / 1000)),
      Math.max(0, Math.min(input.correct, input.attempted)), Math.max(0, input.attempted)]
  )
}

export async function listStudySessions(): Promise<StudySession[]> {
  const db = await ready()
  const rows = await db.select<{
    id: string; set_id: string; mode: StudySession['mode']; started_at: string;
    ended_at: string; duration_seconds: number; correct_count: number; attempted_count: number
  }>(`SELECT * FROM study_insight_sessions ORDER BY ended_at DESC;`)
  return rows.map(row => ({ id: row.id, setId: row.set_id, mode: row.mode,
    startedAt: row.started_at, endedAt: row.ended_at, durationSeconds: row.duration_seconds,
    correct: row.correct_count, attempted: row.attempted_count }))
}
