import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { normalizeCloudProviderApiKeyRows } from '../../src/composables/ai/cloud-provider-keys'

const source = readFileSync(
  fileURLToPath(new URL('../../src/composables/ai/cloud-provider-keys.ts', import.meta.url)),
  'utf8',
)
const providerSettingsSource = readFileSync(
  fileURLToPath(new URL('../../src/composables/ai/provider-settings.ts', import.meta.url)),
  'utf8',
)
const authSessionSource = readFileSync(
  fileURLToPath(new URL('../../src/composables/auth/session.ts', import.meta.url)),
  'utf8',
)

describe('cloud provider API key sync', () => {
  it('normalizes only supported non-empty keys returned by the account vault', () => {
    expect(normalizeCloudProviderApiKeyRows([
      { provider_id: 'openai', api_key: ' sk-openai ' },
      { provider_id: 'ollama_cloud', api_key: 'ollama-key' },
      { provider_id: 'gemini', api_key: '   ' },
      { provider_id: 'unknown', api_key: 'ignored' },
    ])).toEqual({ openai: 'sk-openai', ollama_cloud: 'ollama-key' })
  })

  it('requires an authenticated session for every cloud key operation', () => {
    expect(source).toContain('client.auth.getSession()')
    expect(source).toMatch(/return data\.session \? client : null/)
    expect(source).toContain("client.rpc('save_tracer_user_api_keys'")
    expect(source).toContain("client.rpc('list_tracer_user_api_keys')")
    expect(source).toContain("client.rpc('delete_tracer_user_api_key'")
  })

  it('uploads after local saves and restores into the encrypted device vault after sign-in', () => {
    expect(providerSettingsSource).toMatch(/aiProviderSettingsSave[\s\S]*saveProviderApiKeysToCloud/)
    expect(source).toMatch(/loadProviderApiKeysFromCloud[\s\S]*aiProviderSettingsSave/)
    expect(source).toMatch(/newlyRestoredProviderIds[\s\S]*ensureProviderDefaultModels/)
    expect(source).toMatch(/if \(!value\) newlyRestoredProviderIds\.push\(id\)/)
    expect(source).toMatch(/aiSecretsGet\(providerApiKeyCredentialKinds\[id\]\)[\s\S]*saveProviderApiKeysToCloud\(localOnlyKeys\)/)
    expect(authSessionSource).toContain('syncCloudProviderApiKeysToDevice()')
  })
})
