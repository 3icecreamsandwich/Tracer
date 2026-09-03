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
import {
  restoreAuthSession,
  waitForProviderKeySync,
  type AuthIdentity,
} from './auth/session'

const NETWORK_STATUS_MAX_AGE_MS = 5 * 60 * 1000

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

async function refreshProviderPresence() {
  providerApiKeyPresence.value = await aiProviderApiKeyPresence()
}

async function refreshAccountConnection(initialProviderPresence?: Promise<void>) {
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
}

export function setAccountConnectionSignedOut() {
  accountIdentity.value = null
  accountConnectionStatus.value = 'signed_out'
  providerKeySyncPending.value = false
}

export function markAccountConnectionOffline() {
  if (accountConnectionStatus.value !== 'signed_out') {
    accountConnectionStatus.value = 'offline'
  }
  networkCheckedAt = 0
}

export function setProviderApiKeyPresence(id: ProviderApiKeyId, present: boolean) {
  providerApiKeyPresence.value = {
    ...providerApiKeyPresence.value,
    [id]: present,
  }
  providerApiKeyPresencePending.value = false
}

export function setOpenAiCompatConnectionConfig(config: OpenAiCompatConfig) {
  openAiCompatConfig.value = normalizedOpenAiCompatConfig(config)
  openAiCompatConfigPending.value = false
}

export function setGithubConnectionState(state: GithubModelsAuthState) {
  applyGithubState(state)
  githubConnectionPending.value = false
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

export function resetConnectionStatusCache() {
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
