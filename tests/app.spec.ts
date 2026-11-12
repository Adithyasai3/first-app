import { test, expect } from '@playwright/test'

test('dashboard loads with the main heading', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('first-app')
  await expect(page.getByRole('heading', { level: 1, name: 'Setup status' })).toBeVisible()
})

test('shows all six setup phases', async ({ page }) => {
  await page.goto('/')
  const phases = page.getByRole('region', { name: 'Setup phases' }).getByRole('article')
  await expect(phases).toHaveCount(6)
  await expect(page.getByRole('heading', { level: 2, name: 'Local AI' })).toBeVisible()
})

test('summary counts verified and skipped checks', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('summary')).toHaveText('12 of 13 checks verified · 1 skipped')
})

test('each phase card shows its own progress badge', async ({ page }) => {
  await page.goto('/')
  const runtimes = page.getByRole('article', { name: 'Runtimes & packages' })
  await expect(runtimes.locator('.phase-progress')).toHaveText('2/3 verified')
  const localAi = page.getByRole('article', { name: 'Local AI' })
  await expect(localAi.locator('.phase-progress')).toHaveText('1/1 verified')
})

test('progress badges stay inside their cards on a 300px screen', async ({ page }) => {
  await page.setViewportSize({ width: 300, height: 640 })
  await page.goto('/')
  const spills = await page.locator('.phase-card').evaluateAll((cards) =>
    cards
      .map((card) => {
        const badge = card.querySelector('.phase-progress')
        if (!badge) return 'missing badge'
        const c = card.getBoundingClientRect()
        const b = badge.getBoundingClientRect()
        return b.right <= c.right + 0.5 && b.left >= c.left - 0.5 ? null : card.querySelector('h2')?.textContent
      })
      .filter(Boolean),
  )
  expect(spills).toEqual([])
})

for (const width of [undefined, 320]) {
  test(`page does not scroll sideways${width ? ` at ${width}px` : ''}`, async ({ page }) => {
    if (width) await page.setViewportSize({ width, height: 640 })
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
