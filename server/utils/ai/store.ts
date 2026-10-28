import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { webRuntimeConfig, webBindings } from '../web-config'
import { BuiltinAiError, type BuiltinUsage } from '../../../src/composables/ai/builtin/types'
import { gatewayConfig, gatewayUnavailable, type Candidate } from './config'

export type GatewayStore = { call(action: string, args?: Record<string, unknown>): Promise<any> }
export function accountingError(code: string): never {
  const errors: Record<string, [number,string,number]> = {
    monthly_limit: [429,'Your 65 built-in AI actions have been used for this month. Wait for the reset or switch to your own keys in Settings.',0],
    concurrent: [429,'An AI action is already running on your account. Wait for it to finish.',5],
    throttled: [429,'Built-in AI is busy. Wait a minute before requesting another action.',60],
    duplicate: [409,'This AI request was already submitted. Check its status before trying again.',0],
    not_found: [404,'AI request not found.',0],
    not_pending: [409,'This AI request is no longer active.',0],
  }
  const entry = errors[code]
  if (!entry) gatewayUnavailable()
  console.info(JSON.stringify({event:'ai_admission_refused',code}))
  throw new BuiltinAiError(code,entry[1],entry[0],entry[2])
}
export async function gatewayContext(event: H3Event, owner: string) {
  const runtime = webRuntimeConfig(event)
  const env: Record<string, any> = webBindings(event) || process.env
  const config = gatewayConfig(env,owner)
  if (!config.enabled) throw new BuiltinAiError('not_enabled', 'Built-in AI has not been enabled for this account. Use your own API keys in Configure AI while the service is being set up.', 503)
  if (!config.candidates.length) throw new BuiltinAiError('capacity_unconfigured', 'Built-in AI has no verified provider capacity configured. The service administrator must finish setup; adding API keys alone does not enable it.', 503)
  const secret = env.SUPABASE_SERVICE_ROLE_KEY
  if (!runtime.supabaseUrl || !secret) throw new BuiltinAiError('configuration', 'Built-in AI accounting has not been configured on this server. Use your own API keys in Configure AI while setup is completed.', 503)
  const client = createClient(runtime.supabaseUrl,secret,{ global: { fetch: (input,init) => fetch(input,{...init,signal:AbortSignal.any([...(init?.signal?[init.signal]:[]),AbortSignal.timeout(10_000)])}) }, auth: { persistSession:false, autoRefreshToken:false, detectSessionInUrl:false } })
  const store: GatewayStore = { async call(action,args={}) {
    const { data,error } = await client.rpc('tracer_ai_gateway',{ p_action:action,p_args:{ ...args,owner } })
    if (error || !data) {
      // SQLSTATE identifies compatibility/permission failures without logging
      // provider credentials, prompt data or PostgreSQL error details.
      const code=error?.code && /^[a-z0-9_]+$/i.test(error.code) ? error.code : 'empty_result'
      console.error(JSON.stringify({event:'ai_accounting_failed',operation:action,code}))
      gatewayUnavailable()
    }
    if (data.error) accountingError(data.error)
    return data
  } }
  // Only non-secret capacity metadata enters PostgreSQL.
  // A disabled preview sharing a database must not clear an active deployment's capacity.
  if (env.BUILTIN_AI_ENABLED === '1') await store.call('sync',{ candidates: config.candidates.map(({key,...metadata})=>metadata) })
  return { ...config,store,env }
}
export async function usage(store: GatewayStore, enabled: boolean): Promise<BuiltinUsage> {
  const result = await store.call('usage')
  return { ...result,available:enabled && result.available }
}
