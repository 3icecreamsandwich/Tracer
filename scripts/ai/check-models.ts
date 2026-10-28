// Read-only provider inventory. This command never sends prompts or prints keys.
import { gatewayConfig } from '../../server/utils/ai/config'
const env={...process.env}
const listing:[string,string,string][]=[
 ['groq','GROQ_KEY_0','https://api.groq.com/openai/v1/models'],
 ['ollama','OLLAMA_CLOUD_KEY_0','https://ollama.com/api/tags'],
 ['openrouter','OPENROUTER_KEY_0','https://openrouter.ai/api/v1/models'],
 ['google','GEMINI_KEY_0','https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000'],
]
for(const [provider,keyId,url] of listing) {
 const key=env[keyId]
 if(!key){console.log(JSON.stringify({provider,status:'missing-credential'}));continue}
 try {
  const headers=provider==='google'?{'x-goog-api-key':key}:{Authorization:`Bearer ${key}`}
  const response=await fetch(url,{headers,redirect:'error',signal:AbortSignal.timeout(15_000)})
  if(!response.ok){console.log(JSON.stringify({provider,status:response.status}));continue}
  const result=await response.json() as any
  const names=(result.data||result.models||[]).map((m:any)=>m.id||m.name).filter((s:unknown)=>typeof s==='string')
  const expected:Record<string,string[]>={groq:['openai/gpt-oss-20b'],ollama:['nemotron-3-nano:30b'],openrouter:['nvidia/nemotron-3.5-lightning:free'],google:['models/gemma-3n-e4b-it','models/gemma-4-26b-a4b-it']}
  console.log(JSON.stringify({provider,status:'inventory-only',candidates:expected[provider]!.map(model=>({model,listed:names.includes(model)}))}))
 } catch {console.log(JSON.stringify({provider,status:'unreachable'}))}
}
const config=gatewayConfig(env,'inventory')
console.log(JSON.stringify({enabled:config.enabled,verifiedCandidates:config.candidates.map(({id,provider,model,group})=>({id,provider,model,group}))}))
console.log('Inventory does not verify free capacity. Complete staging feature probes and free-quota verification before enabling a capacity manifest.')
