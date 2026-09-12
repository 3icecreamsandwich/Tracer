import { expect, test, type BrowserContext, type Page } from '@playwright/test'

const basePath = process.env.TRACER_TEST_BASE_PATH || '/'
const owner = '00000000-0000-4000-8000-000000000001'
const runtimeErrors = new WeakMap<Page, string[]>()
test.beforeEach(({ page }) => {
  const errors: string[] = []
  runtimeErrors.set(page, errors)
  page.on('pageerror', error => errors.push(error.message))
})
test.afterEach(({ page }) => {
  expect(runtimeErrors.get(page) ?? [], 'No uncaught browser errors').toEqual([])
})

async function signInFixture(context: BrowserContext, page: Page, userId = owner) {
  // No real accounts, provider keys, or cloud writes are used in this suite.
  const user = { id: userId, email: 'web-test@example.com', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'google', providers: ['google'] }, user_metadata: { full_name: 'Web Test' }, created_at: new Date().toISOString() }
  const expires = Math.floor(Date.now() / 1000) + 3600
  const token = `${Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')}.${Buffer.from(JSON.stringify({ sub: userId, exp: expires, role: 'authenticated' })).toString('base64url')}.fixture`
  await context.addInitScript(({ user, token, expires, basePath }) => {
    const key = `tracer:${basePath}:auth`
    if (!localStorage.getItem('fixture-initialized')) {
      localStorage.setItem(key, JSON.stringify({ access_token: token, refresh_token: 'fixture-refresh', token_type: 'bearer', expires_at: expires, expires_in: 3600, user }))
      localStorage.setItem('fixture-initialized', '1')
    }
  }, { user, token, expires, basePath })
  if (userId !== owner) {
    await page.evaluate(({ user, token, expires, basePath }) => {
      localStorage.setItem(`tracer:${basePath}:auth`, JSON.stringify({ access_token: token, refresh_token: 'fixture-refresh', token_type: 'bearer', expires_at: expires, expires_in: 3600, user }))
    }, { user, token, expires, basePath })
  }
  await context.route('**/auth/v1/**', route => route.fulfill({ json: user }))
  await context.route('**/rest/v1/**', route => route.fulfill({ json: route.request().url().includes('user_roles') ? [{ role: 'student' }] : [] }))
  await context.route('**/api/web/credentials', route => route.fulfill({ json: { openai: false, anthropic: false, gemini: false, ollama_cloud: false, openai_compat: false } }))
  await page.goto('first-run')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Sets', exact: true })).toBeVisible()
}

async function createSet(page: Page) {
  await page.goto('create/basic')
  await page.getByLabel('Title', { exact: true }).fill('Persistent web set')
  const terms = page.locator('input[id^="term-"]')
  const definitions = page.locator('textarea[id^="definition-"]')
  await terms.nth(0).fill('Browser')
  await definitions.nth(0).fill('Runs Tracer on a phone or laptop')
  await page.getByRole('button', { name: '+', exact: true }).click()
  await terms.nth(1).fill('Desktop')
  await definitions.nth(1).fill('Shares the same study logic')
  await page.getByRole('button', { name: 'Create', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Persistent web set', exact: true })).toBeVisible()
  return page.url()
}

test('real browser library persists edits and progress across reloads and tabs', async ({ context, page }) => {
  await signInFixture(context, page)
  const url = await createSet(page)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Persistent web set', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Edit', exact: true }).click()
  await page.getByLabel('Title', { exact: true }).fill('Edited on the web')
  await page.getByRole('button', { name: 'Update', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Edited on the web', exact: true })).toBeVisible()
  const second = await context.newPage()
  await second.goto(url)
  await expect(second.getByRole('heading', { name: 'Edited on the web', exact: true })).toBeVisible()
  await second.getByRole('button', { name: 'Got it', exact: true }).click()
  await expect(second.getByText('1/2', { exact: true })).toBeVisible()
  await second.reload()
  await expect(second.getByText('1/2', { exact: true })).toBeVisible()
})

test('phone layout supports creation, study modes and settings without horizontal overflow', async ({ context, page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await signInFixture(context, page)
  const url = await createSet(page)
  const setPath = new URL(url).pathname.slice(basePath.length)
  for (const path of [setPath, `${setPath}/edit`, `${setPath}-flashcards`, `${setPath}-learn`, `${setPath}-match`, `${setPath}-test`, 'create/generate', 'create/synthesize', 'settings']) {
    await page.goto(path)
    await expect(page.locator('body')).not.toContainText('Internal Server Error')
    if (path.endsWith('-flashcards')) await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeVisible()
    else await expect(page.locator('h1').first()).toBeVisible()
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 })
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), { message: `No horizontal overflow on ${path} at ${width}px` }).toBe(true)
    }
  }
  await testInfo.attach('mobile settings', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  })
})

test('web endpoints reject unauthenticated requests', async ({ request }) => {
  for (const path of ['api/web/credentials', 'api/web/ai']) {
    const response = path.endsWith('ai') ? await request.post(path, { data: {} }) : await request.get(path)
    expect(response.status()).toBe(401)
  }
})

test('account deletion requires typed confirmation and calls the self-delete RPC', async ({ context, page }) => {
  await signInFixture(context, page)
  await page.evaluate(() => sessionStorage.removeItem('tracer:connection-status-snapshot'))
  await page.goto('settings')
  await expect(page.getByText('Connected', { exact: true })).toBeVisible()

  const dangerZone = page.getByLabel('Danger zone')
  await dangerZone.getByRole('button', { name: 'Delete account', exact: true }).click()
  const dialog = page.getByRole('alertdialog', { name: 'Delete account' })
  const deleteButton = dialog.getByRole('button', { name: 'Delete account', exact: true })
  await expect(deleteButton).toBeDisabled()

  await dialog.getByLabel('Type DELETE to confirm.').fill('DELETE')
  const deletionRequest = page.waitForRequest(request =>
    request.method() === 'POST' && request.url().includes('/rest/v1/rpc/delete_own_account'),
  )
  await deleteButton.click()

  expect((await deletionRequest).postDataJSON()).toEqual({ confirmation: 'DELETE' })
  await expect(page.getByRole('heading', { name: 'Setup Tracer' })).toBeVisible()
})


test('switching accounts does not expose another browser library', async ({ context, page }) => {
  await signInFixture(context, page)
  await createSet(page)
  await signInFixture(context, page, '00000000-0000-4000-8000-000000000002')
  await expect(page.getByText('Persistent web set', { exact: true })).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Sets', exact: true })).toBeVisible()
  await expect(page.getByText('Persistent web set', { exact: true })).toHaveCount(0)
})
