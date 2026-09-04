import { createProfileRepo, useTracerDb, type Profile } from './db'

let profileRequest: Promise<Profile | null> | null = null

/** Share the local profile read used by the shell and the active page. */
export function loadAppProfileOnce(): Promise<Profile | null> {
  if (!profileRequest) {
    const request = useTracerDb()
      .then((db) => createProfileRepo(db).get())
      .catch((error) => {
        if (profileRequest === request) profileRequest = null
        throw error
      })
    profileRequest = request
  }
  return profileRequest
}

export function clearAppProfileRequest() {
  profileRequest = null
}
