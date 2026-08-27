import type { PostgrestError, Session } from '@supabase/supabase-js'

import type { AccountRole } from './auth/account'
import { getSupabaseClient, isSupabaseConfigured } from './auth/client'
import { restoreAuthSession } from './auth/session'
import { createSetsRepo, createStudyGuidesRepo, useTracerDb } from './db'
import type { DbClient, FlashcardSet, StudyGuide, Term, TermImage, Uuid } from './db/types'
import { createAsyncRequestCache } from './request-cache'

const ROLE_CACHE_STORAGE_KEY = 'tracer:supabase-account-role'
const CLASSROOM_CACHE_TTL_MS = 15_000
const ROLE_CACHE_TTL_MS = 30_000
const classroomRequests = createAsyncRequestCache({ ttlMs: CLASSROOM_CACHE_TTL_MS })
let onlineSessionRequest: Promise<Session> | null = null

export type Classroom = {
  id: string
  name: string
  subject: string | null
  section: string | null
  schoolYear: string | null
  timezone: string
  joinCode: string | null
  createdAt: string
}

export type ClassroomMember = {
  userId: string
  displayName: string
  joinedAt: string | null
}

export type ClassroomAssignment = {
  id: string
  setVersionId: string
  localSetId: string | null
  title: string
  status: string
  setTitle: string
  description: string | null
  kind: 'set' | 'study-guide'
  iconKey: string | null
  iconTone: string | null
  cardCount: number
  createdAt: string
}

export type ClassroomAttemptMode = 'flashcards' | 'practice' | 'match' | 'test'

export type AssignedMatchLeaderboardEntry = {
  rank: number
  studentId: string
  displayName: string
  avatarPath: string | null
  durationMs: number
  submittedAt: string
}

export type ClassroomProgressRow = {
  studentId: string
  displayName: string
  assignmentId: string
  assignmentTitle: string
  attemptId: string | null
  mode: ClassroomAttemptMode | null
  scoreEarned: number | null
  scorePossible: number | null
  accuracyPercent: number | null
  submittedAt: string | null
  durationSeconds: number | null
  attemptCount: number
  bestAccuracyPercent: number | null
}

export type ClassProgressSummary = {
  meanAccuracy: number | null
  medianAccuracy: number | null
  spread: number | null
  lowestAccuracy: number | null
  completedCount: number
  expectedCount: number
}

export type StudentProgressSummary = {
  averageAccuracy: number | null
  bestAccuracy: number | null
  spread: number | null
  completedAssignments: number
  totalAssignments: number
  mostRecent: ClassroomProgressRow | null
}

export type AssignClassroomItemInput = {
  classId: string
  kind: 'set' | 'study-guide'
  set: FlashcardSet
  studyGuide?: StudyGuide | null
  assignmentTitle: string
  clientRequestId: string
}

export type AssignClassroomItemResult = {
  assignmentId: string
  setId: string
  setVersionId: string
  assignedAt: string
}

export type CreateClassroomInput = {
  name: string
  subject?: string
  section?: string
  schoolYear?: string
  timezone?: string
}

export type UpdateClassroomInput = {
  name: string
  subject?: string
  section?: string
  schoolYear?: string
  timezone?: string
}

type ClassroomRow = {
  id?: string
  class_id?: string
  name?: string
  class_name?: string
  subject: string | null
  section: string | null
  school_year: string | null
  timezone: string
  join_code?: string | null
  created_at: string
}

type AssignmentSettings = {
  content_kind?: unknown
  icon_key?: unknown
  icon_tone?: unknown
  card_count?: unknown
}

type MembershipWithProfileRow = {
  user_id: string
  joined_at: string | null
  profile: { display_name: string | null } | Array<{ display_name: string | null }> | null
}

