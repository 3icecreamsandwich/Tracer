import { test, expect, type BrowserContext, type Page } from '@playwright/test'
import { installCloudLibraryFixture } from '../fixtures/cloud-library'

async function seed(context: BrowserContext, page: Page, teacher: boolean | 'super' = false) {
  const owner = '00000000-0000-4000-8000-000000000001'
  const user = { id: owner, email: 'fixture@example.invalid', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'google' }, user_metadata: { full_name: 'UI Test' }, created_at: '2026-01-01' }
  await context.addInitScript(user => {
    localStorage.setItem('tracer:/:auth', JSON.stringify({ access_token: 'fixture-token', refresh_token: 'fixture-refresh', token_type: 'bearer', expires_at: Math.floor(Date.now() / 1000) + 3600, expires_in: 3600, user }))
  }, user)
  const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS' }
  await context.route('**/auth/v1/**', route => route.fulfill({ headers, json: user }))
  await context.route('**/rest/v1/**', route => {
    const url = route.request().url()
    const json = url.includes('user_roles') ? [{ role: teacher === 'super' ? 'super' : teacher ? 'teacher' : 'student' }]
      : teacher && /\/classes\?/.test(url) ? [{ id: 'class-1', name: 'Biology class', created_by: owner, created_at: '2026-01-01', class_memberships: [] }]
      : teacher && url.includes('list_tracer_class_progress') ? [{ student_id: 'student-1', display_name: 'Ada', assignment_id: 'assignment-1', assignment_title: 'Cells', attempt_id: 'attempt-1', mode: 'test', score_earned: 9, score_possible: 10, submitted_at: '2026-11-05T12:00:00Z' }]
      : []
    return route.fulfill({ headers, json })
  })
  await context.route('**/api/ai/**', route => route.fulfill({ json: { enabled: true, remaining: 65, limit: 65, resetsAt: '2026-12-01T00:00:00Z' } }))
  await context.route('**/api/web/credentials', route => route.fulfill({ json: {} }))
  const rows = new Map<string, any>()
  rows.set(`${owner}:preferences:app`, { owner_id: owner, kind: 'preferences', id: 'app', revision: 1, deleted: false, payload: { aiMode: 'builtin', defaultModelId: null, fallbackModelIds: [] } })
  for (let i = 0; i < 8; i++) {
    const id = `00000000-0000-4000-8000-00000000008${i}`
    rows.set(`${owner}:set:${id}`, { owner_id: owner, kind: 'set', id, revision: 1, deleted: false, payload: { id, title: `Biology ${i}`, description: 'Explore cells, genetics and the living world.', terms: [{ id: 't1', front: 'Cell', back: 'The basic unit of life' }], folderId: null, createdAt: `2026-01-0${i + 1}`, updatedAt: `2026-01-0${i + 1}` } })
  }
  await installCloudLibraryFixture(context, owner, rows)
  const errors: string[] = []
  page.on('pageerror', error => {
    // WebKit reports finite ResizeObserver delivery deferrals while Reka
    // overlays animate. Keep the notification visible in test output; the
    // layout and scrolling assertions below verify the actual behavior.
    if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
      console.warn(error.message)
      return
    }
    errors.push(error.message)
  })
  await page.goto('/first-run')
  await expect(page.getByRole('heading', { name: 'Home', exact: true })).toBeVisible()
  await expect(page.locator('main h3')).toHaveCount(6)
  return errors
}

