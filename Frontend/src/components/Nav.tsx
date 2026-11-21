import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { useApp } from '../context/AppContext'
import type { Lang } from '../content/types'
import { MoonIcon, SunIcon } from './icons/ThemeIcons'
import './Nav.css'

const LANGS: Lang[] = ['en', 'tr']
const SCROLLED_AT = 8

/** "Hasan Hüseyin Tayap" -> "HT": first and last word of the name. */
function monogram(name: string): string {
  const words = name.trim().split(/\s+/)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toLocaleUpperCase()
}

/** Id of the section currently crossing the middle of the viewport, '' while the hero is in view. */
function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key.split('|')
    const elements = ['hero', ...sectionIds]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'hero' ? '' : entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))

    // A short last section may never reach the middle band, so pin it at the page bottom.
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) setActive(sectionIds[sectionIds.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return active
}

export function Nav() {
  const { content, lang, setLang, theme, toggleTheme } = useApp()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const active = useScrollSpy(content.nav.map((item) => item.id))

  const closeMenu = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll, move focus into it, and drop it again on a wide viewport.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    linksRef.current?.querySelector<HTMLElement>('a')?.focus()

    const wide = window.matchMedia('(min-width: 1081px)')
    const onWide = () => wide.matches && setOpen(false)
    wide.addEventListener('change', onWide)

    return () => {
      document.body.style.overflow = previousOverflow
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu(true)
      return
    }
    if (event.key !== 'Tab') return
    // Keep Tab inside the header while the menu covers the page.
    const focusable = Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
    ).filter((el) => el.offsetParent !== null || el === document.activeElement)
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const name = content.hero.name
  const themeLabel = theme === 'dark' ? content.ui.themeToLight : content.ui.themeToDark

  return (
    <header
      ref={headerRef}
      className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}
      onKeyDown={onKeyDown}
    >
      <div className="nav__bar">
        <a className="nav__brand" href="#hero" aria-label={name} onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            {monogram(name)}
          </span>
          <span className="nav__name" aria-hidden="true">
            {name}
          </span>
        </a>

        <nav className="nav__menu" aria-label={content.ui.mainNav}>
          <ul id="nav-links" className="nav__links" ref={linksRef}>
            {content.nav.map((item, index) => (
              <li key={item.id} style={{ '--i': index } as CSSProperties}>
                <a
                  className={`nav__link${active === item.id ? ' is-active' : ''}`}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__controls">
          <div className="nav__lang" role="group" aria-label={content.ui.langLabel}>
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                className="nav__lang-btn"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="nav__icon-btn nav__theme"
            aria-label={themeLabel}
            onClick={(event) => {
              const box = event.currentTarget.getBoundingClientRect()
              toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 })
            }}
          >
            <SunIcon className="nav__theme-icon nav__theme-icon--sun" />
            <MoonIcon className="nav__theme-icon nav__theme-icon--moon" />
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="nav__icon-btn nav__burger"
            aria-label={open ? content.ui.closeMenu : content.ui.openMenu}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav__burger-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="nav__scrim" aria-hidden="true" onClick={() => closeMenu(false)} />
    </header>
  )
}