type AssignmentWithSetRow = {
  id: string
  title: string
  status: string
  set_version_id: string
  settings: unknown
  created_at: string
  set_version: {
    set_id: string
    set: { title: string; description: string | null; local_source_id: string | null } | Array<{ title: string; description: string | null; local_source_id: string | null }> | null
  } | Array<{
    set_id: string
    set: { title: string; description: string | null; local_source_id: string | null } | Array<{ title: string; description: string | null; local_source_id: string | null }> | null
  }> | null
}

type SetVersionContentRow = { id: string; content: unknown }

type SnapshotImage = { filename?: unknown; mimeType?: unknown; objectPath?: unknown }
type SnapshotTerm = {
  id?: unknown
  front?: unknown
  back?: unknown
  frontImage?: unknown
  backImage?: unknown
}
type AssignmentSnapshot = {
  schemaVersion?: unknown
  title?: unknown
  description?: unknown
  iconKey?: unknown
  iconTone?: unknown
  terms?: unknown
  studyGuide?: unknown
}

export type AssignmentStudyGuideSnapshot = {
  markdown: string
}

type ProgressRpcRow = {
  student_id: string
  display_name: string | null
  assignment_id: string
  assignment_title: string
  attempt_id: string | null
  mode: string | null
  score_earned: number | string | null
  score_possible: number | string | null
  accuracy_percent: number | string | null
  submitted_at: string | null
  duration_seconds: number | null
  attempt_count: number | string | null
  best_accuracy_percent: number | string | null
}

type MatchLeaderboardRpcRow = {
  leaderboard_rank: number | string
  student_id: string
  display_name: string | null
  avatar_path: string | null
  duration_ms: number | string
  submitted_at: string
}

export type ClassroomErrorCode =
  | 'not_configured'
  | 'signed_out'
  | 'offline'
  | 'forbidden'
  | 'not_found'
  | 'invalid_input'
  | 'unknown'

export class ClassroomError extends Error {
  constructor(public readonly code: ClassroomErrorCode, message: string) {
    super(message)
    this.name = 'ClassroomError'
  }
}

function errorFromPostgrest(error: PostgrestError): ClassroomError {
  if (error.code === '42501') return new ClassroomError('forbidden', error.message)
  if (error.code === 'P0002' || error.code === 'PGRST116') {
    return new ClassroomError('not_found', error.message)
  }
  if (error.code === '22023' || error.code === '23514') {
    return new ClassroomError('invalid_input', error.message)
  }
  return new ClassroomError('unknown', error.message)
}

async function loadOnlineSession(): Promise<Session> {
  if (!isSupabaseConfigured()) {
    throw new ClassroomError('not_configured', 'Supabase is not configured')
  }

  const client = getSupabaseClient()
  const current = await client.auth.getSession()
  if (current.data.session) return current.data.session

  const restored = await restoreAuthSession()
  if (!restored) throw new ClassroomError('signed_out', 'Account session is unavailable')
  if (!restored.online) throw new ClassroomError('offline', 'Cloud account is offline')

  const refreshed = await client.auth.getSession()
  if (!refreshed.data.session) {
    throw new ClassroomError('signed_out', 'Account session is unavailable')
  }
  return refreshed.data.session
}

async function requireOnlineSession(): Promise<Session> {
  if (onlineSessionRequest) return onlineSessionRequest
  const request = loadOnlineSession().finally(() => {
    if (onlineSessionRequest === request) onlineSessionRequest = null
  })
  onlineSessionRequest = request
  return request
}

function userCacheKey(userId: string, resource: string): string {
  return `user:${userId}:${resource}`
}

function invalidateUserClassroomCache(userId: string, resources?: string[]) {
  if (!resources?.length) {
    classroomRequests.invalidate(userCacheKey(userId, ''))
    return
  }
  for (const resource of resources) classroomRequests.invalidate(userCacheKey(userId, resource))
}

function singleRelation<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value
}

export function normalizeClassCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function mapClassroomRow(row: ClassroomRow): Classroom {
  const id = row.id ?? row.class_id
  const name = row.name ?? row.class_name
  if (!id || !name) throw new ClassroomError('unknown', 'Class data was incomplete')
  return {
    id,
    name,
    subject: row.subject,
    section: row.section,
    schoolYear: row.school_year,
    timezone: row.timezone,
    joinCode: row.join_code ?? null,
    createdAt: row.created_at,
  }
}

