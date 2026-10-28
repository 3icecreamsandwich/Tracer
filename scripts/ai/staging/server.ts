// Local gateway backed by real staging Auth/Postgres and a verified free router.
import {readFile} from 'node:fs/promises'
const session=JSON.parse(await readFile('/tmp/tracer-ai-staging/session.json','utf8'))
if(session.project!=='incejztkdiregaaxltiv' || process.env.NUXT_SUPABASE_URL!==session.url)throw new Error('Only tracer-ai-test is allowed')
if(!process.env.SUPABASE_SERVICE_ROLE_KEY)throw new Error('Missing staging server credential')
process.env.NUXT_SUPABASE_PUBLISHABLE_KEY=session.publishable
process.env.BUILTIN_AI_ENABLED='1'
process.env.BUILTIN_AI_COHORT=session.accounts.map((s:any)=>s.user.id).join(',')
process.env.BUILTIN_AI_CAPACITY=JSON.stringify(session.capacity)
process.env.PORT||='3111';process.env.HOST='127.0.0.1'
// Launch only the separately built staging output; never deploy this script.
await import('../../../.output-ai-staging/server/index.mjs')
