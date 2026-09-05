import { createProfileRepo, createSettingsRepo, useTracerDb } from './db'
import { lockGetStatus } from './lock'

/** Keep OS keychain latency out of the independent local database read chain. */
export async function loadSettingsPageData() {
  const [status, local] = await Promise.all([
    lockGetStatus(),
    useTracerDb().then(async (db) => {
      const [profile, settings] = await Promise.all([
        createProfileRepo(db).get(),
        createSettingsRepo(db).get(),
      ])
      return { db, profile, settings }
    }),
  ])
  return { status, ...local }
}
