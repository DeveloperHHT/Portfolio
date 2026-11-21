import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { en } from '../src/content/en'
import { tr } from '../src/content/tr'
import type { Content, Lang } from '../src/content/types'

/**
 * Search and sharing metadata, built from the same content files as the page.
 *
 * - `index.html` holds two markers. This plugin fills them with the English head and fallback text.
 * - After the build it writes `tr/index.html` (the same page with the Turkish head), `robots.txt`
 *   and `sitemap.xml`, so each language has its own crawlable URL.
 * - The public address comes from `SITE_URL` (a custom domain, once there is one).
 */

export const DEFAULT_SITE_URL = 'https://hasanhuseyintayap.com/'
export const HEAD_MARKER = ['<!--seo:head-->', '<!--seo:head-end-->'] as const
export const BODY_MARKER = ['<!--seo:body-->', '<!--seo:body-end-->'] as const

const catalogue: Record<Lang, Content> = { en, tr }

const LOCALES: Record<Lang, { ogLocale: string; path: string; jobTitle: string; siteName: string; imageAlt: string }> = {
  en: { ogLocale: 'en_US', path: '', jobTitle: 'AI Engineer', siteName: 'Hasan Hüseyin Tayap', imageAlt: 'Hasan Hüseyin Tayap, AI engineer' },
  tr: { ogLocale: 'tr_TR', path: 'tr/', jobTitle: 'Yapay Zeka Mühendisi', siteName: 'Hasan Hüseyin Tayap', imageAlt: 'Hasan Hüseyin Tayap, yapay zeka mühendisi' },
}

const IMAGE = { file: 'og.png', width: 1200, height: 630 }

/** Normalises a user-supplied address to an absolute URL that ends with a slash. */
export function normalizeSiteUrl(raw: string | undefined): string {
  const value = (raw ?? '').trim() || DEFAULT_SITE_URL
  const url = new URL(value)
  if (url.protocol !== 'https:' && url.hostname !== 'localhost') throw new Error(`SITE_URL must be https, got ${value}`)
  return url.href.endsWith('/') ? url.href : `${url.href}/`
}

const escapeAttr = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeText = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON for an inline script: `<` is escaped so the data can never close the tag early. */
const safeJson = (value: unknown) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c')

export function pageUrl(siteUrl: string, lang: Lang): string {
  return `${siteUrl}${LOCALES[lang].path}`
}

function structuredData(siteUrl: string, lang: Lang) {
  const content = catalogue[lang]
  const locale = LOCALES[lang]
  const url = pageUrl(siteUrl, lang)
  const profiles = [
    ...content.contact.links.map((link) => link.href),
    content.ride.instagram.href,
    content.ride.photography.link.href,
    ...content.music.platforms.map((link) => link.href),
  ]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}#person`,
        name: content.hero.name,
        jobTitle: locale.jobTitle,
        description: content.meta.description,
        url,
        image: `${siteUrl}portrait.jpg`,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Eskişehir Technical University' },
        knowsAbout: ['LLM agents', 'Retrieval-augmented generation', 'Computer vision', 'Edge AI', 'FastAPI', 'Docker', 'Google Cloud Run'],
        knowsLanguage: ['tr', 'en', 'de'],
        sameAs: profiles,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: locale.siteName,
        inLanguage: lang,
        publisher: { '@id': `${siteUrl}#person` },
      },
    ],
  }
}