export function mapAssignmentSettings(value: unknown): Pick<ClassroomAssignment, 'kind' | 'iconKey' | 'iconTone' | 'cardCount'> {
  const settings = value && typeof value === 'object' ? value as AssignmentSettings : {}
  return {
    kind: settings.content_kind === 'study-guide' ? 'study-guide' : 'set',
    iconKey: typeof settings.icon_key === 'string' ? settings.icon_key : null,
    iconTone: typeof settings.icon_tone === 'string' ? settings.icon_tone : null,
    cardCount: typeof settings.card_count === 'number' && Number.isFinite(settings.card_count)
      ? Math.max(0, Math.floor(settings.card_count))
      : 0,
  }
}

export function parseAssignmentStudyGuideSnapshot(
  kind: ClassroomAssignment['kind'],
  snapshot: { studyGuide?: unknown },
): AssignmentStudyGuideSnapshot | null {
  if (kind !== 'study-guide') return null
  const guide = snapshot.studyGuide && typeof snapshot.studyGuide === 'object'
    ? snapshot.studyGuide as { markdown?: unknown }
    : null
  if (!guide || typeof guide.markdown !== 'string') {
    throw new ClassroomError('invalid_input', 'The assigned study guide snapshot was invalid')
  }
  return { markdown: guide.markdown }
}

export function classroomAssignmentMaterialPath(
  kind: ClassroomAssignment['kind'],
  localSetId: string,
): string {
  return kind === 'study-guide'
    ? `/study-guide/${localSetId}`
    : `/set/${localSetId}`
}

export async function restoreAssignmentStudyGuide(
  db: DbClient,
  localSetId: Uuid,
  guide: AssignmentStudyGuideSnapshot,
): Promise<void> {
  const repo = createStudyGuidesRepo(db)
  const existing = await repo.getBySetId(localSetId)
  if (existing) {
    await repo.update({ id: existing.id, markdown: guide.markdown })
    return
  }
  await repo.create({ id: localSetId, setId: localSetId, markdown: guide.markdown })
}

export function parseCachedAccountRole(value: string | null, userId: string | null | undefined): AccountRole | null {
  if (!value || !userId) return null
  try {
    const cached = JSON.parse(value) as { userId?: unknown; role?: unknown }
    if (cached.userId !== userId) return null
    return cached.role === 'teacher' || cached.role === 'student' ? cached.role : null
  } catch {
    return null
  }
}

export function getCachedAccountRole(userId: string | null | undefined): AccountRole | null {
  if (typeof window === 'undefined') return null
  return parseCachedAccountRole(window.localStorage.getItem(ROLE_CACHE_STORAGE_KEY), userId)
}

function cacheAccountRole(userId: string, role: AccountRole | null) {
  if (typeof window === 'undefined') return
  if (role) {
    window.localStorage.setItem(ROLE_CACHE_STORAGE_KEY, JSON.stringify({ userId, role }))
    return
  }
  const existing = parseCachedAccountRole(window.localStorage.getItem(ROLE_CACHE_STORAGE_KEY), userId)
  if (existing) window.localStorage.removeItem(ROLE_CACHE_STORAGE_KEY)
}

export async function getAccountRole(): Promise<AccountRole | null> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, 'role'), async () => {
    const { data, error } = await getSupabaseClient()
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle()
    if (error) throw errorFromPostgrest(error)
    const role = data?.role === 'teacher' || data?.role === 'student' ? data.role : null
    cacheAccountRole(session.user.id, role)
    return role
  }, ROLE_CACHE_TTL_MS)
}

