import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const sql = readFileSync(
  fileURLToPath(new URL('../../supabase/migrations/20260829003004_user_api_key_vault.sql', import.meta.url)),
  'utf8',
)

describe('Supabase user API key vault migration', () => {
  it('stores only Vault references in an RLS-protected user mapping', () => {
    const tableDefinition = sql.slice(
      sql.indexOf('create table if not exists public.user_api_key_secrets'),
      sql.indexOf('alter table public.user_api_key_secrets enable row level security'),
    )
    expect(sql).toContain('create table if not exists public.user_api_key_secrets')
    expect(sql).toContain('secret_id uuid not null unique')
    expect(sql).toContain('enable row level security')
    expect(sql).toMatch(/for select to authenticated[\s\S]*auth\.uid\(\)\) = user_id/)
    expect(sql).toContain('revoke all on table public.user_api_key_secrets from public, anon, authenticated')
    expect(tableDefinition).not.toMatch(/^\s*api_key\s+text/m)
  })

  it('keeps Vault decryption behind account-bound private functions', () => {
    expect(sql).toContain('vault.create_secret(key_entry.api_key)')
    expect(sql).toContain('vault.update_secret(existing_secret_id, key_entry.api_key)')
    expect(sql).toContain('join vault.decrypted_secrets')
    expect(sql).toMatch(/private\.list_tracer_user_api_keys[\s\S]*mapping\.user_id = \(select auth\.uid\(\)\)/)
    expect(sql).toMatch(/public\.list_tracer_user_api_keys[\s\S]*security invoker/)
    expect(sql).toContain('from public, anon')
    expect(sql).toContain('to authenticated')
  })

  it('deletes the encrypted Vault row when its user mapping is removed', () => {
    expect(sql).toContain('after delete on public.user_api_key_secrets')
    expect(sql).toContain('delete from vault.secrets where id = old.secret_id')
  })
})
