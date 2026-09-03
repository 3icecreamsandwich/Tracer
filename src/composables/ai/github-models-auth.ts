import { ref, shallowRef } from 'vue'
import {
  githubDeviceCodeRequest,
  githubDeviceTokenPollOnce,
  githubOAuthClientId,
  githubPkceAuthorizeUrl,
  githubPkceExchangeToken,
  githubPkceFinish,
  githubPkceStart,
  mapDevicePollResponse,
  openExternal,
  pkceChallengeS256,
  randomPkceVerifier
} from './github-oauth'
import {
  githubModelsInvalidateToken,
  githubModelsStoreToken,
} from './github-state'
import { redactSensitiveText } from '../security/redact'
import {
  refreshGithubConnectionStatus,
  setGithubConnectionState,
  useConnectionStatus,
} from '../connection-status'

export type GithubAuthStep =
  | 'idle'
  | 'requesting'
  | 'device_pending'
  | 'device_success'
  | 'pkce_pending'
  | 'error'

function errorMessage(error: unknown, fallback: string) {
  if (typeof error === 'string') return error
  if (error instanceof Error && typeof error.message === 'string') return error.message
  if (typeof error === 'object' && error !== null &&
    typeof (error as { message?: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  return fallback
}

export function useGithubModelsAuth(options: { isWebPreview: () => boolean }) {
  const isGithubAuthOpen = ref(false)
  const githubAuthBusy = ref(false)
  const githubAuthStep = ref<GithubAuthStep>('idle')
  const githubAuthError = ref<string | null>(null)
  const githubAuthVerificationUri = ref<string | null>(null)
  const githubAuthUserCode = ref<string | null>(null)
  const githubAuthExpiresAt = ref<number | null>(null)
  const githubAuthNextPollIntervalSec = ref<number | null>(null)
  const githubAuthPollAbort = shallowRef<AbortController | null>(null)
  const {
    githubModelsAuthState,
    githubModelsAvailableModelIds,
  } = useConnectionStatus()

  function resetPrompt() {
    githubAuthStep.value = 'idle'
    githubAuthError.value = null
    githubAuthVerificationUri.value = null
    githubAuthUserCode.value = null
    githubAuthExpiresAt.value = null
    githubAuthNextPollIntervalSec.value = null
  }

  function openGithubAuth() {
    isGithubAuthOpen.value = true
    resetPrompt()
  }

  function closeGithubAuth() {
    githubAuthPollAbort.value?.abort()
    githubAuthPollAbort.value = null
    isGithubAuthOpen.value = false
  }

  async function githubRefreshAuthState() {
    await refreshGithubConnectionStatus()
  }

  async function copyToClipboard(text: string | null) {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
    } catch {}
  }

  function githubAuthReset() {
    githubAuthBusy.value = false
    resetPrompt()
  }

  async function onGithubAuthSignOut() {
    if (options.isWebPreview()) {
      githubAuthError.value = 'GitHub authentication is not available in web preview.'
      return
    }
    githubAuthBusy.value = true
    githubAuthError.value = null
    try {
      await githubModelsInvalidateToken()
      setGithubConnectionState({ status: 'unauthenticated' })
    } catch (error) {
      githubAuthError.value = redactSensitiveText(errorMessage(error, 'Failed to sign out'))
    } finally {
      githubAuthBusy.value = false
    }
  }

  async function pollDeviceToken(device: {
    clientId: string
    deviceCode: string
    initialIntervalSec: number
    expiresAtMs: number
  }) {
    const abort = new AbortController()
    githubAuthPollAbort.value = abort
    let intervalSec = Math.max(1, Math.floor(device.initialIntervalSec))
    githubAuthNextPollIntervalSec.value = intervalSec

    while (!abort.signal.aborted) {
      if (device.expiresAtMs - Date.now() <= 0) {
        githubAuthStep.value = 'error'
        githubAuthError.value = 'Device code expired. Try again.'
        return
      }

      await new Promise((resolve) => setTimeout(resolve, intervalSec * 1000))
      if (abort.signal.aborted) return

      const body = await githubDeviceTokenPollOnce({
        clientId: device.clientId,
        deviceCode: device.deviceCode
      })
      const event = mapDevicePollResponse(body as any, intervalSec)
      if (event.type === 'pending' || event.type === 'slow_down') {
        intervalSec = event.nextIntervalSec
        githubAuthNextPollIntervalSec.value = intervalSec
        continue
      }
      if (event.type === 'expired') {
        githubAuthStep.value = 'error'
        githubAuthError.value = 'Device code expired. Try again.'
        return
      }
      if (event.type === 'denied') {
        githubAuthStep.value = 'error'
        githubAuthError.value = 'Access denied. You cancelled or declined authorization.'
        return
      }
      if (event.type === 'device_flow_disabled') throw new Error('device_flow_disabled')
      if (event.type === 'error') {
        githubAuthStep.value = 'error'
        githubAuthError.value = event.message
        return
      }
      if (event.type === 'success') {
        await githubModelsStoreToken(event.token.access_token)
        await githubRefreshAuthState()
        githubAuthStep.value = 'device_success'
        return
      }
    }
  }

  async function tryDeviceFlow() {
    const clientId = githubOAuthClientId()
    const device = await githubDeviceCodeRequest({ clientId, scope: 'models:read' })
    githubAuthVerificationUri.value = device.verification_uri
    githubAuthUserCode.value = device.user_code
    githubAuthExpiresAt.value = Date.now() + device.expires_in * 1000
    githubAuthStep.value = 'device_pending'

    await openExternal(device.verification_uri)
    await pollDeviceToken({
      clientId,
      deviceCode: device.device_code,
      initialIntervalSec: device.interval,
      expiresAtMs: githubAuthExpiresAt.value
    })
  }

  async function tryPkceFlow() {
    const clientId = githubOAuthClientId()
    const start = await githubPkceStart()
    const state = crypto.randomUUID()
    const verifier = randomPkceVerifier()
    const challenge = await pkceChallengeS256(verifier)
    const url = await githubPkceAuthorizeUrl({
      clientId,
      port: start.port,
      state,
      scope: 'models:read',
      codeChallenge: challenge
    })

    githubAuthStep.value = 'pkce_pending'
    await openExternal(url)
    const callback = await githubPkceFinish({
      id: start.id,
      expectedState: state,
      timeoutMs: 120_000
    })
    const token = await githubPkceExchangeToken({
      clientId,
      code: callback.code,
      port: start.port,
      codeVerifier: verifier
    })
    const event = mapDevicePollResponse(token as any, 0)
    if (event.type !== 'success') {
      throw new Error((token as any)?.error ?? 'pkce_failed')
    }
    await githubModelsStoreToken(event.token.access_token)
    await githubRefreshAuthState()
    githubAuthStep.value = 'device_success'
  }

  async function onGithubAuthStart() {
    if (options.isWebPreview()) {
      githubAuthStep.value = 'error'
      githubAuthError.value = 'GitHub authentication is not available in web preview.'
      return
    }
    githubAuthBusy.value = true
    githubAuthError.value = null
    githubAuthPollAbort.value?.abort()
    githubAuthPollAbort.value = null

    try {
      githubAuthStep.value = 'requesting'
      try {
        await tryDeviceFlow()
      } catch {
        await tryPkceFlow()
      }
    } catch (error) {
      githubAuthStep.value = 'error'
      githubAuthError.value = redactSensitiveText(
        errorMessage(error, 'GitHub authentication failed')
      )
    } finally {
      githubAuthBusy.value = false
    }
  }

  return {
    isGithubAuthOpen,
    githubAuthBusy,
    githubAuthStep,
    githubAuthError,
    githubAuthVerificationUri,
    githubAuthUserCode,
    githubAuthNextPollIntervalSec,
    githubModelsAuthState,
    githubModelsAvailableModelIds,
    openGithubAuth,
    closeGithubAuth,
    githubAuthReset,
    githubRefreshAuthState,
    onGithubAuthCopyCode: () => copyToClipboard(githubAuthUserCode.value),
    onGithubAuthCopyUrl: () => copyToClipboard(githubAuthVerificationUri.value),
    onGithubAuthSignOut,
    onGithubAuthStart
  }
}
