import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` to the element the first time it scrolls into view.
 * Pair it with the `.reveal` class from styles/global.css. Falls back to
 * "visible" when IntersectionObserver is missing or motion is reduced.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
