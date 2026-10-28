import {verifiedFeatureExpiry} from './feature-proof'
import{spawnSync}from'node:child_process'
import{readFileSync,writeFileSync}from'node:fs'
const s=JSON.parse(readFileSync('/tmp/tracer-ai-staging/session.json','utf8'))
const c=JSON.parse(readFileSync('.wrangler/ai-staging.json','utf8'))
if(s.project!=='incejztkdiregaaxltiv'||process.env.NUXT_SUPABASE_URL!==s.url||c.name!=='tracer-ai-test'||c.vars.NUXT_SUPABASE_URL!==s.url||c.routes)throw new Error('Only isolated staging deployment is allowed')
if(s.capacity.some((v:any)=>v.provider!=='openrouter'||v.model!=='nvidia/nemotron-3.5-lightning:free'||Date.parse(v.verifiedUntil)<=Date.now()))throw new Error('Verified free-only staging capacity required')
verifiedFeatureExpiry('nvidia/nemotron-3.5-lightning:free')
if(!process.env.SUPABASE_SERVICE_ROLE_KEY||!process.env.OPENROUTER_KEY_0)throw new Error('Staging server credentials missing')
function run(args:string[],input?:string){const result=spawnSync('bun',['x','wrangler',...args],{input,encoding:'utf8',maxBuffer:4*1024*1024,timeout:180000});const safe=(result.stdout+'\n'+result.stderr).replaceAll(process.env.SUPABASE_SERVICE_ROLE_KEY!,'[redacted]').replaceAll(process.env.OPENROUTER_KEY_0!,'[redacted]');writeFileSync('/tmp/tracer-ai-staging/wrangler-'+args[0]+'.log',safe,{mode:0o600});if(result.status!==0||!result.stdout.trim()){console.error('Staging Wrangler command failed. Inspect its private log in /tmp/tracer-ai-staging.');process.exit(1)}return result.stdout}
// The first published version remains disabled until server secrets exist.
run(['deploy','--config','.wrangler/ai-staging.json'])
run(['secret','bulk','--config','.wrangler/ai-staging.json'],JSON.stringify({SUPABASE_SERVICE_ROLE_KEY:process.env.SUPABASE_SERVICE_ROLE_KEY,OPENROUTER_KEY_0:process.env.OPENROUTER_KEY_0,BUILTIN_AI_COHORT:s.accounts.map((a:any)=>a.user.id).join(','),BUILTIN_AI_CAPACITY:JSON.stringify(s.capacity)}))
const output=run(['deploy','--config','.wrangler/ai-staging.json','--var','BUILTIN_AI_ENABLED:1'])
const url=output.match(/https:\/\/tracer-ai-test\.[a-z0-9-]+\.workers\.dev/)?.[0]
if(!url)throw new Error('Deployment succeeded but staging URL could not be read. Inspect Wrangler deployment status.')
writeFileSync('/tmp/tracer-ai-staging/deployment.json',JSON.stringify({project:s.project,url}),{mode:0o600})
console.log(JSON.stringify({stagingDeployed:true,url,cohortAccounts:s.accounts.length,provider:'nvidia/nemotron-3.5-lightning:free'}))