export async function listClassrooms(): Promise<Classroom[]> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, 'classes'), async () => {
    const { data, error } = await getSupabaseClient()
      .from('classes')
      .select('id,name,subject,section,school_year,timezone,join_code,created_at')
      .is('archived_at', null)
      .order('created_at', { ascending: false })
    if (error) throw errorFromPostgrest(error)
    return (data ?? []).map((row) => mapClassroomRow(row as ClassroomRow))
  })
}

export async function getClassroom(classId: string): Promise<Classroom> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, `class:${classId}`), async () => {
    const { data, error } = await getSupabaseClient()
      .from('classes')
      .select('id,name,subject,section,school_year,timezone,join_code,created_at')
      .eq('id', classId)
      .is('archived_at', null)
      .single()
    if (error) throw errorFromPostgrest(error)
    return mapClassroomRow(data as ClassroomRow)
  })
}

export async function createClassroom(input: CreateClassroomInput): Promise<Classroom> {
  const session = await requireOnlineSession()
  const { data, error } = await getSupabaseClient().rpc('create_tracer_class', {
    requested_name: input.name.trim(),
    requested_subject: input.subject?.trim() || null,
    requested_section: input.section?.trim() || null,
    requested_school_year: input.schoolYear?.trim() || null,
    requested_timezone: input.timezone?.trim() || 'UTC',
  })
  if (error) throw errorFromPostgrest(error)
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new ClassroomError('unknown', 'Class was not returned')
  invalidateUserClassroomCache(session.user.id, ['classes'])
  return mapClassroomRow(row as ClassroomRow)
}

export async function updateClassroom(classId: string, input: UpdateClassroomInput): Promise<Classroom> {
  const session = await requireOnlineSession()
  const name = input.name.trim()
  if (!name) throw new ClassroomError('invalid_input', 'Class name is required')
  const { data, error } = await getSupabaseClient()
    .from('classes')
    .update({
      name,
      subject: input.subject?.trim() || null,
      section: input.section?.trim() || null,
      school_year: input.schoolYear?.trim() || null,
      timezone: input.timezone?.trim() || 'UTC',
      updated_at: new Date().toISOString(),
    })
    .eq('id', classId)
    .select('id,name,subject,section,school_year,timezone,join_code,created_at')
    .single()
  if (error) throw errorFromPostgrest(error)
  const classroom = mapClassroomRow(data as ClassroomRow)
  invalidateUserClassroomCache(session.user.id, ['classes', `class:${classId}`])
  return classroom
}

export async function joinClassroom(code: string): Promise<Classroom> {
  const session = await requireOnlineSession()
  const { data, error } = await getSupabaseClient().rpc('join_tracer_class', {
    requested_code: normalizeClassCode(code),
  })
  if (error) throw errorFromPostgrest(error)
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new ClassroomError('not_found', 'Class code was not found')
  invalidateUserClassroomCache(session.user.id, ['classes'])
  return mapClassroomRow(row as ClassroomRow)
}

export async function listClassroomMembers(classId: string): Promise<ClassroomMember[]> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, `members:${classId}`), async () => {
    const { data, error } = await getSupabaseClient()
      .from('class_memberships')
      .select('user_id,joined_at,profile:profiles!class_memberships_user_id_fkey(display_name)')
      .eq('class_id', classId)
      .eq('role', 'student')
      .eq('status', 'active')
      .order('joined_at', { ascending: true })
    if (error) throw errorFromPostgrest(error)

    return (data ?? []).map((rawMembership) => {
      const membership = rawMembership as unknown as MembershipWithProfileRow
      const profile = singleRelation(membership.profile)
      return {
        userId: membership.user_id,
        displayName: profile?.display_name || 'Student',
        joinedAt: membership.joined_at,
      }
    })
  })
}

