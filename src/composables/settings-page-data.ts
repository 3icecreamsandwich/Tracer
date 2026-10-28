import { createProfileRepo, createSettingsRepo, useTracerDb } from './db'
import { lockGetStatus } from './lock'

/** Keep OS keychain latency out of the independent local database read chain. */
type LocalSettingsData = {
  db: Awaited<ReturnType<typeof useTracerDb>>
  profile: Awaited<ReturnType<ReturnType<typeof createProfileRepo>["get"]>>
  settings: Awaited<ReturnType<ReturnType<typeof createSettingsRepo>["get"]>>
}

export async function loadSettingsPageData(onLocalReady?: (data: LocalSettingsData) => void) {
  const [status, local] = await Promise.all([
    lockGetStatus(),
    useTracerDb().then(async (db) => {
      const [profile, settings] = await Promise.all([
        createProfileRepo(db).get(),
        createSettingsRepo(db).get(),
      ])
      const local = { db, profile, settings }
      onLocalReady?.(local)
      return local
    }),
  ])
  return { status, ...local }
}
