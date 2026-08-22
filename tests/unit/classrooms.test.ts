import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import {
  ClassroomError,
  classroomErrorKey,
  mapAssignmentSettings,
  mapClassroomRow,
  normalizeClassCode,
  parseCachedAccountRole,
  summarizeClassProgress,
  summarizeStudentProgress,
} from '../../src/composables/classrooms'

const appDialogSource = readFileSync(
  fileURLToPath(new URL('../../components/AppDialog.vue', import.meta.url)),
  'utf8',
)
const detailedClassPageUrl = new URL('../../pages/teacher/classes/[id]/index.vue', import.meta.url)
const manageClassPageUrl = new URL('../../pages/teacher/classes/[id]/manage.vue', import.meta.url)
const dashboardPageUrl = new URL('../../pages/teacher/index.vue', import.meta.url)
const assignClassPageUrl = new URL('../../pages/teacher/classes/[id]/assign.vue', import.meta.url)
const studentClassPageUrl = new URL('../../pages/student/classes/[id].vue', import.meta.url)
const detailedClassPageSource = readFileSync(fileURLToPath(detailedClassPageUrl), 'utf8')
const manageClassPageSource = readFileSync(fileURLToPath(manageClassPageUrl), 'utf8')
const dashboardPageSource = readFileSync(fileURLToPath(dashboardPageUrl), 'utf8')
const classroomComposableSource = readFileSync(
  fileURLToPath(new URL('../../src/composables/classrooms.ts', import.meta.url)),
  'utf8',
)
const studyModeSources = ['flashcards', 'learn', 'match', 'test'].map((mode) => readFileSync(
  fileURLToPath(new URL(`../../pages/set/[id]-${mode}.vue`, import.meta.url)),
  'utf8',
))

const classroomSql = readFileSync(
  fileURLToPath(new URL('../../supabase/classroom_dashboard.sql', import.meta.url)),
  'utf8',
)
const classroomManagementSql = readFileSync(
  fileURLToPath(new URL('../../supabase/classroom_management.sql', import.meta.url)),
  'utf8',
)
const classroomAssignmentSql = readFileSync(
  fileURLToPath(new URL('../../supabase/classroom_assignments.sql', import.meta.url)),
  'utf8',
)
const classroomProgressSql = readFileSync(
  fileURLToPath(new URL('../../supabase/migrations/20260822023906_classroom_progress.sql', import.meta.url)),
  'utf8',
)