export async function listClassroomAssignments(classId: string): Promise<ClassroomAssignment[]> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, `assignments:${classId}`), async () => {
    const { data, error } = await getSupabaseClient()
      .from('assignments')
      .select(`
        id,title,status,set_version_id,settings,created_at,
        set_version:set_versions!assignments_set_version_id_fkey(
          set_id,
          set:sets!set_versions_set_id_fkey(title,description,local_source_id)
        )
      `)
      .eq('class_id', classId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    if (error) throw errorFromPostgrest(error)

    return (data ?? []).map((rawAssignment) => {
      const assignment = rawAssignment as unknown as AssignmentWithSetRow
      const version = singleRelation(assignment.set_version)
      const set = singleRelation(version?.set ?? null)
      return {
        id: assignment.id,
        setVersionId: assignment.set_version_id,
        localSetId: set?.local_source_id ?? null,
        title: assignment.title,
        status: assignment.status,
        setTitle: set?.title || assignment.title,
        description: set?.description ?? null,
        ...mapAssignmentSettings(assignment.settings),
        createdAt: assignment.created_at,
      }
    })
  })
}

function optionalNumber(value: number | string | null): number | null {
  if (value === null) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function mapProgressRow(row: ProgressRpcRow): ClassroomProgressRow {
  const mode = row.mode === 'flashcards' || row.mode === 'practice' || row.mode === 'match' || row.mode === 'test'
    ? row.mode
    : null
  return {
    studentId: row.student_id,
    displayName: row.display_name || 'Student',
    assignmentId: row.assignment_id,
    assignmentTitle: row.assignment_title,
    attemptId: row.attempt_id,
    mode,
    scoreEarned: optionalNumber(row.score_earned),
    scorePossible: optionalNumber(row.score_possible),
    accuracyPercent: optionalNumber(row.accuracy_percent),
    submittedAt: row.submitted_at,
    durationSeconds: row.duration_seconds,
    attemptCount: optionalNumber(row.attempt_count) ?? 0,
    bestAccuracyPercent: optionalNumber(row.best_accuracy_percent),
  }
}

export async function listClassroomProgress(classId: string): Promise<ClassroomProgressRow[]> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, `progress:${classId}`), async () => {
    const { data, error } = await getSupabaseClient().rpc('list_tracer_class_progress', {
      requested_class_id: classId,
    })
    if (error) throw errorFromPostgrest(error)
    return (data ?? []).map((row) => mapProgressRow(row as ProgressRpcRow))
  })
}

export async function submitClassroomAttempt(input: {
  assignmentId: string
  clientAttemptId: string
  mode: ClassroomAttemptMode
  startedAt: string
  submittedAt: string
  scoreEarned: number
  scorePossible: number
  durationSeconds: number
  durationMs: number
  completed: boolean
}): Promise<void> {
  const session = await requireOnlineSession()
  const { error } = await getSupabaseClient().rpc('submit_tracer_assignment_attempt', {
    requested_assignment_id: input.assignmentId,
    requested_client_attempt_id: input.clientAttemptId,
    requested_mode: input.mode,
    requested_started_at: input.startedAt,
    requested_submitted_at: input.submittedAt,
    requested_score_earned: input.scoreEarned,
    requested_score_possible: input.scorePossible,
    requested_duration_seconds: input.durationSeconds,
    requested_duration_ms: input.durationMs,
    requested_completed: input.completed,
  })
  if (error) throw errorFromPostgrest(error)
  invalidateUserClassroomCache(session.user.id, ['progress:'])
}

export async function listAssignedMatchLeaderboard(
  assignmentId: string,
): Promise<AssignedMatchLeaderboardEntry[]> {
  await requireOnlineSession()
  const { data, error } = await getSupabaseClient().rpc(
    'list_tracer_assignment_match_leaderboard',
    { requested_assignment_id: assignmentId },
  )
  if (error) throw errorFromPostgrest(error)
  return (data ?? []).map((raw) => {
    const row = raw as MatchLeaderboardRpcRow
    return {
      rank: Number(row.leaderboard_rank),
      studentId: row.student_id,
      displayName: row.display_name?.trim() || 'Student',
      avatarPath: row.avatar_path,
      durationMs: Number(row.duration_ms),
      submittedAt: row.submitted_at,
    }
  })
}

