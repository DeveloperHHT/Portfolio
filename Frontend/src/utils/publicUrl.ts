import { siteRoot } from './langPath'

/**
 * URL of a file from `public/`. The build uses relative asset paths (`base: './'`), which would
 * break on the Turkish page at `/tr/`, one folder deeper. Resolving from the folder the site is
 * served from works for both pages, on a custom domain and under a sub-path alike.
 */
export function publicUrl(path: string): string {
  return `${siteRoot(window.location.pathname)}${path}`
}
