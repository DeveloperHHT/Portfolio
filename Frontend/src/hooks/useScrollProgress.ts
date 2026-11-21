import { useEffect, type RefObject } from 'react'

/**
 * Writes --tl (0 to 1) on the element: how far a line placed at 60% of the viewport
 * height has travelled through it. Stylesheets use it to draw scroll-linked progress.
 * Pinned to 1 for reduced motion, so static layouts show the finished state.
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--tl', '1')
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const box = el.getBoundingClientRect()
      const ratio = (window.innerHeight * 0.6 - box.top) / Math.max(box.height, 1)
      el.style.setProperty('--tl', Math.min(1, Math.max(0, ratio)).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
}
