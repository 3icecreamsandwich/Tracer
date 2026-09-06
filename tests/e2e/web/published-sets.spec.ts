import { test, expect } from '@playwright/test'
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
const fixture = {
  id,
  title: 'Introduction to Biology',
  description: 'Cells, ecosystems, and the living world.',
  publisher_name: 'Alex',
  tags: ['science'],
  allow_copying: false,
  card_count: 2,
  created_at: '2026-09-01T12:00:00Z',
  updated_at: '2026-09-01T12:00:00Z',
  terms: [
    { id: 'bio-one', front: 'Cell', back: 'The basic unit of life' },
    { id: 'bio-two', front: 'Ecosystem', back: 'A community and its environment' },
  ],
  icon_key: null,
  icon_tone: null,
}
test('share dialog: tags, copying switch, sign-in error, focus and Escape', async ({ page }) => {
  await page.goto('/set/demo')
  const trigger = page.getByRole('button', { name: 'Share', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Share', exact: true })
  await expect(dialog.getByRole('button', { name: 'Close', exact: true }).last()).toBeFocused()
  await expect(dialog.locator('textarea')).toHaveValue('Term 1\tDefinition 1\nTerm 2\tDefinition 2')
  await dialog.getByRole('button', { name: 'Publish', exact: true }).click()
  await expect(dialog.getByRole('button', { name: 'Publish Now' })).toBeVisible()
  await dialog.getByRole('button', { name: 'Science', exact: true }).click()
  await expect(dialog.getByRole('button', { name: 'Science', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await dialog.getByRole('switch', { name: 'Allow copying' }).uncheck()
  await dialog.getByRole('button', { name: 'Publish Now' }).click()
  await expect(dialog.getByRole('alert')).toContainText('Sign in')
  await expect(dialog.getByRole('switch', { name: 'Allow copying' })).not.toBeChecked()
  await page.screenshot({ path: '/tmp/tracer-share-publish.png', animations: 'disabled' })
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})
test('catalog paginates summaries and public viewer enforces publisher actions', async ({
  page,
}) => {
  const requests: any[] = []
  await page.route('**/rest/v1/rpc/search_published_sets', async (route) => {
    const body = route.request().postDataJSON()
    requests.push(body)
    let rows = body.before_id
      ? []
      : Array.from({ length: 37 }, (_, i) => ({
          ...fixture,
          id: i ? `aaaaaaaa-aaaa-4aaa-8aaa-${String(i).padStart(12, '0')}` : id,
          title: i ? `Biology chapter ${i}` : fixture.title,
        }))
    if (body.search_text) rows = body.search_text === 'biology' ? [fixture] : []
    if (body.selected_tags.includes('math')) rows = []
    await route.fulfill({ json: rows.map(({ terms, ...summary }) => summary) })
  })
  await page.route('**/rest/v1/published_sets?*', (route) => route.fulfill({ json: fixture }))
  await page.goto('/public-sets')
  await expect(page.getByRole('link', { name: /Introduction to Biology/ })).toBeVisible()
  expect(requests[0].page_size).toBe(37)
  await expect(page.locator('main ul > li')).toHaveCount(36)
  await page.screenshot({ path: '/tmp/tracer-public-catalog.png', fullPage: false })
  await page.getByRole('button', { name: 'Load more', exact: true }).scrollIntoViewIfNeeded()
  await expect.poll(() => requests.some((r) => r.before_id)).toBe(true)
  await page.getByRole('searchbox', { name: 'Search published sets…' }).fill('biology')
  await expect(page.locator('main ul > li')).toHaveCount(1)
  await page.getByRole('button', { name: 'Filter by subject' }).click()
  await page.getByRole('button', { name: 'Math', exact: true }).click()
  await expect(page.getByText('No sets match your search.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('main ul > li')).toHaveCount(1)
  await page.getByRole('link', { name: /Introduction to Biology/ }).click()
  await expect(page.getByRole('heading', { name: fixture.title })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Edit', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Cell|Ecosystem/ })).toBeVisible()
  await page.getByRole('button', { name: 'Share', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Share' })
  await expect(
    dialog.getByText('The publisher has disabled copying and downloading.'),
  ).toBeVisible()
  await expect(dialog.getByRole('button', { name: /Copy|Download|Publish/ })).toHaveCount(0)
  await expect(dialog.locator('textarea')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await page.getByRole('link', { name: /Match/ }).first().click()
  await expect(page).toHaveURL(/public-sets\/.*mode=match/)
  await expect(page.getByRole('heading', { name: fixture.title })).toBeVisible()
})
test('copy-enabled public set shares without publishing; failure never becomes demo', async ({
  page,
}) => {
  await page.route('**/rest/v1/published_sets?*', (route) =>
    route.fulfill({ json: { ...fixture, allow_copying: true } }),
  )
  await page.goto(`/public-sets/${id}`)
  await page.getByRole('button', { name: 'Share', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Share' })
  await expect(dialog.getByRole('button', { name: 'Copy', exact: true })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Download', exact: true })).toBeVisible()
  await expect(dialog.getByRole('button', { name: /Publish/ })).toHaveCount(0)
  await page.unroute('**/rest/v1/published_sets?*')
  await page.route('**/rest/v1/published_sets?*', (route) =>
    route.fulfill({ status: 404, json: { message: 'Not found' } }),
  )
  await page.goto(`/public-sets/${id}`)
  await expect(page.getByText('Could not load published sets.', { exact: false })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Demo set' })).toHaveCount(0)
})
test('shared modal traps focus and restores page scrolling', async ({ page }) => {
  await page.goto('/set/demo')
  const trigger = page.getByRole('button', { name: 'Share', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Share', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close', exact: true }).last()).toBeFocused()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Publish', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close', exact: true }).last()).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})
test('publish submits chosen settings and preserves an existing publication preference', async ({
  page,
}) => {
  let payload: any
  const userId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
  await page.route('**/auth/v1/user', (route) =>
    route.fulfill({
      json: {
        id: userId,
        aud: 'authenticated',
        role: 'authenticated',
        email: 'fixture@example.test',
        user_metadata: {},
      },
    }),
  )
  await page.route('**/rest/v1/profiles?*', (route) =>
    route.fulfill({ json: { display_name: 'Alex' } }),
  )
  await page.route('**/rest/v1/published_sets?*', async (route) => {
    if (route.request().method() === 'POST') {
      payload = route.request().postDataJSON()
      await route.fulfill({ json: { id } })
    } else await route.fulfill({ json: { tags: ['science'], allow_copying: false } })
  })
  await page.goto('/set/cccccccc-cccc-4ccc-8ccc-cccccccccccc')
  const token = [
    Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({ sub: userId, exp: 4102444800, role: 'authenticated' })).toString(
      'base64url',
    ),
    Buffer.from('fixture').toString('base64url'),
  ].join('.')
  await page.evaluate(async (token) => {
    const modulePath =
      performance
        .getEntriesByType('resource')
        .map((entry) => entry.name)
        .find((name) => name.includes('/src/composables/auth/client.ts')) ??
      '/_nuxt/src/composables/auth/client.ts'
    const { getSupabaseClient } = await import(modulePath)
    const result = await getSupabaseClient().auth.setSession({
      access_token: token,
      refresh_token: 'fixture-refresh',
    })
    if (result.error) throw result.error
  }, token)
  await page.getByRole('button', { name: 'Share', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Share' })
  await dialog.getByRole('button', { name: 'Publish', exact: true }).click()
  await expect(dialog.getByRole('button', { name: 'Science', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(dialog.getByRole('switch', { name: 'Allow copying' })).not.toBeChecked()
  await dialog.getByRole('button', { name: 'Math', exact: true }).click()
  await dialog.getByRole('button', { name: 'Publish Now', exact: true }).click()
  await expect(dialog.getByText('Your set is published.')).toBeVisible()
  expect(payload).toMatchObject({
    publisher_id: userId,
    allow_copying: false,
    tags: ['science', 'math'],
    title: 'Demo set',
  })
  expect(payload.terms).toHaveLength(2)
  await expect(dialog.getByRole('link', { name: 'View published set' })).toHaveAttribute(
    'href',
    `/public-sets/${id}`,
  )
})

test('edit page updates existing public content without changing publication permissions', async ({
  page,
}) => {
  const userId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
  const sourceId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'
  let patch: any
  let failUpdate = true
  let verifyRequests = 0
  await page.route('**/auth/v1/user', (route) => {
    verifyRequests++
    return route.fulfill({
      json: {
        id: userId,
        aud: 'authenticated',
        role: 'authenticated',
        email: 'fixture@example.test',
        user_metadata: {},
      },
    })
  })
  await page.route('**/rest/v1/profiles?*', (route) =>
    route.fulfill({ json: { display_name: 'Alex' } }),
  )
  await page.route('**/rest/v1/published_sets?*', (route) => {
    if (route.request().method() === 'PATCH') {
      patch = route.request().postDataJSON()
      if (failUpdate)
        return route.fulfill({
          status: 503,
          json: { message: 'Publication temporarily unavailable' },
        })
      return route.fulfill({ json: { id } })
    }
    return route.fulfill({ json: { id, tags: ['science'], allow_copying: false } })
  })
  await page.addInitScript(
    ({ sourceId, userId, terms }) => {
      const writes: any[] = []
      ;(window as any).__testLocalWrites = writes
      ;(window as any).__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener() {} }
      ;(window as any).__TAURI_INTERNALS__ = {
        metadata: { currentWindow: { label: 'main' }, currentWebview: { label: 'main' } },
        transformCallback: () => 1,
        unregisterCallback() {},
        invoke: async (command: string, args: any = {}) => {
          if (command === 'lock_get_status')
            return {
              has_verifier: true,
              requires_unlock: false,
              can_auto_unlock: true,
              vault_mode: 'device_key',
            }
          if (command === 'plugin:sql|select') {
            if (args.query.includes('FROM profile'))
              return [
                {
                  id: 'profile',
                  name: 'Alex',
                  email: 'fixture@example.test',
                  supabase_user_id: userId,
                  created_at: '2026-09-01',
                },
              ]
            if (args.query.includes('FROM app_settings'))
              return [
                {
                  startup_lock_enabled: 0,
                  language: 'en',
                  floating_chat_enabled: 0,
                  fallback_model_ids: '[]',
                },
              ]
            if (args.query.includes('FROM flashcard_sets'))
              return [
                {
                  id: sourceId,
                  title: 'Demo set',
                  description: 'Local fixture',
                  terms_json: JSON.stringify(terms),
                  created_at: '2026-09-01',
                  updated_at: '2026-09-01',
                },
              ]
            return []
          }
          if (command === 'plugin:sql|execute') {
            writes.push(args)
            return [1, 0]
          }
          if (command === 'plugin:event|listen') return 1
          return null
        },
      }
    },
    { sourceId, userId, terms: fixture.terms },
  )
  await page.goto(`/set/${sourceId}`)
  await expect(page.getByRole('heading', { name: 'Demo set' })).toBeVisible()
  const token = [
    Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({ sub: userId, exp: 4102444800, role: 'authenticated' })).toString(
      'base64url',
    ),
    Buffer.from('fixture').toString('base64url'),
  ].join('.')
  await page.evaluate(async (token) => {
    const modulePath =
      performance
        .getEntriesByType('resource')
        .map((entry) => entry.name)
        .find((name) => name.includes('/src/composables/auth/client.ts')) ??
      '/_nuxt/src/composables/auth/client.ts'
    const { getSupabaseClient } = await import(modulePath)
    const result = await getSupabaseClient().auth.setSession({
      access_token: token,
      refresh_token: 'fixture-refresh',
    })
    if (result.error) throw result.error
  }, token)
  const bootstrapVerifications = verifyRequests
  await page.getByRole('link', { name: 'Edit', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Update published version', exact: true }),
  ).toBeVisible()
  await page.locator('#set-title').fill('Updated biology')
  await page.getByRole('button', { name: 'Update published version', exact: true }).click()
  await expect(page.getByRole('status').filter({ hasText: 'Local edits saved.' })).toBeVisible()
  await expect(page.locator('#set-title')).toHaveValue('Updated biology')
  await expect(page).toHaveURL(/\/edit$/)
  failUpdate = false
  await page.getByRole('button', { name: 'Update published version', exact: true }).click()

  await expect(
    page.getByRole('status').filter({ hasText: 'Published version updated.' }),
  ).toBeVisible()
  expect(
    await page.evaluate(() =>
      (window as any).__testLocalWrites.some(
        (write: any) =>
          write.query.includes('UPDATE flashcard_sets') && write.values.includes('Updated biology'),
      ),
    ),
  ).toBe(true)
  expect(patch.title).toBe('Updated biology')
  expect(patch.terms).toHaveLength(2)
  expect(patch).not.toHaveProperty('allow_copying')
  expect(patch).not.toHaveProperty('tags')
  expect(verifyRequests).toBe(bootstrapVerifications)
  await expect(page).toHaveURL(/\/edit$/)
  await page.screenshot({ path: '/tmp/tracer-edit-published.png', animations: 'disabled' })
})

test('home destination styling and public prefetch skip account requests', async ({ page }) => {
  let catalogRequests = 0,
    accountRequests = 0
  await page.route('**/rest/v1/rpc/search_published_sets', (route) => {
    catalogRequests++
    return route.fulfill({ json: [] })
  })
  await page.route('**/auth/v1/**', (route) => {
    accountRequests++
    return route.abort()
  })
  await page.goto('/')
  const link = page.getByRole('link', { name: /Public sets/ })
  await expect(link).toBeVisible()
  await expect(link).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await page.screenshot({ path: '/tmp/tracer-home-destinations.png', animations: 'disabled' })
  await link.hover()
  await expect.poll(() => catalogRequests).toBe(1)
  await link.click()
  await expect(page.getByText('No published sets yet.', { exact: false })).toBeVisible()
  expect(catalogRequests).toBe(1)
  expect(accountRequests).toBe(0)
})