describe('classroom data mapping', () => {
  it('normalizes codes without accepting punctuation as part of the code', () => {
    expect(normalizeClassCode(' ab-cd 1234 ef ')).toBe('ABCD1234EF')
  })

  it('maps database and RPC field names to one classroom shape', () => {
    expect(mapClassroomRow({
      class_id: 'class-1',
      class_name: 'Calculus AB',
      subject: 'Math',
      section: null,
      school_year: '2026–2027',
      timezone: 'America/Los_Angeles',
      join_code: 'ABCDEF1234',
      created_at: '2026-08-17T00:00:00.000Z',
    })).toMatchObject({
      id: 'class-1',
      name: 'Calculus AB',
      schoolYear: '2026–2027',
      joinCode: 'ABCDEF1234',
    })
  })

  it('maps safe classroom errors to localized message keys', () => {
    expect(classroomErrorKey(new ClassroomError('not_found', 'database detail')))
      .toBe('classroom.errorCodeNotFound')
    expect(classroomErrorKey(new Error('unexpected'))).toBe('classroom.errorUnknown')
  })

  it('restores only an account-scoped cached teacher or student role', () => {
    expect(parseCachedAccountRole(JSON.stringify({ userId: 'user-1', role: 'teacher' }), 'user-1')).toBe('teacher')
    expect(parseCachedAccountRole(JSON.stringify({ userId: 'user-1', role: 'student' }), 'user-2')).toBeNull()
    expect(parseCachedAccountRole(JSON.stringify({ userId: 'user-1', role: 'admin' }), 'user-1')).toBeNull()
    expect(parseCachedAccountRole('not-json', 'user-1')).toBeNull()
  })

  it('normalizes assignment display metadata from untrusted JSON', () => {
    expect(mapAssignmentSettings({
      content_kind: 'study-guide',
      icon_key: 'book',
      icon_tone: 'orange',
      card_count: 4.9,
    })).toEqual({ kind: 'study-guide', iconKey: 'book', iconTone: 'orange', cardCount: 4 })
    expect(mapAssignmentSettings(null)).toEqual({ kind: 'set', iconKey: null, iconTone: null, cardCount: 0 })
  })

  it('summarizes latest assignment scores without counting missing attempts', () => {
    const rows = [
      { studentId: 'one', displayName: 'One', assignmentId: 'a', assignmentTitle: 'A', attemptId: 'x', mode: 'test' as const, scoreEarned: 8, scorePossible: 10, accuracyPercent: 80, submittedAt: '2026-08-20T10:00:00Z', durationSeconds: 60, attemptCount: 2, bestAccuracyPercent: 90 },
      { studentId: 'one', displayName: 'One', assignmentId: 'b', assignmentTitle: 'B', attemptId: 'y', mode: 'match' as const, scoreEarned: 6, scorePossible: 10, accuracyPercent: 60, submittedAt: '2026-08-21T10:00:00Z', durationSeconds: 30, attemptCount: 1, bestAccuracyPercent: 60 },
      { studentId: 'two', displayName: 'Two', assignmentId: 'a', assignmentTitle: 'A', attemptId: null, mode: null, scoreEarned: null, scorePossible: null, accuracyPercent: null, submittedAt: null, durationSeconds: null, attemptCount: 0, bestAccuracyPercent: null },
    ]
    expect(summarizeClassProgress(rows)).toEqual({ meanAccuracy: 70, medianAccuracy: 70, spread: 20, lowestAccuracy: 60, completedCount: 2, expectedCount: 3 })
    expect(summarizeStudentProgress(rows.slice(0, 2))).toMatchObject({ averageAccuracy: 70, bestAccuracy: 80, spread: 20, completedAssignments: 2, totalAssignments: 2, mostRecent: rows[1] })
  })
})

describe('shared app dialog', () => {
  it('captures Escape at the window so fullscreen handling cannot strand the dialog', () => {
    expect(appDialogSource).toContain("window.addEventListener('keydown', onWindowKeydown, true)")
    expect(appDialogSource).toMatch(/onWindowKeydown[\s\S]*event\.key !== 'Escape'[\s\S]*close\(\)/)
    expect(appDialogSource).not.toContain('stopPropagation')
  })
})

