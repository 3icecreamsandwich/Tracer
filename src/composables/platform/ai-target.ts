export type WebAiTarget = { provider: string; url: URL; oauth?: boolean }

/** A closed allowlist: this endpoint must never become an arbitrary URL proxy. */
export function resolveWebAiTarget(raw: string, method: string, compatibleOrigin = ''): WebAiTarget | null {
  let url: URL
  try { url = new URL(raw) } catch { return null }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash) return null
  const path = url.pathname
  if (url.hostname === 'api.openai.com' && method === 'POST' && ['/v1/responses', '/v1/chat/completions'].includes(path)) return { provider: 'openai', url }
  if (url.hostname === 'api.anthropic.com' && method === 'POST' && path === '/v1/messages') return { provider: 'anthropic', url }
  if (url.hostname === 'generativelanguage.googleapis.com' && method === 'POST' && /^\/v1beta\/models\/[a-zA-Z0-9._-]+:(streamGenerateContent|generateContent)$/.test(path)) return { provider: 'gemini', url }
  if (url.hostname === 'ollama.com' && ((method === 'POST' && ['/api/chat', '/api/generate'].includes(path)) || (method === 'GET' && path === '/api/tags'))) return { provider: 'ollama_cloud', url }
  if (url.hostname === 'models.github.ai' && ((method === 'GET' && path === '/catalog/models') || (method === 'POST' && path === '/inference/chat/completions'))) return { provider: 'github', url }
  if (url.hostname === 'github.com' && method === 'POST' && ['/login/device/code', '/login/oauth/access_token'].includes(path)) return { provider: 'github', url, oauth: true }
  if (compatibleOrigin && url.origin === compatibleOrigin && method === 'POST' && /^\/(?:v1\/)?chat\/completions$/.test(path)) return { provider: 'openai_compat', url }
  return null
}
