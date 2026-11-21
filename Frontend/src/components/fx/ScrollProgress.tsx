import { useEffect, useRef } from 'react'
import './fx.css'

/** Thin gradient bar at the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.setProperty('--progress', ratio.toFixed(4))
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
  }, [])

  return (
    <div ref={ref} className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" />
    </div>
  )
}