/** Everything that goes into `<head>` and changes per language. */
export function renderHead(lang: Lang, siteUrl: string): string {
  const { meta } = catalogue[lang]
  const locale = LOCALES[lang]
  const url = pageUrl(siteUrl, lang)
  const other: Lang = lang === 'en' ? 'tr' : 'en'
  const image = `${siteUrl}${IMAGE.file}`
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)

  const lines = [
    `<title>${escapeText(meta.title)}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="author" content="${escapeAttr(catalogue[lang].hero.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl(siteUrl, 'en')}" />`,
    `<link rel="alternate" hreflang="tr" href="${pageUrl(siteUrl, 'tr')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(siteUrl, 'en')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(locale.siteName)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${locale.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${LOCALES[other].ogLocale}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${IMAGE.width}" />`,
    `<meta property="og:image:height" content="${IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(locale.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(locale.imageAlt)}" />`,
    `<script type="application/ld+json">\n${safeJson(structuredData(siteUrl, lang))}\n</script>`,
  ]
  return `${HEAD_MARKER[0]}\n    ${lines.join('\n    ')}\n    ${HEAD_MARKER[1]}`
}

/** Plain-text version of the page for crawlers and readers that do not run scripts. */
export function renderBody(lang: Lang): string {
  const { hero, about, contact } = catalogue[lang]
  const links = contact.links.map((link) => `<li><a href="${escapeAttr(link.href)}">${escapeText(link.label)}</a></li>`).join('')
  return [
    BODY_MARKER[0],
    '<noscript>',
    `  <main style="max-width:42rem;margin:3rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.6">`,
    `    <h1>${escapeText(hero.name)}</h1>`,
    `    <p>${escapeText(hero.roles[0])}</p>`,
    `    <p>${escapeText(hero.tagline)}</p>`,
    ...about.paragraphs.map((text) => `    <p>${escapeText(text)}</p>`),
    `    <ul>${links}</ul>`,
    '  </main>',
    '</noscript>',
    BODY_MARKER[1],
  ].join('\n    ')
}

export function renderRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`
}

export function renderSitemap(siteUrl: string, lastModified: string): string {
  const alternates = (['en', 'tr'] as const)
    .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(siteUrl, lang)}" />`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(siteUrl, 'en')}" />`)
    .join('\n')
  const entries = (['en', 'tr'] as const)
    .map((lang) => `  <url>\n    <loc>${pageUrl(siteUrl, lang)}</loc>\n    <lastmod>${lastModified}</lastmod>\n${alternates}\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`
}

/** Swaps the English head and body text of a built page for another language. */
export function localisePage(html: string, lang: Lang, siteUrl: string): string {
  const swap = (source: string, [start, end]: readonly [string, string], replacement: string) => {
    const from = source.indexOf(start)
    const to = source.indexOf(end)
    if (from < 0 || to < 0) throw new Error(`SEO marker ${start} not found in the built page`)
    return source.slice(0, from) + replacement + source.slice(to + end.length)
  }
  let page = swap(html, HEAD_MARKER, renderHead(lang, siteUrl))
  page = swap(page, BODY_MARKER, renderBody(lang))
  page = page.replace(/<html lang="[a-z-]+"/, `<html lang="${lang}"`)
  // The page sits one folder deeper at /tr/, so relative file links climb one level.
  if (LOCALES[lang].path) page = page.replace(/(href|src)="\.\//g, '$1="../')
  return page
}

export function seoPlugin(rawSiteUrl: string | undefined): Plugin {
  const siteUrl = normalizeSiteUrl(rawSiteUrl)
  let outDir = ''
  let isBuild = false

  return {
    name: 'portfolio-seo',
    configResolved(config) {
      isBuild = config.command === 'build'
      outDir = join(config.root, config.build.outDir)
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(HEAD_MARKER[0], renderHead('en', siteUrl)).replace(BODY_MARKER[0], renderBody('en')),
    },
    closeBundle() {
      if (!isBuild) return
      const english = readFileSync(join(outDir, 'index.html'), 'utf8')
      mkdirSync(join(outDir, 'tr'), { recursive: true })
      writeFileSync(join(outDir, 'tr', 'index.html'), localisePage(english, 'tr', siteUrl))
      writeFileSync(join(outDir, 'robots.txt'), renderRobots(siteUrl))
      writeFileSync(join(outDir, 'sitemap.xml'), renderSitemap(siteUrl, new Date().toISOString().slice(0, 10)))
    },
  }
}
