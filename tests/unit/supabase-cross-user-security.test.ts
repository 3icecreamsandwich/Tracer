import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(fileURLToPath(new URL('../../supabase/migrations/20260915233606_deny_direct_client_access_to_internal_tables.sql', import.meta.url)), 'utf8')
const crossUserTest = readFileSync(fileURLToPath(new URL('../../supabase/tests/cross_user_authorization.sql', import.meta.url)), 'utf8')

describe('Supabase cross-user guardrails', () => {
  it('explicitly denies direct client access to internal tables', () => {
    expect(migration).toContain('on public.feedback_submissions')
    expect(migration).toContain('on private.super_account')
    expect(migration.match(/as restrictive/g)?.length).toBe(2)
    expect(migration.match(/using \(false\)/g)?.length).toBe(2)
    expect(migration.match(/with check \(false\)/g)?.length).toBe(2)
  })

  it('keeps executable two-user read, update, delete, and spoofing checks', () => {
    expect(crossUserTest).toContain("set_config('test.user_a'")
    expect(crossUserTest).toContain("set_config('test.user_b'")
    expect(crossUserTest).toContain('Foreign private set was readable')
    expect(crossUserTest).toContain('Foreign set update was allowed')
    expect(crossUserTest).toContain('Foreign set delete was allowed')
    expect(crossUserTest).toContain('Foreign profile update was allowed')
    expect(crossUserTest).toContain('Foreign owner insert was allowed')
    expect(crossUserTest).toContain('rollback;')
  })
})
