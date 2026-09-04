import { createSettingsRepo, useTracerDb, type AppSettings } from './db'

let settingsRequest: Promise<AppSettings> | null = null

/** Share the single settings-row read performed while a document boots. */
export function loadAppSettingsOnce(): Promise<AppSettings> {
  if (!settingsRequest) {
    const request = useTracerDb()
      .then((db) => createSettingsRepo(db).get())
      .catch((error) => {
        if (settingsRequest === request) settingsRequest = null
        throw error
      })
    settingsRequest = request
  }
  return settingsRequest
}

export function clearAppSettingsRequest() {
  settingsRequest = null
}
