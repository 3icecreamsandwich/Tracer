import { getSupabaseClient } from '../auth/client'
import { aiProviderSettingsSave, aiSecretsGet } from './credentials'
import { providerApiKeyCredentialKinds, providerApiKeyIds } from './credentials/constants'
import type { ProviderApiKeyDrafts, ProviderApiKeyId } from './credentials/types'
import { ensureProviderDefaultModels } from './provider-model-defaults'

export type CloudProviderApiKeyRow = {
  provider_id: string
  api_key: string
}

function isProviderApiKeyId(value: unknown): value is ProviderApiKeyId {
  return typeof value === 'string' && (providerApiKeyIds as string[]).includes(value)
}

async function authenticatedClient() {
  const client = getSupabaseClient()
  const { data } = await client.auth.getSession()
  return data.session ? client : null
}

export async function saveProviderApiKeysToCloud(keys: ProviderApiKeyDrafts): Promise<boolean> {
  const client = await authenticatedClient()
  if (!client) return false
  const { error } = await client.rpc('save_tracer_user_api_keys', { requested_keys: keys })
  if (error) throw new Error('Could not sync provider API keys to your account')
  return true
}

export async function deleteProviderApiKeyFromCloud(id: ProviderApiKeyId): Promise<boolean> {
  const client = await authenticatedClient()
  if (!client) return false
  const { error } = await client.rpc('delete_tracer_user_api_key', {
    requested_provider_id: id,
  })
  if (error) throw new Error('Could not remove the provider API key from your account')
  return true
}

export async function loadProviderApiKeysFromCloud(): Promise<ProviderApiKeyDrafts | null> {
  const client = await authenticatedClient()
  if (!client) return null
  const { data, error } = await client.rpc('list_tracer_user_api_keys')
  if (error) throw new Error('Could not load provider API keys from your account')

  return normalizeCloudProviderApiKeyRows((data ?? []) as CloudProviderApiKeyRow[])
}

export function normalizeCloudProviderApiKeyRows(rows: CloudProviderApiKeyRow[]): ProviderApiKeyDrafts {
  const keys: ProviderApiKeyDrafts = {}
  for (const row of rows) {
    if (!isProviderApiKeyId(row.provider_id) || typeof row.api_key !== 'string') continue
    const value = row.api_key.trim()
    if (value) keys[row.provider_id] = value
  }
  return keys
}

export async function syncCloudProviderApiKeysToDevice(): Promise<ProviderApiKeyId[]> {
  const cloudKeys = await loadProviderApiKeysFromCloud()
  if (!cloudKeys) return []

  const localOnlyKeys: ProviderApiKeyDrafts = {}
  const newlyRestoredProviderIds: ProviderApiKeyId[] = []
  for (const id of providerApiKeyIds) {
    const value = (await aiSecretsGet(providerApiKeyCredentialKinds[id]))?.trim() ?? ''
    if (cloudKeys[id]) {
      if (!value) newlyRestoredProviderIds.push(id)
      continue
    }
    if (value) localOnlyKeys[id] = value
  }

  const restored = Object.keys(cloudKeys).length > 0
    ? await aiProviderSettingsSave({ apiKeys: cloudKeys })
    : { savedApiKeyIds: [] as ProviderApiKeyId[] }
  const availableProviderIds = [...new Set([
    ...restored.savedApiKeyIds,
    ...(Object.keys(localOnlyKeys) as ProviderApiKeyId[]),
  ])]
  await ensureProviderDefaultModels([...new Set([
    ...newlyRestoredProviderIds,
    ...(Object.keys(localOnlyKeys) as ProviderApiKeyId[]),
  ])])
  if (Object.keys(localOnlyKeys).length > 0) {
    await saveProviderApiKeysToCloud(localOnlyKeys)
  }
  return availableProviderIds
}
