export const CONNECTION_STARTUP_STATE_KEY = 'tracer:connection-startup-state'
export const CONNECTION_STARTUP_RETRY_MS = 30_000
export const CONNECTION_STARTUP_FRESH_MS = 5 * 60_000

export type ConnectionStartupState = {
  attemptedAt: number
  completedAt: number
}

export function parseConnectionStartupState(raw: string | null): ConnectionStartupState {
  try {
    const parsed = JSON.parse(raw ?? '') as Partial<ConnectionStartupState>
    return {
      attemptedAt: Number.isFinite(parsed.attemptedAt) ? Number(parsed.attemptedAt) : 0,
      completedAt: Number.isFinite(parsed.completedAt) ? Number(parsed.completedAt) : 0,
    }
  } catch {
    return { attemptedAt: 0, completedAt: 0 }
  }
}

export function shouldRunConnectionStartup(state: ConnectionStartupState, now = Date.now()) {
  if (state.completedAt > 0 && now - state.completedAt < CONNECTION_STARTUP_FRESH_MS) return false
  if (state.attemptedAt > 0 && now - state.attemptedAt < CONNECTION_STARTUP_RETRY_MS) return false
  return true
}

export function isDocumentReload(entries: ArrayLike<{ type?: string }> | undefined) {
  return Boolean(entries?.length && entries[0]?.type === 'reload')
}
