import type { AppSettings, DbClient } from '../db/types'
import { createProfileRepo } from '../db/repos/profile.repo'
import { cloudLibraryEnabled, getRow, saveRow } from './client'
import type { CloudRow } from './client'
import { readCache } from './cache'

const writes = new WeakMap<DbClient, Promise<unknown>>()

const refreshing = new Map<string, Promise<void>>()
const refreshed = new Map<string, number>()

// Lock, updates and floating windows are device settings; keys remain in secure storage.
const keys = ['aiMode', 'defaultModelId', 'fallbackModelIds', 'darkMode', 'learnHybridEnabled', 'smartReviewEnabled', 'flashcardsDefinitionFirst', 'language', 'textScale'] as const
export function personalPreferences(settings: Partial<AppSettings>): Partial<AppSettings> {
  return Object.fromEntries(keys.filter(key => settings[key] !== undefined).map(key => [key, settings[key]]))
}
export function cloudPreferencesRepo(db: DbClient, local: { get(): Promise<AppSettings>; set(patch: Partial<AppSettings>): Promise<AppSettings> }) {
  async function ownerId() {
    return cloudLibraryEnabled() ? (await createProfileRepo(db).get())?.supabaseUserId : null
  }
  return {
    async get(): Promise<AppSettings> {
      const [settings, owner] = await Promise.all([local.get(), ownerId()])
      if (!owner) return settings
      // Page/lock guards must never wait for authentication, import or the network.
      const cached = await readCache<CloudRow<Partial<AppSettings>> | null>(owner, 'preferences:app')
      if (!refreshing.has(owner) && Date.now() - (refreshed.get(owner) ?? 0) > 30_000) {
        const request = getRow<Partial<AppSettings>>(db, 'preferences', 'app', true)
          .then(() => {
            refreshed.set(owner, Date.now())
          })
          .catch(() => { /* Keep the last-known preferences when offline. */ })
          .finally(() => refreshing.delete(owner))
        refreshing.set(owner, request)
      }
      return cached && !cached.deleted ? { ...settings, ...personalPreferences(cached.payload) } : settings
    },
    async set(patch: Partial<AppSettings>): Promise<AppSettings> {
      // Separate controls can save concurrently. Merge each patch only after the
      // previous acknowledged write so a whole-row update cannot erase it.
      const personal = personalPreferences(patch)
      const owner = await ownerId()
      if (!owner || !Object.keys(personal).length) return local.set(patch)
      const previous = writes.get(db) ?? Promise.resolve()
      const request = previous.catch(() => {}).then(async () => {
        if (await ownerId() !== owner) throw new Error('Your account changed. Try saving again.')
        const current = await getRow<Partial<AppSettings>>(db, 'preferences', 'app')
        const saved = await saveRow(db, 'preferences', 'app', { ...(current?.payload ?? personalPreferences(await local.get())), ...personal }, current?.revision ?? 0)
        return local.set({ ...patch, ...personalPreferences(saved.payload) })
      })
      writes.set(db, request)
      try { return await request } finally {
        if (writes.get(db) === request) writes.delete(db)
      }
    },
  }
}
