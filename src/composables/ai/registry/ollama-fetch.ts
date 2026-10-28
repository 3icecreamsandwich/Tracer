import { aiHttpFetch } from '../http'
import { checkedOllamaResponse } from './ollama-stream'
export const ollamaFetch: typeof fetch = async (input, init) => checkedOllamaResponse(await aiHttpFetch(input, init))
