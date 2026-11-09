import { readFileSync } from 'node:fs'
import { expect, it, vi } from 'vitest'
import ts from 'typescript'

function fixture(valid = true) {
  let handler!: (request: Request) => Promise<Response>
  const rpc = vi.fn().mockResolvedValue({ data: true, error: null })
  const getUserById = vi.fn().mockResolvedValue({ data: { user: { email: 'private@example.com' } } })
  const signInWithPassword = vi.fn().mockResolvedValue(valid ? { data: { session: { access_token: 'access', refresh_token: 'refresh' } }, error: null } : { data: { session: null }, error: new Error('bad password') })
  const admin = { rpc, from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: 'owner' }, error: null }) }) }) }), auth: { admin: { getUserById } } }
  const createClient = vi.fn((_url: string, key: string) => key === 'service' ? admin : { auth: { signInWithPassword } })
  const deno = { serve: (fn: typeof handler) => { handler = fn }, env: { get: (key: string) => ({ SUPABASE_URL: 'https://example.invalid', SUPABASE_SERVICE_ROLE_KEY: 'service', SUPABASE_ANON_KEY: 'anon' } as Record<string, string>)[key] } }
  const source = readFileSync('supabase/functions/username-sign-in/index.ts', 'utf8').replace(/^import .*\n/, '')
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText
  new Function('createClient', 'Deno', compiled)(createClient, deno)
  return { handler, rpc, signInWithPassword }
}
const request = () => new Request('https://example.invalid', { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': '127.0.0.1' }, body: JSON.stringify({ username: '@Example', password: 'secret', captchaToken: 'captcha' }) })
it('rate limits and signs in without exposing the resolved email', async () => {
  const f = fixture()
  const response = await f.handler(request())
  expect(response.status).toBe(200)
  expect(await response.json()).toEqual({ session: { access_token: 'access', refresh_token: 'refresh' } })
  expect(f.rpc).toHaveBeenCalledTimes(2)
  expect(f.signInWithPassword).toHaveBeenCalledWith({ email: 'private@example.com', password: 'secret', options: { captchaToken: 'captcha' } })
})
it('returns a generic error for invalid credentials', async () => {
  const response = await fixture(false).handler(request())
  expect(response.status).toBe(401)
  expect(await response.json()).toEqual({ error: 'Invalid credentials' })
})