function sortedScores(rows: ClassroomProgressRow[]): number[] {
  return rows
    .map((row) => row.accuracyPercent)
    .filter((score): score is number => score !== null && Number.isFinite(score))
    .sort((left, right) => left - right)
}

export function summarizeClassProgress(rows: ClassroomProgressRow[]): ClassProgressSummary {
  const scores = sortedScores(rows)
  if (!scores.length) {
    return { meanAccuracy: null, medianAccuracy: null, spread: null, lowestAccuracy: null, completedCount: 0, expectedCount: rows.length }
  }
  const middle = Math.floor(scores.length / 2)
  const median = scores.length % 2
    ? scores[middle]!
    : (scores[middle - 1]! + scores[middle]!) / 2
  return {
    meanAccuracy: scores.reduce((sum, value) => sum + value, 0) / scores.length,
    medianAccuracy: median,
    spread: scores[scores.length - 1]! - scores[0]!,
    lowestAccuracy: scores[0]!,
    completedCount: scores.length,
    expectedCount: rows.length,
  }
}

export function summarizeStudentProgress(rows: ClassroomProgressRow[]): StudentProgressSummary {
  const scores = sortedScores(rows)
  const completedRows = rows.filter((row) => row.accuracyPercent !== null)
  const mostRecent = completedRows.reduce<ClassroomProgressRow | null>((latest, row) => {
    if (!row.submittedAt) return latest
    return !latest?.submittedAt || row.submittedAt > latest.submittedAt ? row : latest
  }, null)
  return {
    averageAccuracy: scores.length ? scores.reduce((sum, value) => sum + value, 0) / scores.length : null,
    bestAccuracy: scores.length ? Math.max(...scores) : null,
    spread: scores.length ? Math.max(...scores) - Math.min(...scores) : null,
    completedAssignments: completedRows.length,
    totalAssignments: rows.length,
    mostRecent,
  }
}

function parseSnapshotImage(value: unknown): SnapshotImage | null {
  if (!value || typeof value !== 'object') return null
  return value as SnapshotImage
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new ClassroomError('unknown', 'An assigned image could not be read'))
    reader.onload = () => typeof reader.result === 'string'
      ? resolve(reader.result)
      : reject(new ClassroomError('unknown', 'An assigned image could not be read'))
    reader.readAsDataURL(blob)
  })
}

async function downloadSnapshotImage(value: unknown): Promise<TermImage | null> {
  const image = parseSnapshotImage(value)
  if (!image || typeof image.objectPath !== 'string') return null
  const { data, error } = await getSupabaseClient().storage.from('set-assets').download(image.objectPath)
  if (error) throw new ClassroomError('unknown', error.message)
  return {
    filename: typeof image.filename === 'string' ? image.filename : 'image',
    mimeType: typeof image.mimeType === 'string' ? image.mimeType : data.type || 'application/octet-stream',
    dataUrl: await blobToDataUrl(data),
  }
}

