import { installCloudLibraryFixture } from '../fixtures/cloud-library'
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

async function signInFixture(context: BrowserContext, page: Page, userId = owner, cloudRows?: Map<string, any>, beforeHome?: () => Promise<void>, role: 'student' | 'teacher' | 'super' = 'student') {
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
  await context.route('**/rest/v1/**', route => route.fulfill({ json: route.request().url().includes('user_roles') ? [{ role }] : [] }))
  await context.route('**/api/web/credentials', route => route.fulfill({ json: { openai: false, anthropic: false, gemini: false, ollama_cloud: false, openai_compat: false } }))
  await context.route('**/api/ai/usage', route => route.fulfill({ json: { limit:65, used:0, reserved:0, remaining:65, resetsAt:'2026-12-01T00:00:00Z', available:true, throttled:false, retryAfter:0 } }))
  const cloud = await installCloudLibraryFixture(context, userId, cloudRows)
  await beforeHome?.()
  await page.goto('first-run')
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Sets & Guides', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Sets & Guides', exact: true })).toBeVisible()
  await page.mouse.move(800, 80)
  await expect(page.getByRole('complementary', { name:'Study navigation' })).toHaveCSS('width','68px')
  return cloud
}

async function createSet(page: Page) {
  await page.goto('create/basic')
  await page.getByLabel('Title', { exact: true }).fill('Persistent web set')
  const terms = page.locator('input[id^="term-"]')
  const definitions = page.locator('textarea[id^="definition-"]')
  await terms.nth(0).fill('Browser')
  await definitions.nth(0).fill('Runs Tracer on a phone or laptop')
  await page.getByRole('button', { name: 'Add card', exact: true }).click()
  await terms.nth(1).fill('Desktop')
  await definitions.nth(1).fill('Shares the same study logic')
  await page.getByRole('button', { name: 'Create', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Persistent web set', exact: true })).toBeVisible()
  return page.url()
}

test('inline study updates Insights and manual tips refresh returns new suggestions', async ({ context, page }) => {
  await signInFixture(context, page)
  await createSet(page)
  await page.getByRole('button', { name: 'Got it', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeEnabled()
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await page.getByRole('link', { name: 'Insights', exact: true }).click()
  await expect(page.locator('article').filter({ hasText: 'Questions answered' })).toContainText('1')
  await expect(page.locator('article').filter({ hasText: 'Accuracy' }).first()).toContainText('100%')
  await expect(page.locator('article').filter({ hasText: 'Sessions' })).toContainText('1')
  await expect(page.getByRole('heading', { name: 'Recent study' })).toBeVisible()

  await context.route('**/api/ai/requests', route => route.fulfill({
    contentType: 'text/event-stream',
    body: 'data: {"type":"result","text":"Review the Browser card.\\nTake a short practice quiz.\\nReturn tomorrow for spaced review."}\n\ndata: {"type":"done","usage":{}}\n\n',
  }))
  await page.getByRole('button', { name: 'Refresh tips' }).click()
  await expect(page.getByText('Review the Browser card.', { exact: true })).toBeVisible()
  await expect(page.getByRole('status')).toContainText('refreshed just now')
})

test('Super accounts show the three destinations without wrapping their labels', async ({ context, page }) => {
  await signInFixture(context, page, owner, undefined, undefined, 'super')
  await page.setViewportSize({ width: 830, height: 900 })
  const insights = page.getByRole('link', { name: 'Insights', exact: true })
  const publicSets = page.getByRole('link', { name: 'Public sets', exact: true })
  const dashboard = page.getByRole('link', { name: 'Dashboard', exact: true })
  await expect(insights).toBeVisible()
  await expect(dashboard).toBeVisible()
  const [insightsBox, publicBox, dashboardBox] = await Promise.all([insights.boundingBox(), publicSets.boundingBox(), dashboard.boundingBox()])
  expect(insightsBox!.width).toBeGreaterThan(publicBox!.width * 1.8)
  expect(publicBox!.y).toBe(dashboardBox!.y)
  const title = publicSets.locator('span').last()
  expect(await title.evaluate(element => element.getBoundingClientRect().height)).toBeLessThan(30)
})

test('Insights can refresh AI tips before the first study session', async ({ context, page }) => {
  await signInFixture(context, page)
  await context.route('**/api/ai/requests', route => route.fulfill({
    contentType: 'text/event-stream',
    body: 'data: {"type":"result","text":"Start with a short flashcard session.\\nTest yourself after review.\\nReturn tomorrow to reinforce recall."}\n\ndata: {"type":"done","usage":{}}\n\n',
  }))
  await page.getByRole('link', { name: 'Insights', exact: true }).click()
  await expect(page.locator('article').filter({ hasText: 'Sessions' })).toContainText('0')
  await page.getByRole('button', { name: 'Refresh tips' }).click()
  await expect(page.getByText('Start with a short flashcard session.', { exact: true })).toBeVisible()
  await expect(page.getByRole('status')).toContainText('refreshed just now')
})

test('authentication defaults to sign in and skips browser profile editing', async ({ context, page }) => {
  await page.goto('first-run')
  await expect(page.getByRole('button', { name: 'Sign in with email', exact: true })).toBeVisible()
  await expect(page.getByLabel('Name', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Need an account? Sign up', exact: true })).toBeVisible()

  await signInFixture(context, page)
  await expect(page.getByRole('heading', { name: 'Sets & Guides', exact: true })).toBeVisible()
  await expect(page.getByLabel('Name', { exact: true })).toHaveCount(0)
})

test('creation pages stay open without a configured AI model', async ({ context, page }) => {
  // Match Tauri's freezePrototype setting, including before lazy imports load.
  await context.addInitScript(() => Object.freeze(Object.prototype))
  await signInFixture(context, page)
  for (const path of ['basic', 'generate', 'synthesize']) {
    await page.getByRole('complementary', {name:'Study navigation'}).locator(`a[href="${basePath}create/${path}"]`).click()
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page).toHaveURL(new RegExp(`/create/${path}$`))
    await page.goBack()
    await expect(page.getByRole('heading', { name: 'Sets & Guides', exact: true })).toBeVisible()
  }
})

test('creation and set actions use shared primary buttons', async ({ context, page }) => {
  await signInFixture(context, page)
  for (const [path, label] of [['basic', 'Create'], ['synthesize', 'Create'], ['generate', 'Generate']]) {
    await page.goto(`create/${path}`)
    const action = page.getByRole('button', { name: label, exact: true }).first()
    await expect(action).toHaveAttribute('data-slot', 'base')
    await expect(action).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  }
  const setPath = await createSet(page)
  await page.goto(setPath)
  await expect(page.getByRole('link', { name: 'Edit', exact: true })).toHaveAttribute('data-slot', 'base')
  await expect(page.getByRole('button', { name: 'Share', exact: true })).toHaveAttribute('data-slot', 'base')
  await page.getByRole('link', { name: 'Edit', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Update', exact: true })).toHaveAttribute('data-slot', 'base')
})

test('creation navigation reports a failed module load and offers recovery', async ({ context, page }) => {
  test.skip(
    process.env.TRACER_TEST_PRODUCTION === '1' || process.env.TRACER_TEST_CLOUDFLARE === '1',
    'Fault injection targets Vite development module URLs, not bundled production assets'
  )
  await signInFixture(context, page)
  await context.route('**/pages/create/basic.vue*', route => route.abort('failed'))
  await page.locator(`a[href="${basePath}create/basic"]`).click()
  const alert = page.getByRole('alert').filter({ hasText: 'Could not open the creation page.' })
  await expect(alert).toBeVisible()
  await context.unroute('**/pages/create/basic.vue*')
  await alert.getByRole('link', { name: 'Reload this page and try again' }).click()
  await expect(page).toHaveURL(/\/create\/basic$/)
  await expect(page.getByLabel('Title', { exact: true })).toBeVisible()
})

test('dropping on the top, middle, or bottom of a folder moves the set into it', async ({ context, page }) => {
  const rows = new Map<string, any>()
  const folderId = 'drop-folder'
  rows.set(`${owner}:folder:${folderId}`, { owner_id: owner, kind: 'folder', id: folderId, revision: 1, deleted: false,
    payload: { id: folderId, name: 'Drop target', sortOrder: 0, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  for (let index = 0; index < 3; index++) {
    const id = `drop-set-${index}`
    rows.set(`${owner}:set:${id}`, { owner_id: owner, kind: 'set', id, revision: 1, deleted: false,
      payload: { id, title: `Drop set ${index}`, terms: [], folderId: null, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  }
  await signInFixture(context, page, owner, rows)
  const folder = page.locator('[data-root-entry-kind="folder"]').filter({ hasText: 'Drop target' }).locator('[data-root-entry-hit]')
  for (const [index, fraction] of [0.1, 0.5, 0.9].entries()) {
    const source = page.locator('main [data-home-library-item]').filter({ hasText: `Drop set ${index}` })
    const sourceBox = await source.boundingBox()
    const folderBox = await folder.boundingBox()
    if (!sourceBox || !folderBox) throw new Error('Missing drag geometry')
    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2)
    await page.mouse.down()
    await page.mouse.move(folderBox.x + folderBox.width / 2, folderBox.y + folderBox.height * fraction, { steps: 10 })
    await expect(page.getByRole('status', { name: 'Moving 1 item' })).toBeVisible()
    await expect(folder).toHaveClass(/folder-card--target/)
    await page.mouse.up()
    await expect.poll(() => rows.get(`${owner}:set:drop-set-${index}`)?.payload.folderId).toBe(folderId)
  }
  await page.getByRole('button', { name: 'Open folder Drop target' }).click()
  await expect(page).toHaveURL(/\/folder\/drop-folder/)
  for (let index = 0; index < 3; index++) await expect(page.locator('main').getByText(`Drop set ${index}`, { exact: true })).toBeVisible()
})

test('dragging a set near the library edges scrolls until the pointer moves away', async ({ context, page }) => {
  const rows = new Map<string, any>()
  for (let index = 0; index < 24; index++) {
    const id = `scroll-set-${index}`
    rows.set(`${owner}:set:${id}`, { owner_id: owner, kind: 'set', id, revision: 1, deleted: false,
      payload: { id, title: `Scroll set ${index}`, terms: [], folderId: null, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  }
  await signInFixture(context, page, owner, rows)
  await page.setViewportSize({ width: 1100, height: 650 })
  const first = await page.locator('[data-home-library-item]').filter({ hasText: 'Scroll set 0' }).boundingBox()
  if (!first) throw new Error('Missing library geometry')
  await page.mouse.move(first.x + 15, first.y + first.height / 2)
  await page.mouse.down()
  await page.mouse.move(600, 645, { steps: 8 })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(80)
  await page.mouse.move(600, 5, { steps: 4 })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.mouse.up()
})

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
  await expect(second.getByRole('region', { name: 'Flashcards' }).getByText('1/2', { exact: true })).toBeVisible()
  await second.reload()
  await expect(second.getByRole('region', { name: 'Flashcards' }).getByText('1/2', { exact: true })).toBeVisible()
})

test('practice and results remain usable at desktop and phone widths', async ({ context, page }) => {
  await signInFixture(context, page)
  const setPath = new URL(await createSet(page)).pathname
  for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    for (const path of [`${setPath}?mode=learn&seed=1`, `${setPath}-learn?seed=1`]) {
      await page.goto(path)
      await expect(page.locator('.tracer-practice-card')).toBeVisible()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.goto(`${setPath}/results?mode=learn&correct=1&attempted=2`)
    await expect(page.locator('.tracer-result-surface')).toContainText('50%')
    await expect(page.getByRole('link', { name: 'Restart Practice' })).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

test('local practice settings open a generated fullscreen test', async ({ context, page }) => {
  await signInFixture(context, page)
  const url = await createSet(page)
  const setPath = new URL(url).pathname.slice(basePath.length)

  await page.goto(`${setPath}?mode=learn&seed=1`)
  await page.getByRole('button', { name: 'Practice settings' }).click()
  await page.getByRole('button', { name: 'test', exact: true }).click()
  await page.getByRole('button', { name: 'Restart test' }).click()

  await expect(page).toHaveURL(/\/set\/.+-test\?/)
  await expect(page.getByRole('region', { name: 'Test questions' }).locator('article')).toHaveCount(2)
  await expect(page.getByText('No questions could be generated for this test.')).toHaveCount(0)
})

test('phone layout supports creation, study modes and settings without horizontal overflow', async ({ context, page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await signInFixture(context, page)
  const url = await createSet(page)
  const setPath = new URL(url).pathname.slice(basePath.length)

  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto(setPath)
  const studyModeTiles = page.locator('.study-mode-tile')
  await expect(studyModeTiles).toHaveCount(4)
  await expect(studyModeTiles.first().getByText('Flashcards', { exact: true })).toBeHidden()
  await expect(studyModeTiles.nth(2).locator('svg')).toHaveCount(0)
  await expect(page.getByText('Space to flip · ←/→ to browse · Mark correct/incorrect to progress')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Fullscreen', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Prev', exact: true }).getByText('Prev', { exact: true })).toBeHidden()
  await expect(page.getByRole('button', { name: 'Next', exact: true }).getByText('Next', { exact: true })).toBeHidden()
  await expect(page.getByRole('button', { name: 'Missed it', exact: true }).getByText('×', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Got it', exact: true }).getByText('✓', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)

  await page.goto(`${setPath}?mode=match&seed=1`)
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  await expect.poll(async () => Math.round((await page.locator('[data-match-tile="true"]').first().boundingBox())?.height ?? 0)).toBe(64)

  await page.goto(`${setPath}-test?types=multiple_choice&count=2&seed=1`)
  await expect(page.getByText('No questions could be generated for this test.')).toHaveCount(0)
  await expect(page.getByRole('region', { name: 'Test questions' }).locator('article')).toHaveCount(2)

  await page.goto(basePath)
  await page.getByRole('button', { name: 'Add Folder', exact: true }).click()
  const folderName = page.getByRole('textbox', { name: 'Folder name', exact: true })
  await expect(folderName).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await folderName.fill('Temporary folder')
  await folderName.press('Enter')
  page.on('dialog', dialog => {
    throw new Error(`Folder deletion unexpectedly prompted: ${dialog.message()}`)
  })
  await page.getByRole('button', { name: 'Delete folder', exact: true }).click()
  await expect(page.getByText('Temporary folder', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Persistent web set', { exact: true })).toBeVisible()

  for (const path of [setPath, `${setPath}/edit`, `${setPath}-flashcards`, `${setPath}-learn`, `${setPath}-match`, `${setPath}-test`, 'create/generate', 'create/synthesize', 'settings']) {
    await page.goto(path)
    await expect(page.locator('body')).not.toContainText('Internal Server Error')
    if (path.endsWith('-flashcards')) await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeVisible()
    else if (path.endsWith('-learn')) await expect(page.getByRole('button', { name: 'Practice settings' })).toBeVisible()
    else if (path.endsWith('-match')) await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()
    else if (path.endsWith('-test')) await expect(page.getByRole('progressbar', { name: 'Test progress' })).toBeVisible()
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

  const accountControls = page.getByLabel('Reset and account controls')
  await accountControls.getByRole('button', { name: 'Delete account', exact: true }).click()
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
  await expect(page.getByRole('heading', { name: 'Sets & Guides', exact: true })).toBeVisible()
  await expect(page.getByText('Persistent web set', { exact: true })).toHaveCount(0)
})

test('failed cloud saves preserve an editor draft across reloads', async ({ context, page }) => {
  await signInFixture(context, page)
  await createSet(page)
  await page.getByRole('link', { name: 'Edit', exact: true }).click()
  await page.getByLabel('Title', { exact: true }).fill('Draft survives failed save')
  await context.route('**/rest/v1/rpc/save_cloud_library_item', route => route.fulfill({ status: 503, json: { message: 'Cloud unavailable' } }))
  await page.getByRole('button', { name: 'Update', exact: true }).click()
  await expect(page.getByText('Cloud unavailable', { exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('Draft survives failed save')
  await expect(page.getByText(/Recovered an unsaved draft/)).toBeVisible()
})


test('a fresh device opens and edits cloud sets without the original local database', async ({ browser, context, page }) => {
  const cloud = await signInFixture(context, page)
  const url = await createSet(page)
  const otherContext = await browser.newContext()
  try {
    const otherPage = await otherContext.newPage()
    await signInFixture(otherContext, otherPage, owner, cloud.rows)
    await otherPage.goto(url)
    await expect(otherPage.getByRole('heading', { name: 'Persistent web set', exact: true })).toBeVisible()
    await otherPage.getByRole('link', { name: 'Edit', exact: true }).click()
    await otherPage.getByLabel('Title', { exact: true }).fill('Edited on another device')
    await otherPage.getByRole('button', { name: 'Update', exact: true }).click()
    await expect(otherPage.getByRole('heading', { name: 'Edited on another device', exact: true })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Edited on another device', exact: true })).toBeVisible()
  } finally { await otherContext.close() }
})

test('settings stay usable during slow profile reads and preference saves', async ({ context, page }) => {
  await signInFixture(context, page)
  let releaseProfile!: () => void
  const profileGate = new Promise<void>(resolve => { releaseProfile = resolve })
  let profileRequests = 0
  await context.route('**/rest/v1/profiles*', async route => {
    profileRequests++
    await profileGate
    await route.fulfill({ headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, json: { display_name: 'Web Test', username: 'web_test' } })
  })
  let releaseSave!: () => void
  const saveGate = new Promise<void>(resolve => { releaseSave = resolve })
  let saving = false
  await context.route('**/rest/v1/rpc/save_cloud_library_item', async route => {
    if (route.request().postDataJSON()?.item_payload?.smartReviewEnabled === true) {
      saving = true
      await saveGate
    }
    await route.fallback()
  })
  try {
    await page.goto('settings')
    await expect.poll(() => profileRequests).toBe(1)
    const smart = page.getByRole('region', { name: 'Flashcards · Smart Review', exact: true }).getByRole('button')
    const chat = page.getByRole('region', { name: 'Page chat button', exact: true }).getByRole('button')
    await expect(smart).toBeEnabled()
    await smart.click()
    await expect.poll(() => saving).toBe(true)
    await expect(smart).toHaveAttribute('aria-busy', 'true')
    await expect(smart).toHaveText('On')
    releaseProfile()
    await page.getByRole('button', { name: 'Configure AI', exact: true }).click()
    await page.getByText('Other settings', { exact: true }).click()
    await expect(chat).toBeEnabled()
    await chat.click()
    await expect(chat).toHaveText('Off')
    await expect(chat).toBeEnabled()
    await page.getByRole('button', { name: 'Close AI configuration', exact: true }).last().click()
    releaseSave()
    await expect(smart).toHaveText('On')
    await expect(smart).toBeEnabled()
    releaseProfile()
    await expect(page.getByText('@web_test', { exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await page.getByRole('link', { name: 'Settings', exact: true }).click()
    await expect(page.getByText('@web_test', { exact: true })).toBeVisible()
    expect(profileRequests).toBe(1)
  } finally {
    releaseSave()
    releaseProfile()
  }
})


test('failed preference saves restore the previous toggle state', async ({ context, page }) => {
  const cloud = await signInFixture(context, page)
  await page.goto('settings')
  const smart = page.getByRole('region', { name: 'Flashcards · Smart Review', exact: true }).getByRole('button')
  await expect(smart).toHaveText('Off')
  cloud.failWrites(true)
  await smart.click()
  await expect(smart).toHaveText('Off')
  await expect(smart).toBeEnabled()
})

test('a single folder click and keyboard activation open its page', async ({ context, page }) => {
  await signInFixture(context, page)
  await page.getByRole('button', { name: 'Add Folder', exact: true }).click()
  const name = page.getByRole('textbox', { name: 'Folder name', exact: true })
  await name.fill('Single click folder')
  await name.press('Enter')
  const folder = page.getByRole('button', { name: 'Open folder Single click folder', exact: true })
  await folder.click()
  await expect(page).toHaveURL(/\/folder\//)
  await expect(page.getByRole('heading', { name: 'Single click folder', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Back to library' }).click()
  await page.getByRole('button', { name: 'Open folder Single click folder', exact: true }).press('Enter')
  await expect(page.getByRole('heading', { name: 'Single click folder', exact: true })).toBeVisible()
})


test('classroom loading starts while the first library read is delayed', async ({ context, page }) => {
  let releaseLibrary!: () => void
  const gate = new Promise<void>(resolve => { releaseLibrary = resolve })
  let libraryPending = false
  let classesRequested = false
  try {
    await signInFixture(context, page, owner, undefined, async () => {
      await context.route('**/rest/v1/cloud_library_summaries**', async route => {
        libraryPending = true
        await gate
        await route.fallback()
      })
      await context.route('**/rest/v1/classes**', async route => {
        classesRequested = true
        await route.fallback()
      })
    })
    await expect.poll(() => libraryPending).toBe(true)
    await expect.poll(() => classesRequested).toBe(true)
  } finally { releaseLibrary() }
})


test('a folder page moves a multi-selection to the library through either edge', async ({ context, page }) => {
  const rows = new Map<string, any>()
  const folderId = 'move-folder'
  rows.set(`${owner}:folder:${folderId}`, { owner_id: owner, kind: 'folder', id: folderId, revision: 1, deleted: false,
    payload: { id: folderId, name: 'Move folder', sortOrder: 0, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  for (let index = 0; index < 3; index++) {
    const id = `move-set-${index}`
    rows.set(`${owner}:set:${id}`, { owner_id: owner, kind: 'set', id, revision: 1, deleted: false,
      payload: { id, title: `Move set ${index}`, terms: [], folderId, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  }
  await signInFixture(context, page, owner, rows)
  await page.getByRole('button', { name: 'Open folder Move folder' }).click()
  await expect(page).toHaveURL(/\/folder\/move-folder/)
  await expect(page.getByRole('heading', { name: 'Move folder', exact: true })).toBeVisible()
  const first = page.locator('[data-home-library-item]').filter({ hasText: 'Move set 0' })
  const second = page.locator('[data-home-library-item]').filter({ hasText: 'Move set 1' })
  await first.click({ modifiers: ['Meta'] })
  await second.click({ modifiers: ['Meta'] })
  const source = await first.boundingBox()
  if (!source) throw new Error('Missing source card')
  await page.mouse.move(source.x + source.width / 2, source.y + source.height / 2)
  await page.mouse.down()
  await page.mouse.move(source.x + source.width / 2 + 20, source.y + source.height / 2, { steps: 4 })
  await expect(page.getByRole('status', { name: 'Moving 2 items' })).toBeVisible()
  await expect(page.locator('.folder-move-zone')).toHaveCount(2)
  await page.mouse.move((page.viewportSize()?.width ?? 1280) - 20, source.y + source.height / 2, { steps: 8 })
  await expect(page.locator('.folder-move-zone--right')).toHaveClass(/folder-move-zone--active/)
  await page.mouse.up()
  await expect.poll(() => rows.get(`${owner}:set:move-set-0`)?.payload.folderId).toBeNull()
  await expect.poll(() => rows.get(`${owner}:set:move-set-1`)?.payload.folderId).toBeNull()
  await expect(first).toHaveCount(0)
  const third = page.locator('[data-home-library-item]').filter({ hasText: 'Move set 2' })
  const thirdBox = await third.boundingBox()
  if (!thirdBox) throw new Error('Missing remaining card')
  await page.mouse.move(thirdBox.x + thirdBox.width / 2, thirdBox.y + thirdBox.height / 2)
  await page.mouse.down()
  await page.mouse.move(20, thirdBox.y + thirdBox.height / 2, { steps: 8 })
  await expect(page.getByRole('status', { name: 'Moving 1 item' })).toBeVisible()
  await expect(page.locator('.folder-move-zone--left')).toHaveClass(/folder-move-zone--active/)
  await page.mouse.up()
  await expect.poll(() => rows.get(`${owner}:set:move-set-2`)?.payload.folderId).toBeNull()
  await page.getByRole('link', { name: 'Back to library' }).click()
  await expect(page.getByText('Move set 0', { exact: true })).toBeVisible()
})

test('a study guide can be dragged out of its folder', async ({ context, page }) => {
  const rows = new Map<string, any>()
  const folderId = 'guide-folder', setId = 'guide-set'
  rows.set(`${owner}:folder:${folderId}`, { owner_id: owner, kind: 'folder', id: folderId, revision: 1, deleted: false,
    payload: { id: folderId, name: 'Guides folder', sortOrder: 0, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  rows.set(`${owner}:set:${setId}`, { owner_id: owner, kind: 'set', id: setId, revision: 1, deleted: false,
    payload: { id: setId, title: 'Guide source', terms: [], folderId, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  rows.set(`${owner}:guide:${setId}`, { owner_id: owner, kind: 'guide', id: setId, revision: 1, deleted: false,
    payload: { id: 'guide-id', setId, markdown: '# Notes', createdAt: '2026-01-01' } })
  await signInFixture(context, page, owner, rows)
  await page.getByRole('button', { name: 'Study guides', exact: true }).click()
  await page.getByRole('button', { name: 'Open folder Guides folder' }).click()
  const guide = page.locator('[data-home-library-item]').filter({ hasText: 'Study guide · Guide source' })
  await expect(guide).toBeVisible()
  const box = await guide.boundingBox()
  if (!box) throw new Error('Missing guide card')
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(20, box.y + box.height / 2, { steps: 8 })
  await expect(page.getByRole('status', { name: 'Moving 1 item' })).toBeVisible()
  await page.mouse.up()
  await expect.poll(() => rows.get(`${owner}:set:${setId}`)?.payload.folderId).toBeNull()
  await page.getByRole('link', { name: 'Back to library' }).click()
  await expect(page.locator('main').getByText('Study guide · Guide source', { exact: true })).toBeVisible()
})
