import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const rolesSql = readFileSync(
  fileURLToPath(new URL('../../supabase/user_roles.sql', import.meta.url)),
  'utf8',
)
const classroomSql = readFileSync(
  fileURLToPath(new URL('../../supabase/teacher_classroom_rls.sql', import.meta.url)),
  'utf8',
)
const firstRunSource = readFileSync(
  fileURLToPath(new URL('../../pages/first-run.vue', import.meta.url)),
  'utf8',
)

describe('Supabase signup roles', () => {
  it('accepts only signup roles and never updates the first choice', () => {
    expect(rolesSql).toContain("if requested_role not in ('student', 'teacher')")
    expect(rolesSql).toContain('unique index if not exists user_roles_one_role_per_user_idx')
    expect(rolesSql).toContain('on conflict (user_id) do nothing')
    expect(rolesSql).not.toMatch(/grant update[^;]*user_roles/i)
  })

  it('keeps role initialization bound to the authenticated user', () => {
    expect(rolesSql).toContain('user_id = (select auth.uid())')
    expect(rolesSql).toContain('security invoker')
    expect(rolesSql).toContain('revoke all on function public.initialize_user_role(text) from public')
  })

  it('gates teacher classroom privileges on the global teacher role', () => {
    expect(classroomSql).toContain("private.has_user_role('teacher')")
    expect(classroomSql).toMatch(/tracer_classes_insert[\s\S]*private\.has_user_role\('teacher'\)/)
    expect(classroomSql).toMatch(/tracer_recipients_insert[\s\S]*private\.user_has_role\(student_id, 'student'\)/)
  })

  it('creates the cloud profile before its FK-bound role and saves the local profile last', () => {
    const cloudProfile = firstRunSource.indexOf('const prepared = await upsertAuthenticatedCloudProfile')
    const role = firstRunSource.indexOf('await initializeUserRole(pendingSignupRole.value)')
    const localProfile = firstRunSource.indexOf('await saveAuthenticatedLocalProfile')

    expect(cloudProfile).toBeGreaterThan(-1)
    expect(role).toBeGreaterThan(cloudProfile)
    expect(localProfile).toBeGreaterThan(role)
  })
})
