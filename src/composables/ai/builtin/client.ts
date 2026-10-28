import { readBuiltinEvents } from './events'
import { getSupabaseClient } from '../../auth/client'
import { hasTauriRuntime } from '../../tauri'
import { appUrl } from '../../platform/web'
import { BuiltinAiError,type BuiltinInput,type BuiltinUsage,type BuiltinEvent } from './types'

export function builtinUrl(path:string):string {
  if(!hasTauriRuntime()) return appUrl(`api/ai/${path}`)
  const base=import.meta.env.VITE_TRACER_AI_GATEWAY_URL || 'https://app.tracerquiz.com'
  const url=new URL(base)
  if(url.protocol!=='https:' && !(import.meta.env.DEV && ['127.0.0.1','localhost'].includes(url.hostname))) throw new BuiltinAiError('configuration','The AI gateway must use HTTPS.')
  return `${url.href.replace(/\/$/,'')}/api/ai/${path}`
}
export async function builtinFetch(path:string,init:RequestInit={}):Promise<Response> {
  const {data,error}=await getSupabaseClient().auth.getSession()
  if(error||!data.session) throw new BuiltinAiError('sign_in_required','Sign in to Tracer to use built-in AI.',401)
  const headers=new Headers(init.headers); headers.set('Authorization',`Bearer ${data.session.access_token}`)
  const fetcher=hasTauriRuntime()?(await import('@tauri-apps/plugin-http')).fetch:fetch
  const response=await fetcher(builtinUrl(path),{...init,headers})
  if(!response.ok) {
    const body=await response.json().catch(()=>null)
    throw new BuiltinAiError(body?.data?.code || 'unavailable',body?.data?.message || body?.statusMessage || 'Built-in AI is temporarily unavailable.',response.status,Number(response.headers.get('retry-after'))||0)
  }
  return response
}
export async function builtinUsage():Promise<BuiltinUsage> { return (await builtinFetch('usage')).json() }
export async function builtinRequestStatus(id:string) { return (await builtinFetch(`requests/${encodeURIComponent(id)}`)).json() }

const featureSessionId=crypto.randomUUID()
export async function* builtinText(input:BuiltinInput,signal?:AbortSignal,sessionId=featureSessionId):AsyncGenerator<string> {
  const requestId=crypto.randomUUID()
  let delivered=false
  try {
    const response=await builtinFetch('requests',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...input,requestId,sessionId}),signal})
    if (!response.headers.get('content-type')?.includes('text/event-stream')) throw new BuiltinAiError('configuration','The AI gateway returned an unexpected response. Check that the built-in AI server is deployed at the configured gateway URL.',502)
    for await(const event of readBuiltinEvents(response,signal)) {
      if(event.type==='delta'||event.type==='result') {delivered=true;yield event.text}
      if(event.type==='done' && typeof window!=='undefined') window.dispatchEvent(new Event('tracer:ai-usage'))
    }
  } catch(error) {
    // Recover an already completed answer instead of issuing a second action.
    // Never splice recovery output into a partially delivered response.
    if(!delivered && !signal?.aborted && (!(error instanceof BuiltinAiError) || error.code==='interrupted')) {
      const recovered=await builtinRequestStatus(requestId).catch(()=>null)
      if(recovered?.status==='complete' && typeof recovered.text==='string') {yield recovered.text;return}
    }
    if(error instanceof Error) Object.assign(error,{requestId})
    throw error
  }
}
export async function builtinGenerate(input:BuiltinInput,signal?:AbortSignal):Promise<string> {
  let text=''; for await(const chunk of builtinText(input,signal)) text+=chunk
  return text
}
