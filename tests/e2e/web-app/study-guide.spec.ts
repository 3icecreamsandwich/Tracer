import { test, expect } from '@playwright/test'

test('public guide opens without signing in and renders content after a code example', async ({ context, page }) => {
  const id = '00000000-0000-4000-8000-000000000099'
  await context.route('**/rest/v1/published_sets?**', route => route.fulfill({ json: {
    id, title: 'Java guide fixture', description: null, publisher_name: 'Teacher',
    publisher_username: null, publisher_is_dev: false, tags: [], allow_copying: true,
    card_count: 1, terms: [{ id: 'card', front: 'Class', back: 'Blueprint' }],
    created_at: '2026-01-01', updated_at: '2026-01-01', icon_key: null, icon_tone: null,
    study_guide_markdown: '# Complete guide\n\n```java\nSystem.out.println("Hello");\n```\n\n## Final summary\nThis content must remain visible.',
  } }))
  await page.goto(`/study-guide/${id}?published=1`)
  await expect(page).toHaveURL(new RegExp(`/study-guide/${id}\\?published=1`))
  await expect(page.getByRole('heading', { name: 'Final summary' })).toBeVisible()
  await expect(page.locator('pre code')).toContainText('System.out.println')
  await expect(page.getByTestId('linked-set-link')).toHaveAttribute('href', `/public-sets/${id}`)
  await page.setViewportSize({ width: 320, height: 844 })
  const goToSet = page.getByRole('link', { name: 'Go to set' })
  await expect(goToSet).toBeVisible()
  await expect(goToSet.locator('span')).toBeHidden()
  await expect(goToSet.locator('svg')).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Final summary' })).toBeVisible()
})

test('a public set without a guide still offers the generate screen', async ({ context, page }) => {
  const id = '00000000-0000-4000-8000-000000000098'
  await context.route('**/rest/v1/published_sets?**', route => route.fulfill({ json: {
    id, title: 'No guide fixture', description: null, publisher_name: 'Teacher', publisher_username: null,
    publisher_is_dev: false, tags: [], allow_copying: true, card_count: 1,
    terms: [{ id: 'card', front: 'Term', back: 'Definition' }], created_at: '2026-01-01', updated_at: '2026-01-01',
    icon_key: null, icon_tone: null, study_guide_markdown: null,
  } }))
  await page.goto(`/study-guide/${id}?published=1`)
  await expect(page.getByRole('heading', { name: 'No study guide yet' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Generate one' })).toBeVisible()
})
