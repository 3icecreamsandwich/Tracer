import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { hasTauriRuntime } from '../tauri'
import { appUrl, browserStorageKey } from '../platform/web'

type MemoryStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

const values = new Map<string, string>()
const memoryStorage: MemoryStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: (key) => values.delete(key),
}

let client: SupabaseClient | null = null
let runtimeConfig: SupabaseClientConfig | null = null

export type SupabaseClientConfig = {
  url: string
  publishableKey: string
}

export function getSupabaseConfig(): SupabaseClientConfig | null {
  const buildUrl = String(import.meta.env.VITE_SUPABASE_URL ?? '').trim()
  const buildKey = String(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '').trim()
  const url = buildUrl && buildKey ? buildUrl : String(runtimeConfig?.url ?? '').trim()
  const publishableKey = buildUrl && buildKey ? buildKey : String(runtimeConfig?.publishableKey ?? '').trim()
  if (!url || !publishableKey) return null
  try {
    const parsed = new URL(url)
    if (
      parsed.protocol !== 'https:' &&
      parsed.hostname !== '127.0.0.1' &&
      parsed.hostname !== 'localhost'
    ) {
      return null
    }
  } catch {
    return null
  }
  return { url: url.replace(/\/$/, ''), publishableKey }
}

export async function loadSupabaseRuntimeConfig(): Promise<boolean> {
  if (isSupabaseConfigured()) return true
  if (hasTauriRuntime() || typeof window === 'undefined') return false
  try {
    const response = await fetch(appUrl('/api/web/config'), { cache: 'no-store' })
    if (!response.ok) return false
    const value = await response.json() as Partial<SupabaseClientConfig>
    if (typeof value.url !== 'string' || typeof value.publishableKey !== 'string' || value.publishableKey.startsWith('sb_secret_')) return false
    runtimeConfig = { url: value.url, publishableKey: value.publishableKey }
    return isSupabaseConfigured()
  } catch { return false }
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null
}

export function getSupabaseClient(): SupabaseClient {
  if (client) return client
  const config = getSupabaseConfig()
  if (!config) throw new Error('supabase_not_configured')
  client = createClient(config.url, config.publishableKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: !hasTauriRuntime(),
      storage: hasTauriRuntime() ? memoryStorage : undefined,
      storageKey: hasTauriRuntime() ? undefined : browserStorageKey('auth'),
    },
  })
  return client
}

export function clearSupabaseMemorySession(): void {
  values.clear()
}

// Public catalog reads must never wait for account restoration or a token refresh.
let publicClient: SupabaseClient | null = null
export function getPublicSupabaseClient(): SupabaseClient {
  if (publicClient) return publicClient
  const config = getSupabaseConfig()
  if (!config) throw new Error('supabase_not_configured')
  publicClient = createClient(config.url, config.publishableKey, {
    auth: {
      storageKey: 'tracer-public-catalog',
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
  return publicClient
}
