// Prints variable names only if a server secret is found; never prints values.
import { readdir,readFile } from 'node:fs/promises'
import { join } from 'node:path'
const keys=Object.entries(process.env).filter(([name,value])=>value && value.length>=12 && /^(?:GROQ_KEY_\d+|OLLAMA_CLOUD_KEY_\d+|OPENROUTER_KEY_\d+|GEMINI_KEY_\d+|CLOUDFLARE_WORKERS_KEY_.*|SUPABASE_SERVICE_ROLE_KEY)$/.test(name))
if(!keys.length) throw new Error('No server credentials were loaded for the client-asset audit.')
let files=0,leaks=0
async function scan(path:string) {
 for(const entry of await readdir(path,{withFileTypes:true})) {
  const child=join(path,entry.name)
  if(entry.isDirectory()) await scan(child)
  else if(entry.isFile()) {
   files++
   const bytes=await readFile(child)
   for(const [name,value] of keys) if(bytes.includes(Buffer.from(value!))) {console.error(`Server credential ${name} found in client artifact: ${child}`);leaks++}
  }
 }
}
for(const root of process.argv.slice(2).length?process.argv.slice(2):['.output/public']) await scan(root)
console.log(JSON.stringify({filesChecked:files,credentialNamesChecked:keys.length,leaks}))
if(leaks) process.exitCode=1