export async function prepareClassroomAssignmentForStudy(assignment: ClassroomAssignment): Promise<string> {
  await requireOnlineSession()
  const { data, error } = await getSupabaseClient()
    .from('set_versions')
    .select('id,content')
    .eq('id', assignment.setVersionId)
    .single()
  if (error) throw errorFromPostgrest(error)
  const row = data as SetVersionContentRow
  const snapshot = row.content && typeof row.content === 'object' ? row.content as AssignmentSnapshot : null
  if (!snapshot || snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.terms)) {
    throw new ClassroomError('invalid_input', 'The assigned set snapshot was invalid')
  }
  const studyGuide = parseAssignmentStudyGuideSnapshot(assignment.kind, snapshot)

  const terms: Term[] = await Promise.all(snapshot.terms.map(async (raw, index) => {
    const term = raw && typeof raw === 'object' ? raw as SnapshotTerm : {}
    if (typeof term.front !== 'string' || typeof term.back !== 'string') {
      throw new ClassroomError('invalid_input', 'An assigned card was invalid')
    }
    return {
      id: typeof term.id === 'string' ? term.id : `${row.id}-${index}`,
      front: term.front,
      back: term.back,
      frontImage: await downloadSnapshotImage(term.frontImage),
      backImage: await downloadSnapshotImage(term.backImage),
    }
  }))

  const db = await useTracerDb()
  const setsRepo = createSetsRepo(db)
  const localSet = {
    id: row.id,
    title: typeof snapshot.title === 'string' ? snapshot.title : assignment.setTitle,
    description: typeof snapshot.description === 'string' ? snapshot.description : assignment.description,
    iconKey: typeof snapshot.iconKey === 'string' ? snapshot.iconKey : assignment.iconKey,
    iconTone: typeof snapshot.iconTone === 'string' ? snapshot.iconTone : assignment.iconTone,
    terms,
  }
  const existing = await setsRepo.get(row.id)
  if (existing) await setsRepo.update(localSet)
  else await setsRepo.create(localSet)
  if (studyGuide) await restoreAssignmentStudyGuide(db, row.id, studyGuide)
  await Promise.all([
    db.execute('DELETE FROM flashcard_progress WHERE set_id = ?', [row.id]),
    db.execute('DELETE FROM practice_progress WHERE set_id = ?', [row.id]),
  ])
  return row.id
}

export async function getClassroomOverview(classId: string): Promise<{ memberCount: number; assignmentCount: number }> {
  const session = await requireOnlineSession()
  return classroomRequests.get(userCacheKey(session.user.id, `overview:${classId}`), async () => {
    const client = getSupabaseClient()
    const [members, assignments] = await Promise.all([
      client
        .from('class_memberships')
        .select('user_id', { count: 'exact', head: true })
        .eq('class_id', classId)
        .eq('role', 'student')
        .eq('status', 'active'),
      client
        .from('assignments')
        .select('id', { count: 'exact', head: true })
        .eq('class_id', classId)
        .eq('status', 'published'),
    ])
    if (members.error) throw errorFromPostgrest(members.error)
    if (assignments.error) throw errorFromPostgrest(assignments.error)
    return {
      memberCount: members.count ?? 0,
      assignmentCount: assignments.count ?? 0,
    }
  })
}

function safePathSegment(value: string): string {
  const normalized = value.replace(/[^A-Za-z0-9_-]/g, '-')
  return normalized || 'item'
}

function imageExtension(image: TermImage): string {
  const byMime: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/avif': 'avif',
  }
  return byMime[image.mimeType.toLowerCase()] ?? 'bin'
}

async function imageBlob(image: TermImage): Promise<Blob> {
  if (!image.dataUrl.startsWith('data:')) {
    throw new ClassroomError('invalid_input', 'A card image was invalid')
  }
  const response = await fetch(image.dataUrl)
  if (!response.ok) throw new ClassroomError('invalid_input', 'A card image could not be read')
  return response.blob()
}

