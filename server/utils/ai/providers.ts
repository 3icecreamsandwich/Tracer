import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { createOllama } from 'ollama-ai-provider-v2'
import { checkedOllamaResponse } from '../../../src/composables/ai/registry/ollama-stream'
import { cloudflareModel } from './workers-ai'
import { wrapLanguageModel } from 'ai'
import type { Candidate } from './config'

export type ProviderObservations = { status?: number; retryAfter?: number; remainingDayRequests?: number; remainingMinuteTokens?: number }
export function providerModel(candidate: Candidate, env: Record<string,any>, observation: ProviderObservations) {
  const urls: Record<string,string> = { groq:'https://api.groq.com/openai/v1',openrouter:'https://openrouter.ai/api/v1' }
  const fetchUpstream: typeof fetch = async (input,init) => {
    const url = new URL(input instanceof Request ? input.url : String(input))
    const origins = ['https://api.groq.com','https://openrouter.ai','https://generativelanguage.googleapis.com','https://ollama.com']
    if (!origins.includes(url.origin)) throw new Error('Unsupported provider destination')
    // Keep the small grading/output budgets available for the answer. Shared
    // OpenRouter candidates are pinned generative models, not random routers.
    const body=candidate.provider==='openrouter' && typeof init?.body==='string'
      ? JSON.stringify({...JSON.parse(init.body),reasoning:{enabled:false}}) : init?.body
    const response = await fetch(input,{ ...init,body,redirect:'manual' })
    observation.status=response.status
    if(candidate.provider==='groq') {
      const remainingRequests=response.headers.get('x-ratelimit-remaining-requests')
      const remainingTokens=response.headers.get('x-ratelimit-remaining-tokens')
      if(remainingRequests && /^\d+$/.test(remainingRequests)) observation.remainingDayRequests=Number(remainingRequests)
      if(remainingTokens && /^\d+$/.test(remainingTokens)) observation.remainingMinuteTokens=Number(remainingTokens)
    }
    const value=response.headers.get('retry-after')
    if(value) observation.retryAfter=/^\d+$/.test(value) ? Number(value) : Math.max(0,Math.ceil((Date.parse(value)-Date.now())/1000))
    return candidate.provider==='ollama'?checkedOllamaResponse(response):response
  }
  if (candidate.provider==='cloudflare') return cloudflareModel(candidate.model,env.AI)
  const model=candidate.provider==='google'
    ? createGoogleGenerativeAI({apiKey:candidate.key,fetch:fetchUpstream})(candidate.model)
    : candidate.provider==='ollama'
      ? createOllama({baseURL:'https://ollama.com/api',headers:{Authorization:`Bearer ${candidate.key}`},fetch:fetchUpstream})(candidate.model.replace(/-cloud$/, ''))
      : createOpenAICompatible({name:candidate.provider,baseURL:urls[candidate.provider]!,apiKey:candidate.key,fetch:fetchUpstream}).chatModel(candidate.model)
  return wrapLanguageModel({model,middleware:[]})
}
