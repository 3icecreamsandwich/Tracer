import { computed, ref } from 'vue'

import {
  aiProviderApiKeyPresence,
  aiOpenAiCompatGetConfig,
  type OpenAiCompatConfig,
  type ProviderApiKeyId,
  type ProviderApiKeyPresence,
} from './ai/credentials'
import {
  githubModelsLoadAuthState,
  type GithubModelsAuthState,
} from './ai/github-state'
import type { AuthIdentity } from './auth/session'

const NETWORK_STATUS_MAX_AGE_MS = 5 * 60 * 1000
export const CONNECTION_STATUS_SNAPSHOT_KEY = 'tracer:connection-status-snapshot'

export type AccountConnectionStatus = 'pending' | 'online' | 'offline' | 'signed_out'

const accountConnectionStatus = ref<AccountConnectionStatus>('pending')
const accountIdentity = ref<AuthIdentity | null>(null)
const providerApiKeyPresence = ref<ProviderApiKeyPresence>(emptyProviderApiKeyPresence())
const providerApiKeyPresencePending = ref(true)
const providerKeySyncPending = ref(true)
const openAiCompatConfig = ref<OpenAiCompatConfig>({ baseURL: '', modelId: '' })
const openAiCompatConfigPending = ref(true)
const githubModelsAuthState = ref<GithubModelsAuthState>({ status: 'unauthenticated' })
const githubModelsAvailableModelIds = ref<string[]>([])
const githubConnectionPending = ref(true)
const initialized = ref(false)

function emptyProviderApiKeyPresence(): ProviderApiKeyPresence {
  return {
    openai: false,
    anthropic: false,
    gemini: false,
    ollama_cloud: false,
    openai_compat: false,
  }
}

let initializationRequest: Promise<void> | null = null
let networkRefreshRequest: Promise<void> | null = null
let networkCheckedAt = 0
let listenersInstalled = false

type ConnectionStatusSnapshot = {
  checkedAt: number
  accountConnectionStatus: Exclude<AccountConnectionStatus, 'pending'>
  accountIdentity: AuthIdentity | null
  providerApiKeyPresence: ProviderApiKeyPresence
  openAiCompatConfig: OpenAiCompatConfig
  githubModelsAuthState: GithubModelsAuthState
}

function normalizedOpenAiCompatConfig(config?: OpenAiCompatConfig | null): OpenAiCompatConfig {
  return {
    baseURL: config?.baseURL.trim() ?? '',
    modelId: config?.modelId.trim() ?? '',
  }
}

function applyGithubState(state: GithubModelsAuthState) {
  githubModelsAuthState.value = state
  githubModelsAvailableModelIds.value = state.status === 'authenticated'
    ? state.models.map((model) => model.id)
    : []
}

function readSessionSnapshot(): ConnectionStatusSnapshot | null {
  if (typeof window === 'undefined') return null
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(CONNECTION_STATUS_SNAPSHOT_KEY) ?? '') as Partial<ConnectionStatusSnapshot>
    if (!Number.isFinite(parsed.checkedAt)) return null
    if (!['online', 'offline', 'signed_out'].includes(String(parsed.accountConnectionStatus))) return null
    if (!parsed.providerApiKeyPresence || !parsed.openAiCompatConfig || !parsed.githubModelsAuthState) return null
    return parsed as ConnectionStatusSnapshot
  } catch {
    return null
  }
}

function writeSessionSnapshot() {
  if (typeof window === 'undefined' || !initialized.value || accountConnectionStatus.value === 'pending') return
  try {
    window.sessionStorage.setItem(CONNECTION_STATUS_SNAPSHOT_KEY, JSON.stringify({
      checkedAt: networkCheckedAt,
      accountConnectionStatus: accountConnectionStatus.value,
      accountIdentity: accountIdentity.value,
      providerApiKeyPresence: providerApiKeyPresence.value,
      openAiCompatConfig: openAiCompatConfig.value,
      githubModelsAuthState: githubModelsAuthState.value,
    } satisfies ConnectionStatusSnapshot))
  } catch {}
}

function restoreFreshSessionSnapshot(now = Date.now()) {
  const snapshot = readSessionSnapshot()
  if (!snapshot || now - snapshot.checkedAt >= NETWORK_STATUS_MAX_AGE_MS) return false
  accountConnectionStatus.value = snapshot.accountConnectionStatus
  accountIdentity.value = snapshot.accountIdentity
  providerApiKeyPresence.value = snapshot.providerApiKeyPresence
  providerApiKeyPresencePending.value = false
  providerKeySyncPending.value = false
  openAiCompatConfig.value = normalizedOpenAiCompatConfig(snapshot.openAiCompatConfig)
  openAiCompatConfigPending.value = false
  applyGithubState(snapshot.githubModelsAuthState)
  githubConnectionPending.value = false
  initialized.value = true
  networkCheckedAt = snapshot.checkedAt
  return true
}

async function refreshProviderPresence() {
  providerApiKeyPresence.value = await aiProviderApiKeyPresence()
}

async function refreshAccountConnection(initialProviderPresence?: Promise<void>) {
  const { restoreAuthSession, waitForProviderKeySync } = await import('./auth/session')
  const account = await restoreAuthSession({ waitForProviderKeySync: false })
  accountIdentity.value = account?.identity ?? null
  accountConnectionStatus.value = account === null
    ? 'signed_out'
    : account.online
      ? 'online'
      : 'offline'

  if (account?.online) {
    try {
      await initialProviderPresence?.catch(() => {})
      await waitForProviderKeySync()
      await refreshProviderPresence()
    } catch {
      // Credential status can fail independently of the confirmed account session.
    }
  }
  providerKeySyncPending.value = false
}