export async function assignLocalItemToClass(input: AssignClassroomItemInput): Promise<AssignClassroomItemResult> {
  const session = await requireOnlineSession()
  if (input.kind === 'study-guide' && !input.studyGuide) {
    throw new ClassroomError('invalid_input', 'Study guide content is required')
  }

  const client = getSupabaseClient()
  const uploadedPaths: string[] = []
  const assetRows: Array<{ object_path: string }> = []
  let rpcStarted = false

  try {
    const terms = []
    for (const term of input.set.terms) {
      const serialized = {
        id: term.id,
        front: term.front,
        back: term.back,
        frontImage: null as null | { filename: string; mimeType: string; objectPath: string },
        backImage: null as null | { filename: string; mimeType: string; objectPath: string },
      }

      for (const side of ['front', 'back'] as const) {
        const image = side === 'front' ? term.frontImage : term.backImage
        if (!image) continue
        const objectPath = [
          session.user.id,
          safePathSegment(input.set.id),
          safePathSegment(input.clientRequestId),
          `${safePathSegment(term.id)}-${side}.${imageExtension(image)}`,
        ].join('/')
        const blob = await imageBlob(image)
        const { error } = await client.storage.from('set-assets').upload(objectPath, blob, {
          contentType: image.mimeType,
          upsert: true,
        })
        if (error) throw new ClassroomError('unknown', error.message)
        uploadedPaths.push(objectPath)
        assetRows.push({ object_path: objectPath })
        serialized[`${side}Image`] = {
          filename: image.filename,
          mimeType: image.mimeType,
          objectPath,
        }
      }
      terms.push(serialized)
    }

    const content = {
      schemaVersion: 1,
      kind: input.kind,
      localSetId: input.set.id,
      title: input.set.title,
      description: input.set.description,
      iconKey: input.set.iconKey ?? null,
      iconTone: input.set.iconTone ?? null,
      terms,
      studyGuide: input.studyGuide
        ? {
            id: input.studyGuide.id,
            markdown: input.studyGuide.markdown,
          }
        : null,
    }

    rpcStarted = true
    const { data, error } = await client.rpc('assign_tracer_class_item', {
      requested_class_id: input.classId,
      requested_local_set_id: input.set.id,
      requested_client_request_id: input.clientRequestId,
      requested_kind: input.kind,
      requested_set_title: input.set.title,
      requested_assignment_title: input.assignmentTitle,
      requested_description: input.set.description,
      requested_content: content,
      requested_assets: assetRows,
    })
    if (error) throw errorFromPostgrest(error)
    const row = Array.isArray(data) ? data[0] : data
    if (!row) throw new ClassroomError('unknown', 'Assignment was not returned')
    invalidateUserClassroomCache(session.user.id, [
      `assignments:${input.classId}`,
      `overview:${input.classId}`,
    ])
    return {
      assignmentId: row.assignment_id,
      setId: row.set_id,
      setVersionId: row.set_version_id,
      assignedAt: row.assigned_at,
    }
  } catch (error) {
    // Upload failures happen before the database transaction. Those objects are
    // safe to remove. Once the RPC starts, deterministic paths plus the request
    // id make a retry safe even if the response was lost.
    if (!rpcStarted && uploadedPaths.length) {
      await client.storage.from('set-assets').remove(uploadedPaths)
    }
    throw error
  }
}

export async function removeClassroomStudent(classId: string, studentId: string): Promise<void> {
  const session = await requireOnlineSession()
  const { error } = await getSupabaseClient().rpc('remove_tracer_class_student', {
    requested_class_id: classId,
    requested_student_id: studentId,
  })
  if (error) throw errorFromPostgrest(error)
  invalidateUserClassroomCache(session.user.id, [`members:${classId}`, `overview:${classId}`])
}

export async function removeClassroomAssignment(assignmentId: string): Promise<void> {
  const session = await requireOnlineSession()
  const { error } = await getSupabaseClient().rpc('remove_tracer_class_assignment', {
    requested_assignment_id: assignmentId,
  })
  if (error) throw errorFromPostgrest(error)
  invalidateUserClassroomCache(session.user.id, ['assignments:', 'overview:'])
}

export async function deleteClassroom(classId: string): Promise<void> {
  const session = await requireOnlineSession()
  const { error } = await getSupabaseClient().rpc('delete_tracer_class', {
    requested_class_id: classId,
  })
  if (error) throw errorFromPostgrest(error)
  invalidateUserClassroomCache(session.user.id)
}

export function classroomErrorKey(error: unknown): string {
  if (!(error instanceof ClassroomError)) return 'classroom.errorUnknown'
  if (error.code === 'offline') return 'classroom.errorOffline'
  if (error.code === 'signed_out') return 'classroom.errorSignedOut'
  if (error.code === 'forbidden') return 'classroom.errorForbidden'
  if (error.code === 'not_found') return 'classroom.errorCodeNotFound'
  if (error.code === 'invalid_input') return 'classroom.errorInvalidInput'
  if (error.code === 'not_configured') return 'auth.notConfigured'
  return 'classroom.errorUnknown'
}
