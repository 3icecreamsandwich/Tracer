import { webApiJson } from '../../platform/web-api'
import { providerApiKeyCredentialKinds, providerApiKeyIds } from './constants'
import type { ProviderApiKeyPresence, ProviderSettingsSaveInput, ProviderSettingsSaveResult } from './types'
import { browserStorageKey } from '../../platform/web'

let presence: ProviderApiKeyPresence | null = null
let pending: Promise<ProviderApiKeyPresence> | null = null
let checkedAt = 0
export function webProviderPresence(force = false): Promise<ProviderApiKeyPresence> {
  if (!force && presence && Date.now() - checkedAt < 30_000) return Promise.resolve(presence)
  if (pending) return pending
  pending = webApiJson<ProviderApiKeyPresence>('credentials').then(value => { presence = value; checkedAt = Date.now(); return value }).finally(() => { pending = null })
  return pending
}
export async function webProviderSecret(kind: string): Promise<string | null> {
  const id = providerApiKeyIds.find(id => providerApiKeyCredentialKinds[id] === kind)
  if (!id) return null
  return (await webProviderPresence())[id] ? 'tracer-server-managed' : null
}
export async function webSaveProviderSettings(input: ProviderSettingsSaveInput): Promise<ProviderSettingsSaveResult> {
  const ids = Object.keys(input.apiKeys ?? {})
  const result = ids.length ? await webApiJson<ProviderSettingsSaveResult>('credentials', { apiKeys: input.apiKeys }) : { savedApiKeyIds: [], savedOpenAiCompatConfig: false }
  if (input.openAiCompatConfig) localStorage.setItem(browserStorageKey('compatible-api'), JSON.stringify(input.openAiCompatConfig))
  presence = null
  return { ...result, savedOpenAiCompatConfig: Boolean(input.openAiCompatConfig) }
}
export async function webDeleteProviderSecret(kind: string) {
  const id = providerApiKeyIds.find(id => providerApiKeyCredentialKinds[id] === kind)
  if (id) await webApiJson('credentials', { deleteId: id })
  presence = null
}
