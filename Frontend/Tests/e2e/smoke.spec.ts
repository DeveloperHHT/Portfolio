import { expect, test } from '@playwright/test'

const SECTIONS = ['hero', 'about', 'focus', 'experience', 'work', 'stack', 'offduty', 'contact']

test.describe('portfolio smoke', () => {
  test('renders every section without console errors or horizontal overflow', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))

    await page.goto('/')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached()
    await expect(page.locator('h1')).toContainText('Tayap')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBe(0)
    expect(errors).toEqual([])
  })

  test('language and theme switches persist', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const before = await html.getAttribute('data-theme')
    await page.getByRole('button', { name: /theme|tema/i }).first().click()
    await expect(html).not.toHaveAttribute('data-theme', before ?? '')

    await page.getByRole('button', { name: /^TR$/ }).first().click()
    await expect(page.locator('#about')).toContainText('Hakkımda')
    await page.reload()
    await expect(page.locator('#about')).toContainText('Hakkımda')
  })

  test('agent terminal and pipeline play when scrolled into view', async ({ page }) => {
    await page.goto('/')
    await page.locator('.terminal').scrollIntoViewIfNeeded()
    await expect(page.locator('.terminal')).toHaveClass(/is-visible/)
    await expect(page.locator('.terminal__done')).toBeVisible()
    await expect(page.locator('.pipeline__step')).toHaveCount(5)
  })

  test('spotify embed stays unloaded until clicked', async ({ page }) => {
    const spotify: string[] = []
    page.on('request', (r) => r.url().includes('spotify.com') && spotify.push(r.url()))
    await page.goto('/')
    await page.locator('#offduty').scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    expect(spotify).toEqual([])
  })
})

test.describe('language addresses and search files', () => {
  test('/tr/ opens in Turkish with working images, canonical and hreflang', async ({ page }) => {
    const errors: string[] = []
    const failed: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`))

    await page.goto('/tr/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    await expect(page.locator('#about')).toContainText('Hakkımda')
    await expect(page).toHaveTitle(/Yapay Zeka/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/tr\/$/)
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/)

    await expect(page.locator('.hero__avatar-img')).toBeVisible()
    const portraitLoaded = await page.locator('.hero__avatar-img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
    expect(portraitLoaded).toBe(true)
    expect(failed).toEqual([])
    expect(errors).toEqual([])
  })

  test('switching language moves the address between / and /tr/', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('lang'))
    await page.getByRole('button', { name: /^TR$/ }).first().click()
    await expect(page).toHaveURL(/\/tr\/$/)
    await page.getByRole('button', { name: /^EN$/ }).first().click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page).not.toHaveURL(/\/tr\//)
    await expect(page.locator('#about')).toContainText('About')
  })

  test('the English page carries the share preview and structured data', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('lang', 'en'))
    await page.reload()
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /AI Engineer/)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    const json = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(json ?? '{}')['@graph'][0]['@type']).toBe('Person')
  })

  test('robots.txt, sitemap.xml and og.png are served', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.ok()).toBe(true)
    expect(await robots.text()).toContain('Sitemap:')
    const sitemap = await request.get('/sitemap.xml')
    expect(await sitemap.text()).toContain('/tr/')
    const og = await request.get('/og.png')
    expect(og.headers()['content-type']).toContain('image/png')
  })
})