async function refreshGithubConnection() {
  applyGithubState(await githubModelsLoadAuthState())
}

export async function refreshGithubConnectionStatus(): Promise<void> {
  try {
    await refreshGithubConnection()
  } finally {
    githubConnectionPending.value = false
  }
}

export async function initializeConnectionStatuses(): Promise<void> {
  if (initialized.value) return
  if (initializationRequest) return initializationRequest
  if (restoreFreshSessionSnapshot()) return

  const initialProviderPresence = (async () => {
    try {
      await refreshProviderPresence()
    } finally {
      providerApiKeyPresencePending.value = false
    }
  })()

  const request = Promise.allSettled([
    initialProviderPresence,
    (async () => {
      try {
        openAiCompatConfig.value = normalizedOpenAiCompatConfig(await aiOpenAiCompatGetConfig())
      } finally {
        openAiCompatConfigPending.value = false
      }
    })(),
    (async () => {
      try {
        await refreshGithubConnection()
      } finally {
        githubConnectionPending.value = false
      }
    })(),
    (async () => {
      try {
        await refreshAccountConnection(initialProviderPresence)
      } catch {
        accountConnectionStatus.value = 'offline'
        providerKeySyncPending.value = false
      }
    })(),
  ]).then(() => {
    initialized.value = true
    networkCheckedAt = Date.now()
    writeSessionSnapshot()
  }).finally(() => {
    if (initializationRequest === request) initializationRequest = null
  })

  initializationRequest = request
  return request
}

export async function refreshNetworkConnectionStatuses(options: { force?: boolean } = {}): Promise<void> {
  await initializeConnectionStatuses()
  if (!options.force && Date.now() - networkCheckedAt < NETWORK_STATUS_MAX_AGE_MS) return
  if (networkRefreshRequest) return networkRefreshRequest

  const request = Promise.allSettled([
    refreshAccountConnection().catch(() => {
      accountConnectionStatus.value = 'offline'
    }),
    refreshGithubConnection(),
  ]).then(() => {
    networkCheckedAt = Date.now()
    writeSessionSnapshot()
  }).finally(() => {
    if (networkRefreshRequest === request) networkRefreshRequest = null
  })
  networkRefreshRequest = request
  return request
}

export function setAccountConnectionOnline(identity: AuthIdentity) {
  accountIdentity.value = identity
  accountConnectionStatus.value = 'online'
  providerKeySyncPending.value = true
  writeSessionSnapshot()
}

export function setAccountConnectionSignedOut() {
  accountIdentity.value = null
  accountConnectionStatus.value = 'signed_out'
  providerKeySyncPending.value = false
  writeSessionSnapshot()
}

export function markAccountConnectionOffline() {
  if (accountConnectionStatus.value !== 'signed_out') {
    accountConnectionStatus.value = 'offline'
  }
  networkCheckedAt = 0
  writeSessionSnapshot()
}

export function setProviderApiKeyPresence(id: ProviderApiKeyId, present: boolean) {
  providerApiKeyPresence.value = {
    ...providerApiKeyPresence.value,
    [id]: present,
  }
  providerApiKeyPresencePending.value = false
  writeSessionSnapshot()
}

export function setOpenAiCompatConnectionConfig(config: OpenAiCompatConfig) {
  openAiCompatConfig.value = normalizedOpenAiCompatConfig(config)
  openAiCompatConfigPending.value = false
  writeSessionSnapshot()
}

export function setGithubConnectionState(state: GithubModelsAuthState) {
  applyGithubState(state)
  githubConnectionPending.value = false
  writeSessionSnapshot()
}

export function installConnectionStatusListeners() {
  if (listenersInstalled || typeof window === 'undefined') return
  listenersInstalled = true
  window.addEventListener('offline', markAccountConnectionOffline)
  window.addEventListener('online', onConnectionAvailable)
  window.addEventListener('focus', onWindowFocus)
}

export function uninstallConnectionStatusListeners() {
  if (!listenersInstalled || typeof window === 'undefined') return
  listenersInstalled = false
  window.removeEventListener('offline', markAccountConnectionOffline)
  window.removeEventListener('online', onConnectionAvailable)
  window.removeEventListener('focus', onWindowFocus)
}

function onConnectionAvailable() {
  if (!initialized.value) return
  void refreshNetworkConnectionStatuses({ force: true })
}

function onWindowFocus() {
  if (!initialized.value) return
  void refreshNetworkConnectionStatuses()
}

export function resetConnectionStatusCache(options: { clearSession?: boolean } = {}) {
  initializationRequest = null
  networkRefreshRequest = null
  accountConnectionStatus.value = 'pending'
  accountIdentity.value = null
  providerApiKeyPresence.value = emptyProviderApiKeyPresence()
  providerApiKeyPresencePending.value = true
  providerKeySyncPending.value = true
  openAiCompatConfig.value = { baseURL: '', modelId: '' }
  openAiCompatConfigPending.value = true
  applyGithubState({ status: 'unauthenticated' })
  githubConnectionPending.value = true
  initialized.value = false
  networkCheckedAt = 0
  if (options.clearSession !== false && typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(CONNECTION_STATUS_SNAPSHOT_KEY)
    } catch {}
  }
}

export function useConnectionStatus() {
  return {
    accountConnectionStatus,
    accountConnectionPending: computed(() => accountConnectionStatus.value === 'pending'),
    accountIdentity,
    providerApiKeyPresence,
    providerApiKeyPresencePending,
    providerKeySyncPending,
    openAiCompatConfig,
    openAiCompatConfigPending,
    githubModelsAuthState,
    githubModelsAvailableModelIds,
    githubConnectionPending,
    initialized,
  }
}
