import { getSupabaseClient } from '../auth/client'
import { appUrl } from './web'

export async function webApiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const { data, error } = await getSupabaseClient().auth.getSession()
  if (error || !data.session) throw new Error('Sign in to your Tracer account to use cloud AI.')
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${data.session.access_token}`)
  return fetch(appUrl(`api/web/${path}`), { ...init, headers })
}

export async function webApiJson<T>(path: string, body?: unknown, method = body === undefined ? 'GET' : 'POST'): Promise<T> {
  const response = await webApiFetch(path, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.statusMessage || 'Cloud AI is unavailable. Check your connection and sign-in, then try again.')
  }
  return response.json()
}
