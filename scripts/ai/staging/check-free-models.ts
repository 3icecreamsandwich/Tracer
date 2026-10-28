const key=process.env.OPENROUTER_KEY_0
if(!key)throw new Error('OpenRouter key required')
const response=await fetch('https://openrouter.ai/api/v1/models',{headers:{Authorization:`Bearer ${key}`},redirect:'error',signal:AbortSignal.timeout(15000)})
if(!response.ok)throw new Error(`Inventory unavailable (${response.status})`)
const {data}=await response.json() as any
console.log(JSON.stringify(data.filter((m:any)=>m.id.endsWith(':free')&&Number(m.pricing.prompt)===0&&Number(m.pricing.completion)===0).map((m:any)=>({id:m.id,context:m.context_length,instruct:m.architecture?.instruct_type}))))
