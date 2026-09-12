import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'cloudflare/worker-configuration.d.ts'
const result = spawnSync('bun', ['x', 'wrangler', 'types', path, '--strict-vars', 'false'], {
  stdio: 'inherit',
  env: { ...process.env, CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'false' },
})
if (result.status !== 0) process.exit(result.status ?? 1)
// Wrangler's runtime declarations contain trailing spaces; keep generated diffs clean.
writeFileSync(path, readFileSync(path, 'utf8').replace(/[\t ]+$/gm, ''))
