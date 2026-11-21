import { useEffect, useRef } from 'react'
import { hasFinePointer, useMotionAllowed } from '../../hooks/useMotionAllowed'
import './fx.css'

/** Soft light that trails the mouse. Skipped on touch devices and for reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const motion = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion || !hasFinePointer()) return
    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let tx = x
    let ty = y

    const loop = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      frame = requestAnimationFrame(loop)
    }
    const onMove = (event: PointerEvent) => {
      tx = event.clientX
      ty = event.clientY
      el.classList.add('is-on')
    }
    const onLeave = () => el.classList.remove('is-on')

    frame = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [motion])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
