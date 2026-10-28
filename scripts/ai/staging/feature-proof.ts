import{readFileSync}from'node:fs'
export function verifiedFeatureExpiry(model:string):string {
 const proof=JSON.parse(readFileSync('/tmp/tracer-ai-staging/model-contracts.json','utf8'))
 const until=Date.parse(proof.verifiedAt)+24*3600_000
 const operations=new Set(proof.results?.filter((v:any)=>v.success===true).map((v:any)=>v.operation))
 if(proof.model!==model||!Number.isFinite(until)||until<=Date.now()||!['chat','fact-check','generate','grade'].every(op=>operations.has(op)))throw new Error('Run the live staging feature-contract checks before attesting this model')
 return new Date(until).toISOString()
}
