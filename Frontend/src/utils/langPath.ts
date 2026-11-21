import type { Lang } from '../content/types'

const TURKISH_PATH = /\/tr\/?$/

/** The language the address asks for: `/tr/` is Turkish, any other path leaves the choice open. */
export function langFromPath(pathname: string): Lang | null {
  return TURKISH_PATH.test(pathname) ? 'tr' : null
}

/** Folder the site is served from, e.g. `/` or `/Portfolio/`, whichever language page is open. */
export function siteRoot(pathname: string): string {
  const folder = pathname.replace(/[^/]*$/, '')
  return folder.replace(TURKISH_PATH, '/')
}

/** The same page address for another language, e.g. `/` ↔ `/tr/` (also under a sub-path). */
export function pathForLang(pathname: string, lang: Lang): string {
  return `${siteRoot(pathname)}${lang === 'tr' ? 'tr/' : ''}`
}
