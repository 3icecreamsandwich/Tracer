import { spawnSync } from 'node:child_process'
import { loadEnvFile } from 'node:process'
import { readFileSync, writeFileSync, mkdirSync, appendFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
try { loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }
const env = { ...process.env, TRACER_CLOUDFLARE: '1', TRACER_BUILD_DIR: '.nuxt-cloudflare', NUXT_APP_BASE_URL: '/', VITE_TRACER_WEB_PREVIEW: '0' }
for (const key of ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']) {
  if (!env[key]) throw new Error(`Missing ${key}; configure the existing public Supabase project identifiers.`)
}
for (const directory of ['.nuxt-cloudflare', '.output-cloudflare']) {
  rmSync(resolve(directory), { recursive: true, force: true })
}
const result = spawnSync('bun', ['--bun', 'node_modules/nuxt/bin/nuxt.mjs', 'build'], { stdio: 'inherit', env })
if (result.status !== 0) process.exit(result.status ?? 1)
const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'))
const vars = { NUXT_SUPABASE_URL: env.VITE_SUPABASE_URL, NUXT_SUPABASE_PUBLISHABLE_KEY: env.VITE_SUPABASE_PUBLISHABLE_KEY, NUXT_GITHUB_OAUTH_CLIENT_ID: env.VITE_GITHUB_OAUTH_CLIENT_ID || '', NUXT_WEB_AI_COMPATIBLE_ORIGIN: env.NUXT_WEB_AI_COMPATIBLE_ORIGIN || '' }
config.main = resolve(config.main)
config.assets.directory = resolve(config.assets.directory)
Object.assign(config.vars, vars)
Object.assign(config.env.production.vars, vars)
mkdirSync('.wrangler', { recursive: true })
writeFileSync('.wrangler/tracer.json', JSON.stringify(config, null, 2))

appendFileSync('.output-cloudflare/public/_headers', '\n/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n')
