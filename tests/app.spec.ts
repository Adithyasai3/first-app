import { test, expect } from '@playwright/test'

test('home page loads with the main heading', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('first-app')
  await expect(page.getByRole('heading', { level: 1, name: 'Get started' })).toBeVisible()
})

test('counter button increments on click', async ({ page }) => {
  await page.goto('/')
  const counter = page.getByRole('button', { name: /Count is/ })
  await expect(counter).toHaveText('Count is 0')
  await counter.click()
  await counter.click()
  await expect(counter).toHaveText('Count is 2')
})

test('page does not scroll sideways', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})
