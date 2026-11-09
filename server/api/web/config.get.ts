import { webRuntimeConfig } from '../../utils/web-config'

export default defineEventHandler((event) => {
  const config = webRuntimeConfig(event)
  const url = String(config.supabaseUrl ?? '').trim()
  const publishableKey = String(config.supabasePublishableKey ?? '').trim()
  let unsafeKey = publishableKey.startsWith('sb_secret_')
  if (publishableKey.split('.').length === 3) {
    try { unsafeKey ||= JSON.parse(atob(publishableKey.split('.')[1]!.replace(/-/g, '+').replace(/_/g, '/'))).role === 'service_role' } catch { unsafeKey = true }
  }
  if (!url || !publishableKey || unsafeKey) {
    throw createError({ statusCode: 503, statusMessage: 'Account service is not configured' })
  }
  setHeader(event, 'Cache-Control', 'no-store')
  return { url, publishableKey }
})
