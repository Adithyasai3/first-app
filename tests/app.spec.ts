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

test('page does not scroll sideways', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})
