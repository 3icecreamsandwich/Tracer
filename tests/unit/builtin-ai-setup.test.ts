import {expect,it,vi} from 'vitest'
import {gatewayContext} from '../../server/utils/ai/store'
vi.stubGlobal('useRuntimeConfig',()=>({}))
const capacity=JSON.stringify([{provider:'groq',freeVerified:true,verifiedUntil:'2099-01-01',rpm:10,rpd:100,tpm:100000,tpd:100000,context:100000,concurrency:1}])
const event=(env:Record<string,string>)=>({context:{cloudflare:{env}}}) as any
it('identifies incomplete activation instead of calling it a broken key',async()=>{
 await expect(gatewayContext(event({GROQ_KEY_0:'test-key'}),'owner')).rejects.toMatchObject({code:'not_enabled'})
})
it('identifies missing verified capacity without bypassing admission',async()=>{
 await expect(gatewayContext(event({BUILTIN_AI_ENABLED:'1',BUILTIN_AI_COHORT:'owner',GROQ_KEY_0:'test-key'}),'owner')).rejects.toMatchObject({code:'capacity_unconfigured'})
})
it('identifies missing server accounting credentials without contacting a provider',async()=>{
 await expect(gatewayContext(event({BUILTIN_AI_ENABLED:'1',BUILTIN_AI_COHORT:'owner',GROQ_KEY_0:'test-key',BUILTIN_AI_CAPACITY:capacity}),'owner')).rejects.toMatchObject({code:'configuration'})
})
