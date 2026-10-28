// Explicit live inference diagnostics. Uses tiny synthetic prompts and logs only
// status, answer length, and error names; never credentials, prompts, or answers.
import { streamText,wrapLanguageModel } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOllama } from 'ollama-ai-provider-v2'
import { createRoutedModel } from '../../src/composables/ai/registry/route'
import { checkedAiText } from '../../src/composables/ai/stream'
import { checkedOllamaResponse } from '../../src/composables/ai/registry/ollama-stream'
import { providerModel } from '../../server/utils/ai/providers'
const env={...process.env}
const ollama=()=>wrapLanguageModel({model:createOllama({baseURL:'https://ollama.com/api',headers:{Authorization:`Bearer ${env.OLLAMA_CLOUD_KEY_0}`},fetch:async(input,init)=>checkedOllamaResponse(await fetch(input,init))})('gpt-oss:20b'),middleware:[]})
const selected=process.argv.slice(2)
const probes=[
 {id:'byok-fallback',route:['google','ollama'],resolve:async(id:string)=>id==='ollama'?ollama():wrapLanguageModel({model:createGoogleGenerativeAI({apiKey:env.GEMINI_KEY_0})('gemini-3.7-flash'),middleware:[]})},
 ...[['groq','GROQ_KEY_0','openai/gpt-oss-20b'],['ollama','OLLAMA_CLOUD_KEY_0','nemotron-3-nano:30b-cloud'],['openrouter','OPENROUTER_KEY_0','nvidia/nemotron-3.5-lightning:free'],['google','GEMINI_KEY_0','gemma-4-26b-a4b-it']].map(([provider,keyId,model])=>({id:`builtin-${provider}`,route:[provider!],resolve:async()=>providerModel({provider,model,key:env[keyId!]} as any,env,{})})),
]
for(const probe of probes.filter(p=>selected.includes(p.id))) {
 let chars=0;const attempts:string[]=[];const started=Date.now()
 try {
  const model=createRoutedModel(probe.route,async id=>{attempts.push(id);return probe.resolve(id)},{totalMs:35_000,firstTextMs:8_000,idleMs:8_000})
  const result=streamText({model,messages:[{role:'user',content:'Reply with OK.'}],maxOutputTokens:256,maxRetries:0,onError:()=>{}})
  for await(const chunk of checkedAiText(result.fullStream))chars+=chunk.length
  console.log(JSON.stringify({probe:probe.id,success:true,chars,attempts,durationMs:Date.now()-started}))
 } catch(error) {console.log(JSON.stringify({probe:probe.id,success:false,chars,attempts,errorName:(error as Error).name,durationMs:Date.now()-started}))}
}
if(!selected.length)console.log('Specify probes: byok-fallback builtin-groq builtin-ollama builtin-openrouter builtin-google')
