import { test, expect } from '@playwright/test'
import { installCloudLibraryFixture } from '../fixtures/cloud-library'

for (const method of ['email', 'username', 'signup'] as const) {
  test(`${method} sign-in completes account setup without a reload loop`, async ({ context, page }) => {
    await context.addInitScript(() => { (window as any).turnstile = { render: (_element: unknown, options: any) => { queueMicrotask(() => options.callback('fixture-captcha')); return 'fixture' }, remove: () => {}, reset: () => {} } })
    const id = '00000000-0000-4000-8000-000000000001'
    const user = { id, email: 'fixture@example.invalid', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'email' }, user_metadata: { full_name: 'Fixture User' }, created_at: '2026-01-01T00:00:00Z' }
    const expires = Math.floor(Date.now() / 1000) + 3600
    const access_token = `${Buffer.from('{}').toString('base64url')}.${Buffer.from(JSON.stringify({ sub: id, exp: expires, role: 'authenticated' })).toString('base64url')}.fixture`
    const session = { access_token, refresh_token: 'fixture-refresh', expires_in: 3600, expires_at: expires, token_type: 'bearer', user }
    await context.route('**/auth/v1/**', route => route.fulfill({ json: route.request().url().includes('/user') ? user : session }))
    await context.route('**/functions/v1/username-sign-in', route => route.fulfill({ json: { session } }))
    await context.route('**/rest/v1/**', route => {
      const url = route.request().url()
      if (url.includes('/profiles')) return route.fulfill({ json: route.request().method() === 'GET' ? { display_name: 'Fixture User', username: 'fixture_user' } : null })
      if (url.includes('initialize_user_role')) return route.fulfill({ json: 'student' })
      return route.fulfill({ json: [] })
    })
    await context.route('**/api/web/credentials', route => route.fulfill({ json: {} }))
    await context.route('**/api/ai/**', route => route.fulfill({ json: { limit: 65, used: 0, reserved: 0, remaining: 65, resetsAt: '2026-12-01T00:00:00Z', available: true, throttled: false, retryAfter: 0 } }))
    await installCloudLibraryFixture(context, id, new Map())
    await page.goto('/first-run')
    if (method === 'signup') {
      await page.getByRole('button', { name: 'Need an account? Sign up' }).click()
      await page.getByRole('checkbox').nth(0).click()
      await page.getByRole('checkbox').nth(1).click()
      await page.getByLabel('Name', { exact: true }).fill('Fixture User')
    }
    await page.getByLabel(method === 'signup' ? 'Email' : 'Email or username', { exact: true }).fill(method === 'username' ? '@fixture_user' : user.email)
    await page.getByLabel('Password', { exact: true }).fill('fixture-password')
    await page.getByRole('button', { name: method === 'signup' ? 'Let’s go!' : 'Sign in', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible({ timeout: 20000 })
    await page.goto('/settings')
    await expect(page.getByText('@fixture_user', { exact: true })).toBeVisible()
  })
}

// Simulate the callback for a newly created Google account; no live account or terms are submitted.
test('new Google signup shows consent before completing setup', async ({ context, page }) => {
  const id = '00000000-0000-4000-8000-000000000001'
  const user = { id, email: 'new-google@example.invalid', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'google' }, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const expires = Math.floor(Date.now() / 1000) + 3600
  const access_token = `${Buffer.from('{}').toString('base64url')}.${Buffer.from(JSON.stringify({ sub: id, exp: expires, role: 'authenticated' })).toString('base64url')}.fixture`
  const session = { access_token, refresh_token: 'fixture-refresh', expires_in: 3600, expires_at: expires, token_type: 'bearer', user }
  await context.addInitScript(session => { localStorage.setItem('tracer:/:auth', JSON.stringify(session)); localStorage.setItem('tracer:/:signup-role', 'student') }, session)
  await context.route('**/auth/v1/**', route => route.fulfill({ json: user }))
  await context.route('**/rest/v1/**', route => {
    const url = route.request().url()
    if (url.includes('initialize_user_role')) return route.fulfill({ json: 'student' })
    if (url.includes('/profiles')) return route.fulfill({ json: route.request().method() === 'GET' ? { display_name: 'New User', username: 'new_user' } : null })
    return route.fulfill({ json: [] })
  })
  await context.route('**/api/web/credentials', route => route.fulfill({ json: {} }))
  await context.route('**/api/ai/**', route => route.fulfill({ json: { limit: 65, used: 0, reserved: 0, remaining: 65, resetsAt: '2026-12-01T00:00:00Z', available: true, throttled: false, retryAfter: 0 } }))
  await installCloudLibraryFixture(context, id, new Map())
  await page.goto('/first-run')
  await expect(page.getByRole('checkbox')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toHaveCount(0)
  await page.getByRole('checkbox').click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible({ timeout: 20000 })
})
