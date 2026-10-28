// Local-only integration harness: real production Nitro gateway + real SQL,
// deterministic provider transport and Supabase auth. Never deploy this file.
import { PGlite } from '@electric-sql/pglite'
import { readFile } from 'node:fs/promises'
const owner='00000000-0000-4000-8000-000000000001'
const db=new PGlite()
await db.exec(`create schema auth; create table auth.users(id uuid primary key); create role anon; create role authenticated; create role service_role; insert into auth.users values('${owner}');`)
await db.exec(await readFile(new URL('../../../supabase/migrations/20261027040922_builtin_ai_gateway.sql',import.meta.url),'utf8'))
await db.exec(await readFile(new URL('../../../supabase/migrations/20261028041453_builtin_ai_safe_capacity_sync.sql',import.meta.url),'utf8'))
let scenario='recover'
const guide='```study_guide_md\n# Water\nWater is H2O.\n```\n\n```flashcards_tsv\nWater\tH2O\n```'
function answer(body:any) {
 const prompt=JSON.stringify(body.messages||body.contents||'')
 if(prompt.includes('Grade the student answer'))return 'Yes:Correct.'
 if(prompt.includes('Tracer Fact Check'))return 'No corrections suggested.'
 if(prompt.includes('study_guide_md'))return guide
 if(prompt.includes('extra study questions'))return JSON.stringify({questions:[{kind:'true_false',term:'Water',definition:'H2O',answer:true}]})
 if(prompt.includes('Synthesize flashcards'))return 'Water\tH2O'
 return scenario==='empty'?'':'Water is H2O.'
}
const nativeFetch=globalThis.fetch
// Only fixture-owned fake credentials may reach these deterministic transports.
globalThis.fetch=(async(input:any,init?:RequestInit)=>{
 const url=new URL(input instanceof Request?input.url:String(input))
 if(['api.groq.com','ollama.com'].includes(url.hostname)) {
  const headers=new Headers(init?.headers)
  if(!headers.get('authorization')?.includes('fixture-')) throw new Error('Only fixture credentials are allowed')
  const body=JSON.parse(String(init?.body||'{}'))
  if(url.hostname==='api.groq.com' && ['recover','partial'].includes(scenario))return Response.json({error:{message:'exhausted'}},{status:429,headers:{'retry-after':'60'}})
  const text=answer(body)
  if(url.hostname==='ollama.com') {
   const chunk={model:'nemotron-3-nano:30b',created_at:'2026-01-01T00:00:00Z',message:{role:'assistant',content:text},done:scenario!=='partial',done_reason:'stop',prompt_eval_count:1,eval_count:2}
   return body.stream?new Response(JSON.stringify(chunk)+'\n'+(scenario==='partial'?JSON.stringify({error:'interrupted'})+'\n':''),{headers:{'content-type':'application/json'}}):Response.json(chunk)
  }
  if(!body.stream)return Response.json({id:'fixture',created:0,model:body.model,choices:[{index:0,message:{role:'assistant',content:text},finish_reason:'stop'}]})
  return new Response(`data: ${JSON.stringify({id:'fixture',created:0,model:body.model,choices:[{index:0,delta:{content:text},finish_reason:null}]})}\n\ndata: ${JSON.stringify({id:'fixture',created:0,model:body.model,choices:[{index:0,delta:{},finish_reason:'stop'}]})}\n\ndata: [DONE]\n\n`,{headers:{'content-type':'text/event-stream'}})
 }
 return nativeFetch(input,init)
}) as typeof fetch
const fixtureServer=Bun.serve({hostname:'127.0.0.1',port:3203,async fetch(request){
 const url=new URL(request.url)
 if(url.pathname==='/fixture') {
  scenario=url.searchParams.get('scenario')||'recover'
  if(url.searchParams.has('reset'))await db.exec('truncate ai_private.requests,ai_private.months,ai_private.groups,ai_private.keys,ai_private.sessions; update ai_private.state set pressure=false,recovery_at=null;')
  if(scenario==='quota')await db.exec(`insert into ai_private.months(owner,month,used)values('${owner}',date_trunc('month',now())::date,65)on conflict(owner,month)do update set used=65;`)
  return Response.json({scenario})
 }
 if(url.pathname==='/auth/v1/user' && request.headers.get('authorization')==='Bearer fixture-token')return Response.json({id:owner,email:'fixture@example.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{}})
 if(url.pathname==='/rest/v1/rpc/tracer_ai_gateway' && request.headers.get('apikey')==='fixture-service-role') {
  const body=await request.json() as any
  try {const result=await db.query<{data:any}>('select public.tracer_ai_gateway($1,$2::jsonb) as data',[body.p_action,JSON.stringify(body.p_args)]);return Response.json(result.rows[0]!.data)}
  catch {return Response.json({message:'Fixture database call failed'},{status:500})}
 }
 return Response.json({message:'Not found'},{status:404})
}})
process.env.NUXT_SUPABASE_URL='http://127.0.0.1:3203'
process.env.NUXT_SUPABASE_PUBLISHABLE_KEY='fixture-publishable'
process.env.SUPABASE_SERVICE_ROLE_KEY='fixture-service-role'
process.env.BUILTIN_AI_ENABLED='1';process.env.BUILTIN_AI_COHORT=owner
for(const key of Object.keys(process.env))if(/^(GROQ_KEY_|OLLAMA_CLOUD_KEY_|OPENROUTER_KEY_|GEMINI_KEY_|CLOUDFLARE_WORKERS_KEY_)/.test(key))delete process.env[key]
process.env.GROQ_KEY_0='fixture-groq';process.env.OLLAMA_CLOUD_KEY_0='fixture-ollama'
process.env.BUILTIN_AI_CAPACITY=JSON.stringify(['groq','ollama'].map(provider=>({provider,freeVerified:true,verifiedUntil:'2099-01-01T00:00:00Z',rpm:1000,rpd:10000,tpm:1000000,tpd:10000000,context:100000,concurrency:10})))
await import('../../../.output/server/index.mjs')
console.log('Local built-in AI integration gateway ready; no live provider calls.')
