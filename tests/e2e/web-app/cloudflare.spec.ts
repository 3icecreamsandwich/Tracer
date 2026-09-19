import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'

test.skip(process.env.TRACER_TEST_CLOUDFLARE !== '1', 'Cloudflare deployment checks')

test('Google sign-in requests the current deployment callback', async ({ page }) => {
  // Stop before Google so this checks routing without signing into a real account.
  await page.route('**/auth/v1/authorize?**', route => route.fulfill({ body: 'OAuth destination captured' }))
  await page.goto('first-run')
  const origin = new URL(page.url()).origin
  const authorization = page.waitForRequest('**/auth/v1/authorize?**')
  await page.getByRole('button', { name: /Google/i }).click()
  const url = new URL((await authorization).url())
  expect(url.searchParams.get('redirect_to')).toBe(`${origin}/auth/callback`)
})

test('Worker caps bodies before authentication and never caches API errors', async ({ request }) => {
  for (const [path, size] of [['api/web/ai', 5 * 1024 * 1024 + 1], ['api/web/credentials', 64 * 1024 + 1]] as const) {
    const response = await request.post(path, { data: 'x'.repeat(size), headers: { 'Content-Type': 'application/json' } })
    expect(response.status()).toBe(413)
    expect(response.headers()['cache-control']).toContain('no-store')
    expect(await response.json()).toMatchObject({ statusCode: 413 })
  }
  const response = await request.get('api/web/credentials')
  expect(response.status()).toBe(401)
  expect(response.headers()['content-type']).toContain('application/json')
  expect(response.headers()['cache-control']).toContain('no-store')
})

test('deep links render the app and fingerprinted worker assets retain their types', async ({ request }) => {
  for (const path of ['auth/callback', 'create/generate', 'settings']) {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/html')
    expect(response.headers()['x-robots-tag']).toContain('noindex')
    expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'")
    expect(response.headers()['strict-transport-security']).toContain('max-age=31536000')
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin')
    expect(response.headers()['permissions-policy']).toContain('camera=()')
    expect(response.headers()['x-content-type-options']).toBe('nosniff')
  }
  const assets = readdirSync('.output-cloudflare/public/_nuxt')
  for (const prefix of ['browser.worker-', 'pdf.worker.', 'sql-wasm.', 'worker.min.']) {
    const asset = assets.find(name => name.startsWith(prefix) && !/\.(br|gz)$/.test(name))
    expect(asset, `${prefix} was emitted`).toBeTruthy()
    const response = await request.get(`_nuxt/${asset}`)
    expect(response.status()).toBe(200)
    expect(response.headers()['cache-control']).toContain('immutable')
    expect(response.headers()['content-type']).toContain(asset!.endsWith('.wasm') ? 'application/wasm' : 'javascript')
  }
})
