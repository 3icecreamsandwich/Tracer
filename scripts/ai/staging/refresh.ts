import {verifiedFeatureExpiry} from './feature-proof'
import{createClient}from'@supabase/supabase-js'
import{readFile,writeFile}from'node:fs/promises'
const path='/tmp/tracer-ai-staging/session.json',s=JSON.parse(await readFile(path,'utf8'))
if(s.project!=='incejztkdiregaaxltiv'||process.env.NUXT_SUPABASE_URL!==s.url)throw new Error('Staging only')
const admin=createClient(s.url,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}})
for(const a of s.accounts){
 const {data,error}=await admin.auth.admin.getUserById(a.user.id)
 if(error||!data.user?.app_metadata.tracer_ai_staging_smoke)throw new Error('Only synthetic staging fixtures may be updated')
 if(!data.user.user_metadata.full_name){
  const updated=await admin.auth.admin.updateUserById(a.user.id,{user_metadata:{...data.user.user_metadata,full_name:'AI Staging Test'}})
  if(updated.error)throw new Error('Fixture profile update failed')
  a.user=updated.data.user
 }else a.user=data.user
}
if(process.argv.includes('--capacity')) {
 const key=process.env.OPENROUTER_KEY_0
 if(!key)throw new Error('OpenRouter key required')
 const headers={Authorization:`Bearer ${key}`}
 const [quotaResponse,modelsResponse]=await Promise.all([fetch('https://openrouter.ai/api/v1/key',{headers,redirect:'error',signal:AbortSignal.timeout(15000)}),fetch('https://openrouter.ai/api/v1/models',{headers,redirect:'error',signal:AbortSignal.timeout(15000)})])
 if(!quotaResponse.ok||!modelsResponse.ok)throw new Error('Free capacity verification failed')
 const {data:quota}=await quotaResponse.json() as any,{data:models}=await modelsResponse.json() as any
 const pinned=models.find((m:any)=>m.id==='nvidia/nemotron-3.5-lightning:free')
 if(!pinned||Number(pinned.pricing.prompt)!==0||Number(pinned.pricing.completion)!==0||Number(pinned.pricing.request||0)!==0||pinned.context_length<65536||quota.free_model_daily_requests?.remaining<12)throw new Error('Free generative capacity unavailable')
 s.capacity=[{provider:'openrouter',keyIds:['OPENROUTER_KEY_0'],model:pinned.id,freeVerified:true,verifiedUntil:verifiedFeatureExpiry(pinned.id),rpm:10,rpd:Math.min(30,quota.free_model_daily_requests.remaining),tpm:65536,tpd:262144,concurrency:2,context:65536}]
 console.log(JSON.stringify({verifiedGenerativeModel:pinned.id,freeRequestsRemaining:quota.free_model_daily_requests.remaining}))
}
if(process.argv.includes('--sessions')) {
 for(let index=0;index<s.accounts.length;index++) {
  const client=createClient(s.url,s.publishable,{auth:{persistSession:false,autoRefreshToken:false}})
  const {data,error}=await client.auth.refreshSession({refresh_token:s.accounts[index].refresh_token})
  if(error||!data.session||data.session.user.id!==s.accounts[index].user.id)throw new Error('Staging session refresh failed')
  s.accounts[index]=data.session
 }
 console.log(JSON.stringify({stagingSessionsRefreshed:s.accounts.length}))
}
await writeFile(path,JSON.stringify(s),{mode:0o600})
console.log(JSON.stringify({stagingFixtureProfilesReady:s.accounts.length}))