describe('teacher classroom routes', () => {
  it('keeps detailed roster and class management as distinct sibling pages', () => {
    expect(existsSync(fileURLToPath(detailedClassPageUrl))).toBe(true)
    expect(existsSync(fileURLToPath(manageClassPageUrl))).toBe(true)
    expect(existsSync(fileURLToPath(new URL('../../pages/teacher/classes/[id].vue', import.meta.url)))).toBe(false)
    expect(detailedClassPageSource).toContain("t('classroom.studentRoster')")
    expect(detailedClassPageSource).toContain("t('classroom.meanAccuracy')")
    expect(detailedClassPageSource).toContain('listClassroomProgress')
    expect(manageClassPageSource).toContain('@submit.prevent="saveClassInformation"')
    expect(manageClassPageSource).toContain('confirmStudentRemoval')
    expect(manageClassPageSource).toContain('listClassroomAssignments')
    expect(manageClassPageSource).toContain('removeClassroomAssignment')
    expect(manageClassPageSource).toContain('confirmAssignmentRemoval')
    expect(manageClassPageSource).toContain("t('classroom.assignedMaterials')")
    expect(manageClassPageSource).toContain("t('classroom.removeMaterialConfirmation'")
    expect(manageClassPageSource.indexOf('class-information-title')).toBeLessThan(
      manageClassPageSource.indexOf('manage-assignments-title'),
    )
    expect(manageClassPageSource.indexOf('manage-assignments-title')).toBeLessThan(
      manageClassPageSource.indexOf('manage-students-title'),
    )
    expect(manageClassPageSource).not.toContain("t('classroom.totalScore')")
  })

  it('keeps assignment picking and the student class library on distinct routes', () => {
    const assignSource = readFileSync(fileURLToPath(assignClassPageUrl), 'utf8')
    const studentSource = readFileSync(fileURLToPath(studentClassPageUrl), 'utf8')
    expect(existsSync(fileURLToPath(assignClassPageUrl))).toBe(true)
    expect(existsSync(fileURLToPath(studentClassPageUrl))).toBe(true)
    expect(assignSource).toContain('assignLocalItemToClass')
    expect(assignSource).toContain('listClassroomAssignments')
    expect(assignSource).toContain(':disabled="isAlreadyAssigned(item)"')
    expect(assignSource).toContain('end-24')
    expect(assignSource).toContain("t('classroom.alreadyAssigned')")
    expect(assignSource).toContain("'/create/basic'")
    expect(assignSource).not.toContain('classroom.dashboardDescription')
    expect(studentSource).toContain("t('classroom.recentSets')")
    expect(studentSource).toContain('listClassroomAssignments')
    expect(studentSource).toContain('prepareClassroomAssignmentForStudy')
  })

  it('records all four scored assigned modes while leaving Chat untracked', () => {
    for (const source of studyModeSources) {
      expect(source).toContain('completeAssignedAttempt')
      expect(source).toContain('assignedAssignmentId')
    }
    expect(readFileSync(fileURLToPath(studentClassPageUrl), 'utf8')).not.toContain("value: 'chat'")
  })

  it('loads teacher routes through the optimized concurrent classroom pipeline', () => {
    expect(dashboardPageSource).toContain('getClassroomOverview')
    expect(dashboardPageSource).not.toContain('listClassroomAssignments')
    expect(dashboardPageSource).not.toContain('listClassroomMembers')
    expect(detailedClassPageSource).not.toContain('getClassroom,')
    expect(manageClassPageSource).not.toContain('getClassroom,')
    expect(detailedClassPageSource).toMatch(/Promise\.all\([\s\S]*getAccountRole\(\)[\s\S]*listClassrooms\(\)[\s\S]*listClassroomMembers/)
    expect(manageClassPageSource).toMatch(/Promise\.all\([\s\S]*getAccountRole\(\)[\s\S]*listClassrooms\(\)[\s\S]*listClassroomMembers/)
  })

  it('uses single-request nested reads for roster and assignment details', () => {
    expect(classroomComposableSource).toContain('profile:profiles!class_memberships_user_id_fkey(display_name)')
    expect(classroomComposableSource).toContain('set_version:set_versions!assignments_set_version_id_fkey')
    expect(classroomComposableSource).toContain('set:sets!set_versions_set_id_fkey(title,description,local_source_id)')
  })
})

describe('classroom progress migration', () => {
  it('keeps class ownership normalized through assignments and adds the reporting index', () => {
    expect(classroomProgressSql).not.toMatch(/add column if not exists class_id/)
    expect(classroomProgressSql).toContain('attempts_assignment_student_submitted_idx')
    expect(classroomProgressSql).toMatch(/join public\.assignments as assignment[\s\S]*assignment\.class_id/)
  })

  it('submits idempotent student attempts behind a restricted validation RPC', () => {
    expect(classroomProgressSql).toMatch(/submit_tracer_assignment_attempt[\s\S]*security definer[\s\S]*set search_path = ''/)
    expect(classroomProgressSql).toContain('att.client_attempt_id = requested_client_attempt_id')
    expect(classroomProgressSql).toMatch(/assignment_recipients[\s\S]*ar\.student_id = current_user_id[\s\S]*ar\.status = 'assigned'/)
    expect(classroomProgressSql).toContain('from public, anon')
    expect(classroomProgressSql).toContain('to authenticated')
  })

  it('reports latest and best assignment scores only to a class teacher', () => {
    expect(classroomProgressSql).toMatch(/list_tracer_class_progress[\s\S]*security invoker/)
    expect(classroomProgressSql).toMatch(/teacher_membership\.role = 'teacher'[\s\S]*teacher_membership\.status = 'active'/)
    expect(classroomProgressSql).toMatch(/order by attempt\.submitted_at desc[\s\S]*limit 1/)
  })
})

describe('classroom Supabase migration', () => {
  it('generates unique codes and creates teacher membership atomically', () => {
    expect(classroomSql).toContain('classes_active_join_code_idx')
    expect(classroomSql).toContain('extensions.gen_random_bytes(5)')
    expect(classroomSql).toMatch(/insert into public\.class_memberships[\s\S]*'teacher'/)
  })

  it('keeps code-based joining behind a restricted authenticated RPC', () => {
    expect(classroomSql).toMatch(/join_tracer_class[\s\S]*security definer[\s\S]*set search_path = ''/)
    expect(classroomSql).toContain('revoke all on function public.join_tracer_class(text) from public, anon')
    expect(classroomSql).toContain('grant execute on function public.join_tracer_class(text) to authenticated')
    expect(classroomSql).toMatch(/ur\.user_id = current_user_id[\s\S]*ur\.role = 'student'/)
  })

  it('requires the teacher role for direct class inserts', () => {
    expect(classroomSql).toMatch(/create policy "tracer_classes_insert"[\s\S]*ur\.role in \('teacher', 'admin'\)/)
  })
})

describe('classroom management migration', () => {
  it('keeps destructive classroom operations RLS-enforced and authenticated-only', () => {
    expect(classroomManagementSql).toMatch(/remove_tracer_class_student[\s\S]*security invoker/)
    expect(classroomManagementSql).toMatch(/remove_tracer_class_assignment[\s\S]*security invoker/)
    expect(classroomManagementSql).toMatch(/delete_tracer_class[\s\S]*security invoker/)
    expect(classroomManagementSql).toContain('from public, anon')
    expect(classroomManagementSql).toContain('to authenticated')
    expect(classroomManagementSql).toMatch(/create policy "tracer_classes_delete"[\s\S]*ur\.role in \('teacher', 'admin'\)/)
  })

  it('cascades only class-scoped records and preserves reusable source sets', () => {
    expect(classroomManagementSql).toMatch(/attempts_assignment_id_fkey[\s\S]*on delete cascade/)
    expect(classroomManagementSql).toMatch(/delete from public\.assignments/)
    expect(classroomManagementSql).not.toMatch(/delete from public\.(sets|set_versions|set_assets)/)
  })

  it('removes assignment access before deleting a student membership', () => {
    const recipients = classroomManagementSql.indexOf('delete from public.assignment_recipients')
    const membership = classroomManagementSql.indexOf('delete from public.class_memberships')
    expect(recipients).toBeGreaterThan(-1)
    expect(membership).toBeGreaterThan(recipients)
  })
})

describe('classroom assignment migration', () => {
  it('uploads immutable versions and publishes recipient assignments atomically', () => {
    expect(classroomAssignmentSql).toMatch(/assign_tracer_class_item[\s\S]*security invoker/)
    expect(classroomAssignmentSql).toContain('sets_owner_local_source_idx')
    expect(classroomAssignmentSql).toContain('assignments_creator_request_idx')
    expect(classroomAssignmentSql).toMatch(/insert into public\.set_versions[\s\S]*insert into public\.assignments[\s\S]*insert into public\.assignment_recipients/)
    expect(classroomAssignmentSql).toMatch(/published_at[\s\S]*'published'/)
    expect(classroomAssignmentSql).toMatch(/assign_existing_class_materials[\s\S]*a\.status = 'published'/)
  })

  it('restricts assignment execution and asset paths to the authenticated teacher', () => {
    expect(classroomAssignmentSql).toContain('private.is_class_teacher(requested_class_id)')
    expect(classroomAssignmentSql).toContain("not like current_user_id::text || '/%'")
    expect(classroomAssignmentSql).toContain('from public, anon')
    expect(classroomAssignmentSql).toContain('to authenticated')
  })
})