test('creation drafts, switches, dialogs and library filters work through real controls', async ({ context, page }) => {
  const errors = await seed(context, page)
  await page.locator('main').getByRole('link', { name: 'Biology 2', exact: true }).click()
  await expect(page).toHaveURL(/\/set\/00000000-0000-4000-8000-000000000082$/)
  await expect(page.getByRole('heading', { name: 'Biology 2', exact: true, level: 1 })).toBeVisible()
  await page.getByRole('banner').getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.locator('main h3').first()).toHaveText('Biology 2')
  await page.getByRole('link', { name: 'Basic', exact: true }).first().click()
  await page.mouse.move(700, 80)
  await page.getByLabel('Title', { exact: true }).fill('My cached biology')
  await page.getByLabel('Term', { exact: true }).first().fill('Cell')
  await page.locator('input[type=file]').first().setInputFiles({ name: 'cell.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="6"/></svg>') })
  await expect(page.getByText('cell.svg', { exact: true })).toBeVisible()
  const modes = page.getByRole('navigation', { name: 'Creation mode' })
  await modes.getByRole('link', { name: 'Generate', exact: true }).click()
  await page.getByLabel('Prompt', { exact: true }).fill('Create a biology set about cells')
  await expect(page.getByRole('button', { name: 'Generate', exact: true })).toBeEnabled()
  await modes.getByRole('link', { name: 'Basic', exact: true }).click()
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('My cached biology')
  await expect(page.getByLabel('Term', { exact: true }).first()).toHaveValue('Cell')
  await expect(page.getByText('cell.svg', { exact: true })).toBeVisible()
  await modes.getByRole('link', { name: 'Synthesize', exact: true }).click()
  await page.locator('#synth-theme').fill('Compare cell structures')
  await modes.getByRole('link', { name: 'Basic', exact: true }).click()
  await modes.getByRole('link', { name: 'Synthesize', exact: true }).click()
  await expect(page.locator('#synth-theme')).toHaveValue('Compare cell structures')
  await modes.getByRole('link', { name: 'Generate', exact: true }).click()
  await expect(page.getByLabel('Prompt', { exact: true })).toHaveValue('Create a biology set about cells')
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await page.getByRole('link', { name: 'Settings', exact: true }).last().click()
  await page.getByRole('switch', { name: 'Dark mode', exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Configure AI', exact: true }).click()
  await page.getByRole('combobox', { name: 'AI service' }).click()
  await expect(page.getByRole('option', { name: 'Built-in AI', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close AI configuration', exact: true }).click()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  await page.mouse.move(1000, 600)
  await page.mouse.wheel(0,500)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await page.goto('/create/basic')
  await page.mouse.move(700, 80)
  await page.getByRole('button', { name: 'Delete all inputs', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Delete all inputs', exact: true }).click()
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('link', { name: 'Insights', exact: true }).click()
  await page.mouse.move(380, 80)
  await page.getByRole('combobox').first().click()
  await expect(page.getByRole('option', { name: 'All topics', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('link', { name: 'Sets & Guides', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Sets & Guides', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

test('teachers see recent student activity on the homepage', async ({ context, page }) => {
  const errors = await seed(context, page, true)
  await expect(page.getByRole('heading', { name: 'Recent student activity' })).toBeVisible()
  await expect(page.locator('main')).toContainText('Ada')
  await expect(page.locator('main')).toContainText('Cells')
  await expect(page.getByRole('link', { name: 'Dashboard', exact: true }).last()).toBeVisible()
  expect(errors).toEqual([])
})


test('sidebar follows hover and cards stay consistent across separate library routes', async ({ context, page }) => {
  const errors = await seed(context, page, true)
  const sidebar = page.getByRole('complementary', { name: 'Study navigation' })
  await expect(sidebar).toHaveCSS('width', '68px')
  const mainX = await page.locator('main').first().evaluate(el => el.getBoundingClientRect().x)
  await sidebar.hover()
  expect(await page.locator('main').first().evaluate(el => el.getBoundingClientRect().x)).toBe(mainX)
  expect((await page.getByRole('button', {name:'Back',exact:true}).boundingBox())!.x).toBeLessThanOrEqual(24)
  await expect.poll(async () => sidebar.evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(200)
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-sidebar.png'})
  await page.mouse.move(700, 80)
  await expect(sidebar).toHaveCSS('width', '68px')
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-home.png'})
  await sidebar.hover()
  await sidebar.getByRole('link', { name:'Sets & Guides', exact:true }).click()
  await expect(page.getByRole('heading', {name:'Sets & Guides', exact:true})).toBeVisible()
  await expect(page.getByRole('button', {name:'Classes',exact:true})).toHaveCount(0)
  await expect(page.locator('main .library-card')).toHaveCount(8)
  await page.mouse.move(700, 80)
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-library.png'})
  await sidebar.hover()
  await sidebar.getByRole('link',{name:'Classes',exact:true}).click()
  await expect(page.getByRole('heading',{name:'Classes',exact:true})).toBeVisible()
  await expect(page.locator('main .library-card')).toHaveCount(1)
  await page.mouse.move(700, 80)
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-classes.png'})
  await page.getByRole('link',{name:'Settings',exact:true}).click()
  await expect(page.getByRole('switch',{name:'Dark mode',exact:true})).toBeVisible()
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-settings.png'})
  await page.setViewportSize({width:390,height:844})
  await page.getByRole('banner').getByRole('link',{name:'Home',exact:true}).click()
  await page.mouse.move(380, 80)
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible()
  await expect(page.locator('main .library-card')).toHaveCount(6)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-mobile.png'})
  expect(errors).toEqual([])
})

test('sign-in controls stay compact and centered with an invisible challenge', async ({ context, page }) => {
  await context.addInitScript(() => { (window as any).turnstile = { render: () => 'fixture', remove: () => {}, reset: () => {} } })
  await page.goto('/first-run')
  const password = page.getByLabel('Password', { exact:true })
  const submit = page.getByRole('button', { name:'Sign in', exact:true })
  await expect(submit).toBeVisible()
  const passwordBox = await password.boundingBox()
  const submitBox = await submit.boundingBox()
  expect(submitBox!.y - passwordBox!.y - passwordBox!.height).toBeLessThan(40)
  await expect(submit).toHaveCSS('justify-content','center')
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.waitForTimeout(350)
  await page.screenshot({path:'/private/tmp/tracer-refined-auth.png'})
})


test('class filters, search and actions share field height and padding', async ({context,page}) => {
  const errors = await seed(context,page,true)
  await page.getByRole('link',{name:'Classes',exact:true}).click()
  await page.mouse.move(800,80)
  await page.getByRole('link',{name:'Biology class',exact:true}).click()
  await expect(page).toHaveURL(/\/teacher\?class=class-1/)
  await page.getByRole('link', { name: 'Detailed View' }).click()
  await expect(page.getByRole('heading',{name:'Biology class',exact:true,level:1})).toBeVisible()
  const search = page.getByRole('searchbox',{name:'Search students'})
  await expect(search).toBeVisible()
  const fields = [page.getByRole('combobox').nth(0),search,page.getByRole('combobox').nth(1),page.getByRole('button',{name:'Add Students',exact:true})]
  const heights = await Promise.all(fields.map(async field => (await field.boundingBox())!.height))
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1)
  for (const field of fields.slice(0,3)) { await expect(field).toHaveCSS('padding-left','14px'); await expect(field).toHaveCSS('padding-top','8px') }
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.screenshot({path:'/private/tmp/tracer-refined-class-controls.png'})
  expect(errors).toEqual([])
})

test('editor spacing, shared radii, original artwork and AI allowance are consistent', async ({context,page}) => {
  const errors = await seed(context,page)
  await expect(page.getByRole('button',{name:'Chat with Tracer',exact:true}).locator('svg')).toHaveAttribute('viewBox','0 0 33 24')
  await page.getByRole('link',{name:'Settings',exact:true}).click()
  const allowance = page.getByRole('progressbar',{name:'Built-in AI actions remaining'})
  await expect(allowance).toHaveAttribute('aria-valuenow','65')
  await expect(allowance).toHaveAttribute('aria-valuemax','65')
  await page.getByRole('link',{name:'Basic',exact:true}).first().click()
  await page.mouse.move(800,80)
  await expect(page.locator('.basic-card').first()).toBeVisible()
  const metadata = (await page.locator('.basic-metadata').boundingBox())!
  const card = (await page.locator('.basic-card').first().boundingBox())!
  expect(card.y - metadata.y - metadata.height).toBeLessThan(72)
  await expect(page.locator('.basic-metadata')).toHaveCSS('border-radius','24px')
  await expect(page.locator('#set-title')).toHaveCSS('border-radius','12px')
  await expect(page.getByRole('button',{name:'Create',exact:true})).toHaveCSS('border-radius','12px')
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.screenshot({path:'/private/tmp/tracer-refined-basic.png'})
  await page.getByRole('navigation',{name:'Creation mode'}).getByRole('link',{name:'Synthesize',exact:true}).click()
  await expect(page.locator('.synth-source-row').first()).toHaveCSS('border-radius','24px')
  await expect(page.locator('.tracer-page')).toHaveCSS('padding-bottom','112px')
  await expect(page.getByRole('navigation',{name:'Creation mode'}).getByRole('link',{name:'Synthesize',exact:true})).toHaveCSS('border-radius','9999px')
  await expect(page.locator('main').first()).toHaveCSS('opacity','1')
  await page.screenshot({path:'/private/tmp/tracer-refined-synthesize.png'})
  expect(errors).toEqual([])
})

for (const role of [false,true,'super'] as const) {
  test(`sidebar Dashboard is teacher-only and points to the teacher dashboard (${role})`,async({context,page})=>{
    await seed(context,page,role)
    const sidebar=page.getByRole('complementary',{name:'Study navigation'})
    await sidebar.hover()
    const dashboard=sidebar.getByRole('link',{name:'Dashboard',exact:true})
    if (!role) await expect(dashboard).toHaveCount(0)
    else await expect(dashboard).toHaveAttribute('href','/teacher')
  })
}

test('fullscreen study returns to the prior page with its content', async ({context,page}) => {
  const errors=await seed(context,page)
  await page.locator('main').getByRole('link',{name:'Biology 2',exact:true}).click()
  await expect(page).toHaveURL(/\/set\/00000000-0000-4000-8000-000000000082$/)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.screenshot({ path: '/private/tmp/tracer-set-review.png' })
  await page.getByRole('link',{name:'Open Flashcards fullscreen'}).click()
  await page.screenshot({ path: '/private/tmp/tracer-fullscreen-review.png' })
  await expect(page).toHaveURL(/-flashcards$/)
  await page.getByRole('button',{name:'Back',exact:true}).click()
  await expect(page).toHaveURL(/\/set\/00000000-0000-4000-8000-000000000082$/)
  await expect(page.getByRole('heading',{name:'Biology 2',exact:true,level:1})).toBeVisible()
  expect(errors).toEqual([])
})

test('public catalog cards match home card widths', async ({ context, page }) => {
  await seed(context, page)
  await context.route('**/rest/v1/rpc/search_published_sets', route => route.fulfill({ json: Array.from({ length: 6 }, (_, i) => ({ id: `public-${i}`, title: `Public ${i}`, description: 'A set', publisher_name: 'Teacher', created_at: '2026-01-01' })) }))
  for (const width of [700, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const homeCard = page.locator('main .library-card').first()
    await expect(homeCard).toBeVisible()
    const homeWidth = (await homeCard.boundingBox())!.width
    await page.goto('/library')
    const libraryCard = page.locator('main .library-card').first()
    await expect(libraryCard).toBeVisible()
    expect(Math.abs((await libraryCard.boundingBox())!.width - homeWidth)).toBeLessThanOrEqual(1)
    await page.goto('/public-sets')
    const publicCard = page.locator('main .library-card').first()
    await expect(publicCard).toBeVisible()
    expect(Math.abs((await publicCard.boundingBox())!.width - homeWidth)).toBeLessThanOrEqual(1)
  }
})

test('flashcard settings use compact icon controls in inline and fullscreen views', async ({ context, page }) => {
  await seed(context, page)
  await page.locator('main').getByRole('link', { name: 'Biology 2', exact: true }).click()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  let menu = page.locator('.flashcard-settings-menu:visible')
  await expect(menu.locator('.settings-icon')).toHaveCount(3)
  await expect(menu.locator('.settings-icon svg').first()).toHaveAttribute('width', '16')
  await menu.getByRole('menuitemcheckbox', { name: 'Shuffle' }).click()
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  await expect(menu.getByRole('menuitemcheckbox', { name: 'Shuffle' })).toHaveAttribute('aria-checked', 'true')
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  await page.getByRole('link', { name: 'Open Flashcards fullscreen' }).click()
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  menu = page.locator('.flashcard-settings-menu:visible')
  await expect(menu.locator('.settings-icon')).toHaveCount(3)
  await expect(menu.locator('.settings-icon svg').first()).toHaveAttribute('width', '16')
})

test('public catalog places popular topic rows before the remaining sets', async ({ context, page }) => {
  await seed(context, page)
  const item = (id: string) => ({ id, title: `Public ${id}`, description: 'A set', publisher_name: 'Teacher', created_at: '2026-01-01', tags: ['science'] })
  await context.route('**/rest/v1/rpc/popular_published_sets', route => route.fulfill({ json: [{ ...item('featured'), topic: 'science' }] }))
  await context.route('**/rest/v1/rpc/search_published_sets', route => route.fulfill({ json: [item('featured'), item('other')] }))
  await page.goto('/public-sets')
  await expect(page.getByRole('heading', { name: 'Science', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'More sets', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /Public featured/ })).toHaveCount(1)
  await expect(page.getByRole('link', { name: /Public other/ })).toHaveCount(1)
})

test('practice uses a compact settings menu and matches the inline flashcard surface', async ({ context, page }) => {
  await seed(context, page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/set/00000000-0000-4000-8000-000000000082')
  const card = page.locator('section[aria-label="Flashcards"]:visible .relative.mt-3 > button').first()
  await expect(card).toBeVisible()
  const cardColor = await card.evaluate(el => getComputedStyle(el).backgroundColor)
  await page.goto('/set/00000000-0000-4000-8000-000000000082?mode=learn')
  const question = page.locator('.study-panel--practice .tracer-practice-card')
  await expect(question).toBeVisible()
  expect(await question.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(cardColor)
  await page.getByRole('button', { name: 'Practice settings', exact: true }).click()
  const menu = page.getByRole('dialog', { name: 'Practice and test settings' })
  await expect(menu).toBeVisible()
  expect((await menu.boundingBox())!.width).toBeLessThan(320)
  await menu.getByRole('button', { name: 'Written', exact: true }).click()
  await expect(menu.getByRole('button', { name: 'Written', exact: true })).toHaveAttribute('aria-pressed', 'false')
  await menu.getByRole('button', { name: 'Close practice settings' }).click()
  await page.goto('/set/00000000-0000-4000-8000-000000000082-learn')
  await expect(page.locator('.tracer-practice-card')).toBeVisible()
  const height = (await page.locator('.tracer-practice-card').boundingBox())!.height
  expect(height).toBeGreaterThan(400)
  expect(height).toBeLessThan(550)
})

test('fullscreen written answers sit at the bottom with a soft disabled check button', async ({ context, page }) => {
  await seed(context, page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/set/00000000-0000-4000-8000-000000000082-learn')
  await page.getByRole('button', { name: 'Practice settings', exact: true }).click()
  const menu = page.getByRole('dialog', { name: 'Practice and test settings' })
  await menu.getByRole('button', { name: 'Multiple choice', exact: true }).click()
  await menu.getByRole('button', { name: 'True / false', exact: true }).click()
  await menu.getByRole('button', { name: 'Restart practice', exact: true }).click()
  const card = page.locator('.tracer-practice-card')
  const answer = page.getByPlaceholder('Type your answer…')
  const check = page.getByRole('button', { name: 'Check', exact: true })
  await expect(check).toBeDisabled()
  const [cardBox, answerBox, checkBox] = await Promise.all([card.boundingBox(), answer.boundingBox(), check.boundingBox()])
  expect(cardBox && answerBox && checkBox).toBeTruthy()
  expect(checkBox!.x - (answerBox!.x + answerBox!.width)).toBeGreaterThanOrEqual(15)
  expect(cardBox!.y + cardBox!.height - (checkBox!.y + checkBox!.height)).toBeLessThanOrEqual(36)
  const colors = await check.evaluate(el => ({ color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }))
  expect(colors.color).toBe('rgb(100, 116, 139)')
  expect(colors.background).toBe('rgb(241, 245, 249)')
})

test('home study shortcut has set page in back and forward history', async ({ context, page }) => {
  await seed(context, page)
  const card = page.locator('main .library-card').filter({ hasText: 'Biology 2' })
  await card.getByRole('link', { name: 'Flashcards' }).click()
  await expect(page).toHaveURL(/-flashcards$/)
  await page.getByRole('button', { name: 'Back', exact: true }).click()
  await expect(page).toHaveURL(/\/set\/00000000-0000-4000-8000-000000000082$/)
  await page.keyboard.press('Meta+]')
  await expect(page).toHaveURL(/-flashcards$/)
  await page.keyboard.press('Meta+[')
  await expect(page).toHaveURL(/\/set\/00000000-0000-4000-8000-000000000082$/)
  await expect(page.getByRole('heading', { name: 'Biology 2', exact: true, level: 1 })).toBeVisible()
  await page.keyboard.press('Meta+[')
  await expect(page).toHaveURL(/\/$/)
})

test('completed flashcards share the result overview inline and fullscreen', async ({ context, page }) => {
  await seed(context, page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/set/00000000-0000-4000-8000-000000000082')
  await page.locator('.study-panel:visible').getByRole('button', { name: 'Got it', exact: true }).click()
  await expect(page.locator('.study-panel:visible').getByRole('heading', { name: 'Good job!' })).toBeVisible()
  await expect(page.locator('.study-panel:visible').getByRole('img', { name: /1 correct/ })).toBeVisible()
  await page.goto('/set/00000000-0000-4000-8000-000000000081-flashcards')
  await page.getByRole('button', { name: 'Got it', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Good job!' })).toBeVisible()
  await expect(page.getByRole('img', { name: /1 correct/ })).toBeVisible()
})

test('a missing private study guide can be generated and reopened', async ({ context, page }) => {
  await seed(context, page)
  await context.route('**/api/ai/requests', route => route.fulfill({ contentType: 'text/event-stream', body: 'data: {"type":"result","text":"# Cell guide\\n\\nA cell is the basic unit of life."}\n\ndata: {"type":"done","usage":{}}\n\n' }))
  await page.goto('/set/00000000-0000-4000-8000-000000000082')
  await page.getByRole('link', { name: 'Study guide', exact: true }).first().click()
  await expect(page.getByRole('heading', { name: 'No study guide yet' })).toBeVisible()
  await page.getByRole('button', { name: 'Generate one' }).click()
  await expect(page.getByRole('heading', { name: 'Cell guide' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Cell guide' })).toBeVisible()
})

test('first-run uses a roomy form and unobtrusive secondary controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/first-run')
  await expect(page.getByRole('heading', { name: 'Setup Tracer' })).toBeVisible()
  await expect(page.getByLabel('Email or username')).toBeVisible()
  const form = page.locator('main > .auth-content')
  expect((await form.boundingBox())!.width).toBeGreaterThan(400)
  await expect(page.getByRole('button', { name: 'Show password' })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(page.getByRole('button', { name: /Need an account/ })).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
})

test('practice and match use the shared result overview', async ({ context, page }) => {
  await seed(context, page)
  await page.goto('/set/00000000-0000-4000-8000-000000000083-learn')
  await page.getByRole('button', { name: 'Practice settings', exact: true }).click()
  const settings = page.getByRole('dialog', { name: 'Practice and test settings' })
  await settings.getByRole('button', { name: 'Multiple choice', exact: true }).click()
  await settings.getByRole('button', { name: 'Written', exact: true }).click()
  await settings.getByRole('button', { name: 'Restart practice', exact: true }).click()
  await page.getByRole('button', { name: 'True', exact: true }).click()
  await expect(page.locator('.result-overview')).toBeVisible()
  await expect(page.locator('.result-overview').getByRole('img')).toBeVisible()
  await page.goto('/set/00000000-0000-4000-8000-000000000084-match')
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  const tiles = page.locator('[data-match-tile="true"]')
  await expect(tiles).toHaveCount(2)
  await tiles.nth(0).click(); await tiles.nth(1).click()
  await expect(page.locator('.result-overview')).toBeVisible()
  await expect(page.locator('.result-overview').getByRole('img')).toBeVisible()
})

test('submitted tests use the shared result overview', async ({ context, page }) => {
  await seed(context, page)
  await page.goto('/set/00000000-0000-4000-8000-000000000085-test?types=true_false&count=1&seed=1')
  await page.getByRole('button', { name: 'True', exact: true }).click()
  await page.getByRole('button', { name: 'Submit test', exact: true }).click()
  await expect(page.locator('.result-overview')).toBeVisible()
  await expect(page.locator('.result-overview').getByRole('img')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Restart test' })).toBeVisible()
})

test('published set edit offers an owner-confirmed unpublish action', async ({ context, page }) => {
  await seed(context, page)
  const id = '00000000-0000-4000-8000-000000000099'
  let removed = false
  await context.route('**/rest/v1/published_sets?**', route => {
    if (route.request().method() === 'DELETE') { removed = true; return route.fulfill({ json: { id } }) }
    return route.fulfill({ json: { id, title: 'Published fixture', description: null, publisher_name: 'Owner', publisher_username: 'owner', publisher_is_dev: false, tags: [], allow_copying: true, card_count: 1, terms: [{ id: 'term', front: 'Term', back: 'Definition' }], created_at: '2026-01-01', updated_at: '2026-01-01', icon_key: null, icon_tone: null } })
  })
  await page.goto(`/set/${id}/edit?published=1`)
  await page.getByRole('button', { name: 'Unpublish', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Unpublish set?' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Unpublish', exact: true }).click()
  await expect.poll(() => removed).toBe(true)
  await expect(page).toHaveURL(/\/public-sets$/)
})

test('written Practice uses Enter to check and then advance, with a current-question counter', async ({ context, page }) => {
  await seed(context, page)
  await page.goto('/set/demo-learn')
  await page.getByRole('button', { name: 'Practice settings', exact: true }).click()
  const menu = page.getByRole('dialog', { name: 'Practice and test settings' })
  await menu.getByRole('button', { name: 'Multiple choice', exact: true }).click()
  await menu.getByRole('button', { name: 'True / false', exact: true }).click()
  await menu.getByRole('button', { name: 'Restart practice', exact: true }).click()
  const answer = page.locator('#fullscreen-written-answer')
  await expect(answer).toBeVisible()
  await expect(page.locator('main').getByText('1/2', { exact: true })).toBeVisible()
  await answer.fill('an answer')
  await answer.press('Enter')
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page.locator('main').getByText('2/2', { exact: true })).toBeVisible()
  await expect(answer).toBeEnabled()
})

test('flashcard navigation slides out and back in on both study surfaces', async ({ context, page }) => {
  await seed(context, page)
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const path of ['/set/demo', '/set/demo-flashcards']) {
    await page.evaluate(() => localStorage.removeItem('tracer:flashcard-progress:demo'))
    await page.goto(path)
    const next = page.locator('.flashcard-navigation:not(.flashcard-navigation--previous):visible').first()
    await expect(next).toBeEnabled()
    const frames = await next.evaluate(async button => {
      button.click()
      const start = performance.now()
      const samples: { x: number; opacity: number }[] = []
      await new Promise<void>(resolve => {
        const sample = () => {
          const card = Array.from(document.querySelectorAll<HTMLElement>('.animate-card-swipe-left')).find(el => el.getBoundingClientRect().width > 0)
          if (card) {
            const style = getComputedStyle(card)
            samples.push({ x: new DOMMatrixReadOnly(style.transform).m41, opacity: Number(style.opacity) })
          }
          if (performance.now() - start < 320) requestAnimationFrame(sample)
          else resolve()
        }
        requestAnimationFrame(sample)
      })
      return samples
    })
    expect(frames.some(frame => frame.x < -5)).toBe(true)
    expect(frames.some(frame => frame.x > 5)).toBe(true)
    expect(Math.min(...frames.map(frame => frame.opacity))).toBeLessThan(0.2)
  }
})

test('mobile navigation sheet and dedicated search fit the viewport', async ({ context, page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors = await seed(context, page)
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await expect(menu).toBeVisible()
  await menu.click()
  await expect(page.getByRole('complementary', { name: 'Study navigation' }).getByRole('link', { name: 'Synthesize' })).toBeVisible()
  await page.getByRole('complementary', { name: 'Study navigation' }).getByRole('link', { name: 'Synthesize' }).click()
  await expect(page).toHaveURL(/\/create\/synthesize/)
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('banner').getByRole('searchbox', { name: 'Search' }).click()
  await expect(page).toHaveURL(/\/search$/)
  await page.getByRole('banner').getByRole('searchbox', { name: 'Search' }).fill('Biology')
  await expect(page.getByRole('region', { name: /search results/i }).getByText('Biology 0')).toBeVisible()
  await expect(page.getByText('Explore cells, genetics and the living world.')).toHaveCount(0)
  await page.getByRole('button', { name: 'Close search' }).click()
  await expect(page).toHaveURL(/\/create\/synthesize$/)
  expect(errors).toEqual([])
})

test('page navigation animates and respects reduced motion', async ({ context, page }) => {
  await seed(context, page)
  await page.evaluate(() => {
    const seen: string[] = []
    ;(window as any).__pageTransitions = seen
    new MutationObserver(records => {
      for (const record of records) {
        if (record.target instanceof Element && /page-(enter|leave)-active/.test(record.target.className)) seen.push(record.target.className)
      }
    }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] })
  })
  await page.getByRole('link', { name: 'Sets & Guides', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Sets & Guides' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => (window as any).__pageTransitions.some((value: string) => value.includes('page-enter-active')))).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const duration = await page.evaluate(() => {
    const element = document.createElement('div')
    element.className = 'page-enter-active page-enter-from'
    document.body.append(element)
    const result = { duration: getComputedStyle(element).transitionDuration, opacity: getComputedStyle(element).opacity }
    element.remove()
    return result
  })
  expect(duration.duration).toBe('0s')
  expect(duration.opacity).toBe('1')
})
