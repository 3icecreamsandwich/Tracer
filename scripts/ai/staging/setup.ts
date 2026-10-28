import {verifiedFeatureExpiry} from './feature-proof'
// Explicit staging setup. No production project, keys, prompts or answers are logged.
import {createClient} from '@supabase/supabase-js'
import {mkdir,writeFile,chmod} from 'node:fs/promises'
const project='incejztkdiregaaxltiv',url=`https://${project}.supabase.co`
if(process.env.NUXT_SUPABASE_URL!==url)throw new Error('Only tracer-ai-test is allowed')
const secret=process.env.SUPABASE_SERVICE_ROLE_KEY,publishable=process.env.NUXT_SUPABASE_PUBLISHABLE_KEY
if(!secret||!publishable)throw new Error('Add the staging server key to .env.ai-staging.local')
const admin=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}})
const maintenance=await admin.rpc('tracer_ai_gateway',{p_action:'maintenance',p_args:{}})
if(maintenance.error)throw new Error(`Staging server credential validation failed (${maintenance.error.code})`)
const anon=createClient(url,publishable,{auth:{persistSession:false,autoRefreshToken:false}})
const denied=await anon.rpc('tracer_ai_gateway',{p_action:'maintenance',p_args:{}})
if(!denied.error)throw new Error('Accounting unexpectedly permits anonymous calls')
const providerKey=process.env.OPENROUTER_KEY_0
if(!providerKey)throw new Error('OPENROUTER_KEY_0 is required for the free-only staging probe')
const quotaResponse=await fetch('https://openrouter.ai/api/v1/key',{headers:{Authorization:`Bearer ${providerKey}`},redirect:'error',signal:AbortSignal.timeout(15000)})
if(!quotaResponse.ok)throw new Error(`Free quota could not be verified (${quotaResponse.status})`)
const {data:quota}=await quotaResponse.json() as any
if(!quota.free_model_daily_requests || quota.free_model_daily_requests.remaining<12)throw new Error('At least 12 verified free requests are required; no top-up will be attempted')
const inventoryResponse=await fetch('https://openrouter.ai/api/v1/models',{headers:{Authorization:`Bearer ${providerKey}`},redirect:'error',signal:AbortSignal.timeout(15000)})
if(!inventoryResponse.ok)throw new Error('Free generative model inventory unavailable')
const inventory=await inventoryResponse.json() as any
const pinned=inventory.data?.find((m:any)=>m.id==='nvidia/nemotron-3.5-lightning:free')
if(!pinned||Number(pinned.pricing?.prompt)!==0||Number(pinned.pricing?.completion)!==0||Number(pinned.pricing?.request||0)!==0||pinned.context_length<65536)throw new Error('The pinned generative model is not verified free/available')
const verifiedUntil=verifiedFeatureExpiry('nvidia/nemotron-3.5-lightning:free')
const accounts=[]
for(let i=0;i<2;i++) {
 const password=crypto.randomUUID()+crypto.randomUUID()
 const email=`ai-smoke-${crypto.randomUUID()}@tracer-ai-test.invalid`
 const {data,error}=await admin.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name:'AI Staging Test'},app_metadata:{tracer_ai_staging_smoke:true}})
 if(error||!data.user)throw new Error(`Staging test account creation failed (${error?.status})`)
 const {data:login,error:loginError}=await anon.auth.signInWithPassword({email,password})
 if(loginError||!login.session)throw new Error(`Staging test sign-in failed (${loginError?.status})`)
 accounts.push(login.session)
}
const capacity=[{provider:'openrouter',keyIds:['OPENROUTER_KEY_0'],model:'nvidia/nemotron-3.5-lightning:free',freeVerified:true,verifiedUntil,rpm:10,rpd:Math.min(30,quota.free_model_daily_requests.remaining),tpm:65536,tpd:262144,concurrency:2,context:65536}]
await mkdir('/tmp/tracer-ai-staging',{recursive:true,mode:0o700})
await chmod('/tmp/tracer-ai-staging',0o700)
await writeFile('/tmp/tracer-ai-staging/session.json',JSON.stringify({project,url,publishable,accounts,capacity}),{mode:0o600})
console.log(JSON.stringify({project,serverCredentialValid:true,anonymousMutationDenied:true,testAccounts:accounts.length,verifiedFreeRequests:quota.free_model_daily_requests.remaining,enabledProvider:'nvidia/nemotron-3.5-lightning:free',sessionFile:'/tmp/tracer-ai-staging/session.json'}))
