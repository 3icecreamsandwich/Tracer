import { readWebJson } from '../../utils/web-body'
import { authenticatedWebClient } from '../../utils/web-auth'

export default defineEventHandler(async (event) => {
  const client = await authenticatedWebClient(event)
  const body = await readWebJson(event, 64 * 1024)
  const ids = ['openai', 'anthropic', 'gemini', 'ollama_cloud', 'openai_compat']
  if (body?.deleteId) {
    if (!ids.includes(body.deleteId)) throw createError({ statusCode: 400, statusMessage: 'Unknown provider.' })
    const { error } = await client.rpc('delete_tracer_user_api_key', { requested_provider_id: body.deleteId })
    if (error) throw createError({ statusCode: 502, statusMessage: 'Could not remove provider key.' })
    return { savedApiKeyIds: [] }
  }
  const keys: Record<string, string> = {}
  for (const id of ids) {
    const value = body?.apiKeys?.[id]
    if (value !== undefined && (typeof value !== 'string' || value.length > 8192)) throw createError({ statusCode: 400, statusMessage: 'Invalid provider key.' })
    if (value?.trim()) keys[id] = value.trim()
  }
  if (!Object.keys(keys).length) throw createError({ statusCode: 400, statusMessage: 'Enter a provider key.' })
  const { error } = await client.rpc('save_tracer_user_api_keys', { requested_keys: keys })
  if (error) throw createError({ statusCode: 502, statusMessage: 'Could not save provider keys.' })
  return { savedApiKeyIds: Object.keys(keys), savedOpenAiCompatConfig: false }
})
