import { createClient } from '@supabase/supabase-js'
import { createError, setCookie, setResponseStatus } from 'h3'
import { authenticatedWebContext, limitWebAuthHandoff } from '../../../utils/web-auth'
import {
  allowLandingAuthOrigin,
  WEB_AUTH_HANDOFF_COOKIE,
  WEB_AUTH_HANDOFF_COOKIE_PATH,
} from '../../../utils/web-auth-handoff'
import { readWebJson } from '../../../utils/web-body'
import { webRuntimeConfig } from '../../../utils/web-config'

export default defineEventHandler(async (event) => {
  allowLandingAuthOrigin(event)
  const { client: authenticatedClient, userId } = await authenticatedWebContext(event)
  await limitWebAuthHandoff(event, userId)
  const body = await readWebJson(event, 16 * 1024)
  if (typeof body?.refreshToken !== 'string' || body.refreshToken.length < 8 || body.refreshToken.length > 8192) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid sign-in handoff.' })
  }

  const [{ data: current }, config] = await Promise.all([
    authenticatedClient.auth.getUser(),
    Promise.resolve(webRuntimeConfig(event)),
  ])
  if (!current.user) throw createError({ statusCode: 401, statusMessage: 'Your session expired. Sign in again.' })

  // Rotate the supplied refresh token before storing it. Matching both users
  // prevents login-CSRF session swapping with another account's refresh token.
  const transferClient = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const { data: refreshed, error } = await transferClient.auth.refreshSession({ refresh_token: body.refreshToken })
  if (error || !refreshed.session || refreshed.user?.id !== current.user.id) {
    throw createError({ statusCode: 401, statusMessage: 'Your session expired. Sign in again.' })
  }

  setCookie(event, WEB_AUTH_HANDOFF_COOKIE, refreshed.session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 90,
    path: WEB_AUTH_HANDOFF_COOKIE_PATH,
  })
  setResponseStatus(event, 204)
  return null
})
