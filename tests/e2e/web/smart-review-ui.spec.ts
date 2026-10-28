import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  for (const [view, path] of [['embedded', '/set/demo?mode=flashcards'], ['fullscreen', '/set/demo-flashcards']] as const) {
    test(`${view} ${width}px: concise ratings, click feedback, and mobile layout`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      if (view === 'embedded' && width === 390) {
        await page.locator('summary[aria-label="Flashcard settings"]:visible').click()
      } else {
        await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
      }
      await page.getByRole('menuitemcheckbox', { name: 'Smart Review', exact: true }).click()
      const group = page.getByRole('group', { name: 'Rate your recall', exact: true })
      await expect(group).toBeVisible()
      await expect(group.getByRole('button')).toHaveCount(6)
      await expect(page.getByRole('button', { name: 'Got it', exact: true })).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Next', exact: true })).toHaveCount(0)
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      const grade = page.getByRole('button', { name: '4 · Easy', exact: true })
      await grade.scrollIntoViewIfNeeded()
      await page.screenshot({ path: `/tmp/tracer-review-${view}-${width}.png` })
      const box = await grade.boundingBox()
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
      await page.mouse.down()
      await expect.poll(() => grade.evaluate(el => getComputedStyle(el).scale)).toBe('0.98')
      await page.screenshot({ path: `/tmp/tracer-review-${view}-${width}-pressed.png` })
      await page.mouse.up()
      await expect(grade).toBeDisabled()
      await expect(page.getByRole('button', { name: 'Term Term 2', exact: true })).toBeVisible()
    })
  }
}

test('page transitions and reduced motion share accessible timing', async ({ page }) => {
  await page.goto('/settings')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.locator('.page-enter-active')).toBeVisible()
  await page.screenshot({ path: '/tmp/tracer-page-transition.png' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('link', { name: 'Settings', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible()
  await expect(page.locator('.page-enter-active')).toHaveCount(0)
  const toggle = page.getByRole('region', { name: 'Theme', exact: true }).getByRole('button')
  expect(await toggle.evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s')
})
