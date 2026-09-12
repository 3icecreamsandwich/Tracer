import type { H3Event } from 'h3'

export function webBindings(event: H3Event): Cloudflare.Env | undefined {
  return event.context.cloudflare?.env
}

/** Resolve per-request bindings; do not depend on a process-global env snapshot. */
export function webRuntimeConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const env = webBindings(event)
  return {
    supabaseUrl: env?.NUXT_SUPABASE_URL ?? config.supabaseUrl,
    supabasePublishableKey: env?.NUXT_SUPABASE_PUBLISHABLE_KEY ?? config.supabasePublishableKey,
    githubOauthClientId: env?.NUXT_GITHUB_OAUTH_CLIENT_ID ?? config.githubOauthClientId,
    webAiCompatibleOrigin: env?.NUXT_WEB_AI_COMPATIBLE_ORIGIN ?? config.webAiCompatibleOrigin,
  }
}
