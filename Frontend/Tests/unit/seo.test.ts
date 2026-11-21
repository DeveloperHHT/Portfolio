import { describe, expect, it } from 'vitest'
import {
  BODY_MARKER,
  DEFAULT_SITE_URL,
  HEAD_MARKER,
  localisePage,
  normalizeSiteUrl,
  pageUrl,
  renderBody,
  renderHead,
  renderRobots,
  renderSitemap,
} from '../../Scripts/seo'
import { langFromPath, pathForLang, siteRoot } from '../../src/utils/langPath'

const SITE = 'https://example.com/'

describe('normalizeSiteUrl', () => {
  it('falls back to the default and always ends with a slash', () => {
    expect(normalizeSiteUrl(undefined)).toBe(DEFAULT_SITE_URL)
    expect(normalizeSiteUrl('  ')).toBe(DEFAULT_SITE_URL)
    expect(normalizeSiteUrl('https://example.com/site')).toBe('https://example.com/site/')
  })

  it('rejects plain http, except for localhost', () => {
    expect(() => normalizeSiteUrl('http://example.com')).toThrow(/https/)
    expect(normalizeSiteUrl('http://localhost:4173')).toBe('http://localhost:4173/')
  })
})

describe('page head', () => {
  it('points each language at its own canonical address and links the other one', () => {
    const en = renderHead('en', SITE)
    const tr = renderHead('tr', SITE)
    expect(en).toContain('<link rel="canonical" href="https://example.com/" />')
    expect(tr).toContain('<link rel="canonical" href="https://example.com/tr/" />')
    for (const head of [en, tr]) {
      expect(head).toContain('hreflang="en" href="https://example.com/"')
      expect(head).toContain('hreflang="tr" href="https://example.com/tr/"')
      expect(head).toContain('hreflang="x-default"')
      expect(head).toContain('og:image" content="https://example.com/og.png"')
      expect(head).toContain('twitter:card" content="summary_large_image"')
    }
  })

  it('uses Turkish copy and locale for the Turkish page', () => {
    const tr = renderHead('tr', SITE)
    expect(tr).toContain('og:locale" content="tr_TR"')
    expect(tr).toContain('Yapay Zeka Mühendisi')
    expect(renderHead('en', SITE)).toContain('og:locale" content="en_US"')
  })

  it('keeps structured data valid JSON that cannot close its own script tag', () => {
    const head = renderHead('en', SITE)
    const json = head.split('<script type="application/ld+json">')[1].split('</script>')[0]
    const data = JSON.parse(json)
    expect(data['@graph'].map((node: { '@type': string }) => node['@type'])).toEqual(['Person', 'WebSite'])
    expect(json).not.toContain('</')
  })

  it('does not leak e-mail addresses or phone numbers', () => {
    const text = [renderHead('en', SITE), renderHead('tr', SITE), renderBody('en'), renderBody('tr')].join('\n')
    expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+\.\w+/)
    // Profile addresses contain long digit runs, so URLs are left out of the phone check.
    expect(text.replace(/https?:\/\/[^\s"<]+/g, '')).not.toMatch(/\+?\d[\d\s().-]{8,}\d/)
  })
})

describe('crawler files', () => {
  it('lists both languages with alternates in the sitemap', () => {
    const xml = renderSitemap(SITE, '2026-01-01')
    expect(xml.match(/<loc>/g)).toHaveLength(2)
    expect(xml).toContain('<loc>https://example.com/tr/</loc>')
    expect(xml).toContain('<lastmod>2026-01-01</lastmod>')
  })

  it('allows everything and points at the sitemap', () => {
    expect(renderRobots(SITE)).toBe('User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml\n')
  })
})

describe('localisePage', () => {
  const built = [
    '<!doctype html><html lang="en"><head>',
    renderHead('en', SITE),
    '<link rel="icon" href="./favicon.svg" /><script type="module" src="./assets/index.js"></script>',
    '</head><body>',
    renderBody('en'),
    '<div id="root"></div></body></html>',
  ].join('\n')

  it('swaps head and body text and moves file links one folder up', () => {
    const page = localisePage(built, 'tr', SITE)
    expect(page).toContain('<html lang="tr"')
    expect(page).toContain('<link rel="canonical" href="https://example.com/tr/" />')
    expect(page).toContain('href="../favicon.svg"')
    expect(page).toContain('src="../assets/index.js"')
    expect(page.match(new RegExp(HEAD_MARKER[0], 'g'))).toHaveLength(1)
    expect(page.match(new RegExp(BODY_MARKER[0], 'g'))).toHaveLength(1)
    expect(page).not.toContain('rel="canonical" href="https://example.com/" />')
  })

  it('fails loudly when a marker is missing', () => {
    expect(() => localisePage('<html></html>', 'tr', SITE)).toThrow(/marker/)
  })

  it('builds the page address per language', () => {
    expect(pageUrl(SITE, 'en')).toBe('https://example.com/')
    expect(pageUrl(SITE, 'tr')).toBe('https://example.com/tr/')
  })
})

describe('language in the address', () => {
  it('reads Turkish from /tr/ and leaves other paths open', () => {
    expect(langFromPath('/tr/')).toBe('tr')
    expect(langFromPath('/tr')).toBe('tr')
    expect(langFromPath('/Portfolio/tr/')).toBe('tr')
    expect(langFromPath('/')).toBeNull()
    expect(langFromPath('/travel/')).toBeNull()
  })

  it('swaps the path for the other language, also under a sub-path', () => {
    expect(pathForLang('/', 'tr')).toBe('/tr/')
    expect(pathForLang('/tr/', 'en')).toBe('/')
    expect(pathForLang('/Portfolio/', 'tr')).toBe('/Portfolio/tr/')
    expect(pathForLang('/Portfolio/tr/', 'en')).toBe('/Portfolio/')
    expect(pathForLang('/tr/', 'tr')).toBe('/tr/')
    expect(pathForLang('/index.html', 'tr')).toBe('/tr/')
  })

  it('finds the folder the site is served from', () => {
    expect(siteRoot('/')).toBe('/')
    expect(siteRoot('/tr/')).toBe('/')
    expect(siteRoot('/tr/index.html')).toBe('/')
    expect(siteRoot('/Portfolio/tr/')).toBe('/Portfolio/')
    expect(siteRoot('/Portfolio/index.html')).toBe('/Portfolio/')
  })
})
