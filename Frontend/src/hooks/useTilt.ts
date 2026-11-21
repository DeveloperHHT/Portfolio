import { useEffect, useRef } from 'react'
import { hasFinePointer, useMotionAllowed } from './useMotionAllowed'

/**
 * 3D tilt that follows the pointer. Sets --rx / --ry / --tx / --ty on the element
 * so the stylesheet owns the actual transform. Does nothing on touch or reduced motion.
 */
export function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T>(null)
  const motion = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion || !hasFinePointer()) return
    let frame = 0

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect()
        const x = (event.clientX - box.left) / box.width - 0.5
        const y = (event.clientY - box.top) / box.height - 0.5
        el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`)
        el.style.setProperty('--tx', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--ty', `${(y * 100).toFixed(1)}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      for (const name of ['--rx', '--ry', '--tx', '--ty']) el.style.removeProperty(name)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max, motion])

  return ref
}
