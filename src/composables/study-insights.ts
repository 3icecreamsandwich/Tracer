import { useTracerDb } from './db'
import { activeStudySecondsSince, syncStudyTime } from './study-streak'

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
type SessionRow = { id: string; set_id: string; mode: StudySession['mode']; started_at: string; ended_at: string; duration_seconds: number; correct_count: number; attempted_count: number }
function fromRow(row: SessionRow): StudySession {
  return { id: row.id, setId: row.set_id, mode: row.mode, startedAt: row.started_at, endedAt: row.ended_at, durationSeconds: row.duration_seconds, correct: row.correct_count, attempted: row.attempted_count }
}
function toRow(session: StudySession, userId: string) {
  return { user_id: userId, id: session.id, set_id: session.setId, mode: session.mode, started_at: session.startedAt, ended_at: session.endedAt, duration_seconds: session.durationSeconds, correct_count: session.correct, attempted_count: session.attempted }
}
async function syncSessions(local: StudySession[]): Promise<StudySession[]> {
  const { getSupabaseClient, isSupabaseConfigured } = await import('./auth/client')
  if (!isSupabaseConfigured()) return local
  const db = getSupabaseClient()
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (!data.session?.user) return local
  const userId = data.session.user.id
  const cutoff = new Date(Date.now() - 14 * 86400000).toISOString()
  const recent = local.filter(s => s.endedAt >= cutoff)
  if (recent.length) {
    const result = await db.from('study_sessions').upsert(recent.map(s => toRow(s, userId)), { onConflict: 'user_id,id' })
    if (result.error) throw result.error
  }
  const result = await db.from('study_sessions').select('id,set_id,mode,started_at,ended_at,duration_seconds,correct_count,attempted_count').eq('user_id', userId).gte('ended_at', cutoff)
  if (result.error) throw result.error
  const merged = new Map(local.map(session => [session.id, session]))
  const localDb = await useTracerDb()
  for (const row of (result.data ?? []) as SessionRow[]) {
    if (merged.has(row.id)) continue
    const session = fromRow(row)
    merged.set(row.id, session)
    await localDb.execute(`INSERT OR IGNORE INTO study_insight_sessions VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [row.id, row.set_id, row.mode, row.started_at, row.ended_at, row.duration_seconds, row.correct_count, row.attempted_count])
  }
  return [...merged.values()].sort((a, b) => b.endedAt.localeCompare(a.endedAt))
}
export async function recordStudySession(input: Omit<StudySession, 'id' | 'endedAt' | 'durationSeconds'>) {
  const endedAt = new Date()
  const elapsed = endedAt.getTime() - new Date(input.startedAt).getTime()
  if (!Number.isFinite(elapsed) || elapsed < 1000) return
  const session: StudySession = { ...input, id: crypto.randomUUID(), endedAt: endedAt.toISOString(), durationSeconds: Math.min(4 * 3600, activeStudySecondsSince(input.startedAt)), correct: Math.max(0, Math.min(input.correct, input.attempted)), attempted: Math.max(0, input.attempted) }
  void syncStudyTime()
  const db = await useTracerDb()
  const row = toRow(session, '')
  await db.execute(`INSERT INTO study_insight_sessions VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [row.id, row.set_id, row.mode, row.started_at, row.ended_at, row.duration_seconds, row.correct_count, row.attempted_count])
  void syncSessions([session]).catch(() => {})
}
export async function listStudySessions(): Promise<StudySession[]> {
  const db = await useTracerDb()
  const rows = await db.select<SessionRow>(`SELECT * FROM study_insight_sessions ORDER BY ended_at DESC;`)
  const local = rows.map(fromRow)
  try { return await syncSessions(local) } catch { return local }
}
