import { useEffect, useRef } from 'react'
import { hasFinePointer, useMotionAllowed } from './useMotionAllowed'

/** Pulls the element a few pixels toward the pointer while it hovers nearby. */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null)
  const motion = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion || !hasFinePointer()) return

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect()
      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height / 2)
      el.style.setProperty('--mx-shift', `${(dx * strength).toFixed(1)}px`)
      el.style.setProperty('--my-shift', `${(dy * strength).toFixed(1)}px`)
    }
    const onLeave = () => {
      el.style.removeProperty('--mx-shift')
      el.style.removeProperty('--my-shift')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength, motion])

  return ref
}
