import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(
  new URL('../../supabase/migrations/20260912230224_preserve_publications_on_account_delete.sql', import.meta.url),
  'utf8',
)
const dialog = readFileSync(new URL('../../components/DeleteAccountDialog.vue', import.meta.url), 'utf8')

describe('account deletion', () => {
  it('preserves and anonymizes published sets before deleting only the authenticated user', () => {
    expect(migration).toMatch(/alter column publisher_id drop not null/)
    expect(migration).toMatch(/foreign key \(publisher_id\)[\s\S]*on delete set null/)
    expect(migration).toMatch(/current_user_id uuid := \(select auth\.uid\(\)\)/)
    expect(migration).toMatch(/set publisher_name = '<unknown>'[\s\S]*where publisher_id = current_user_id/)
    expect(migration).toMatch(/update storage\.objects[\s\S]*set owner_id = null[\s\S]*current_user_id::text/)
    expect(migration).toMatch(/delete from auth\.users[\s\S]*where id = current_user_id/)
    expect(migration).toMatch(/revoke all on function public\.delete_own_account\(text\) from public/)
    expect(migration).toMatch(/grant execute on function public\.delete_own_account\(text\) to authenticated/)
  })

  it('requires the destructive confirmation phrase in the dialog', () => {
    expect(dialog).toContain(`confirmation !== 'DELETE'`)
    expect(dialog).toContain(`autocomplete="off"`)
    expect(dialog).toContain(`role="alertdialog"`)
  })
})
