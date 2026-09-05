import { test, expect } from '@playwright/test'

test('global Smart Review changes supersede local overrides in both flashcard views', async ({ page }) => {
  await page.goto('/settings')
  const toggle = page.getByRole('region', { name: 'Flashcards · Smart Review', exact: true }).getByRole('button')
  await expect(toggle).toHaveText('Off')
  await toggle.click()
  await expect(toggle).toHaveText('On')

  await page.goto('/set/demo?mode=flashcards')
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  const localToggle = page.getByRole('menuitemcheckbox', { name: 'Smart Review' })
  await expect(localToggle).toHaveAttribute('aria-checked', 'true')
  await localToggle.click()
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  await expect(localToggle).toHaveAttribute('aria-checked', 'false')

  await page.goto('/settings')
  await toggle.click()
  await expect(toggle).toHaveText('Off')
  await toggle.click()
  await expect(toggle).toHaveText('On')

  for (const path of ['/set/demo?mode=flashcards', '/set/demo-flashcards']) {
    await page.goto(path)
    await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
    await expect(page.getByRole('menuitemcheckbox', { name: 'Smart Review' })).toHaveAttribute('aria-checked', 'true')
  }
})
