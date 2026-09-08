import { hasTauriRuntime } from '../tauri'

/** The old demo remains opt-in for screenshots/tests; browsers run the real app. */
export function isWebPreviewRuntime(): boolean {
  return !hasTauriRuntime() && import.meta.env.VITE_TRACER_WEB_PREVIEW === '1'
}

export function appBasePath(): string {
  const base = import.meta.env.VITE_TRACER_BASE_PATH || '/'
  return `/${base.split('/').filter(Boolean).join('/')}${base === '/' ? '' : '/'}`
}

export function appUrl(path = ''): string {
  return `${appBasePath()}${path.replace(/^\/+/, '')}`
}

export function browserStorageKey(name: string): string {
  return `tracer:${appBasePath()}:${name}`
}

/** Native keeps its existing singleton scope; web isolates each signed-in owner. */
export function studyStorageOwner(profile: { id: string; supabaseUserId?: string | null } | null | undefined): string | undefined {
  if (!profile) return undefined
  return hasTauriRuntime() ? profile.id : browserStorageKey(`study:${profile.supabaseUserId ?? profile.id}`)
}
