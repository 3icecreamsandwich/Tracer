import { test, expect } from '@playwright/test'

test('study guide: navigates from set page and renders markdown blocks', async ({ page }) => {
  await page.goto('/set/demo')

  await expect(page.getByRole('heading', { name: 'Demo set' })).toBeVisible()

  await page.getByRole('link', { name: 'Study guide' }).click()
  await expect(page).toHaveURL(/\/study-guide\//)

  await expect(page.getByRole('heading', { name: 'Study guide', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Demo study guide' })).toBeVisible()
  await expect(page.locator('[data-testid="markdown-renderer"] strong')).toContainText('bold Markdown')
  await expect(page.getByText('**bold Markdown**')).toHaveCount(0)

  await expect(page.getByRole('list')).toBeVisible()
  await expect(page.getByRole('listitem').first()).toContainText('Lists render')

  const table = page.getByRole('table')
  await expect(table).toBeVisible()
  await expect(table.getByRole('columnheader', { name: 'Topic' })).toBeVisible()
  await expect(table.getByRole('cell', { name: 'Render correctly' })).toBeVisible()

  const code = page.locator('pre code')
  await expect(code).toBeVisible()
  await expect(code).toContainText('const demo = true')
})
