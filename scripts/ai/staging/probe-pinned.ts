// Tiny direct diagnostics; only explicitly free generative candidates.
const key=process.env.OPENROUTER_KEY_0
if(!key)throw new Error('Key required')
for(const model of ['nvidia/nemotron-3.5-lightning:free','recursive/flint-v1.0:free','google/gemma-4-31b-it:free']) {
 try {
 const response=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model,messages:[{role:'user',content:'What is the formula of water? Reply briefly.'}],max_tokens:128,reasoning:{enabled:false},stream:false}),signal:AbortSignal.timeout(30000),redirect:'error'})
 const body=await response.json() as any,text=body.choices?.[0]?.message?.content||''
 console.log(JSON.stringify({candidate:model,status:response.status,model:body.model,answerCorrect:/H.?[2₂].?O/i.test(text),textCharacters:text.length,reasoningTokens:body.usage?.completion_tokens_details?.reasoning_tokens,errorCode:body.error?.code,provider:body.error?.metadata?.provider_name}))
 }catch{console.log(JSON.stringify({candidate:model,status:'unavailable'}))}
}
