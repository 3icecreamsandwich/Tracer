import { readWebProviderKeys } from '../../utils/web-auth'

export default defineEventHandler(async (event) => {
  const keys = await readWebProviderKeys(event)
  return Object.fromEntries(['openai', 'anthropic', 'gemini', 'ollama_cloud', 'openai_compat'].map(id => [id, Boolean(keys[id])]))
})
