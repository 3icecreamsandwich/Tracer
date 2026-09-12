import { createClient } from '@supabase/supabase-js'
import { createError, deleteCookie, getCookie, setHeader } from 'h3'
import {
  WEB_AUTH_HANDOFF_COOKIE,
  WEB_AUTH_HANDOFF_COOKIE_PATH,
} from '../../../../utils/web-auth-handoff'
import { webRuntimeConfig } from '../../../../utils/web-config'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'private, no-store')
  const refreshToken = getCookie(event, WEB_AUTH_HANDOFF_COOKIE)
  deleteCookie(event, WEB_AUTH_HANDOFF_COOKIE, {
    secure: true,
    sameSite: 'strict',
    path: WEB_AUTH_HANDOFF_COOKIE_PATH,
  })
  if (!refreshToken) throw createError({ statusCode: 401, statusMessage: 'This sign-in link expired. Sign in again.' })

  const config = webRuntimeConfig(event)
  const client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const { data, error } = await client.auth.refreshSession({ refresh_token: refreshToken })
  if (error || !data.session) throw createError({ statusCode: 401, statusMessage: 'This sign-in link expired. Sign in again.' })

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  }
})
