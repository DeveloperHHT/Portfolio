import { flushSync } from 'react-dom'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from '../content/en'
import { tr } from '../content/tr'
import type { Content, Lang } from '../content/types'
import { langFromPath, pathForLang } from '../utils/langPath'

export type Theme = 'light' | 'dark'

const catalogue: Record<Lang, Content> = { en, tr }

interface AppState {
  lang: Lang
  setLang: (lang: Lang) => void
  content: Content
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
}

const AppContext = createContext<AppState | null>(null)

function readStored<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const value = localStorage.getItem(key)
    return allowed.includes(value as T) ? (value as T) : null
  } catch {
    return null
  }
}

function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private window or blocked storage: the choice just won't persist */
  }
}

function initialLang(): Lang {
  const fromPath = langFromPath(window.location.pathname)
  if (fromPath) return fromPath
  const stored = readStored<Lang>('lang', ['en', 'tr'])
  if (stored) return stored
  return (navigator.language || 'en').toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

function initialTheme(): Theme {
  const stored = readStored<Theme>('theme', ['light', 'dark'])
  if (stored) return stored
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

type ViewDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<unknown> } }

function prefersCalm(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/** Runs a view transition and tags the root so the stylesheet knows which animation to play. */
function runTransition(doc: ViewDocument, kind: 'theme' | 'lang', update: () => void): void {
  const root = document.documentElement
  root.dataset.vt = kind
  const clear = () => delete root.dataset.vt
  doc.startViewTransition?.(update).finished.then(clear, clear)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const content = catalogue[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = content.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description)
  }, [lang, content])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0d14' : '#f6f7fb')
  }, [theme])

  const setLang = useCallback((next: Lang) => {
    writeStored('lang', next)
    // Keep the address in step, so a shared link opens in the language that is on screen.
    const { pathname, search, hash } = window.location
    window.history.replaceState(window.history.state, '', `${pathForLang(pathname, next)}${search}${hash}`)
    const doc = document as ViewDocument
    if (!doc.startViewTransition || prefersCalm()) {
      setLangState(next)
      return
    }
    runTransition(doc, 'lang', () => flushSync(() => setLangState(next)))
  }, [])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      writeStored('theme', next)
      const apply = () => {
        document.documentElement.dataset.theme = next
        flushSync(() => setTheme(next))
      }
      const doc = document as ViewDocument
      if (!doc.startViewTransition || prefersCalm()) {
        apply()
        return
      }
      const root = document.documentElement
      root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth - 40}px`)
      root.style.setProperty('--vt-y', `${origin?.y ?? 32}px`)
      runTransition(doc, 'theme', apply)
    },
    [theme],
  )

  const value = useMemo(
    () => ({ lang, setLang, content, theme, toggleTheme }),
    [lang, setLang, content, theme, toggleTheme],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
