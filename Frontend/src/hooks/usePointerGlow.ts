import type { PointerEvent } from 'react'

/** Feeds the pointer position into --mx / --my so styles/pointer-glow.css can follow the cursor. */
export function trackPointer(event: PointerEvent<HTMLElement>): void {
  const el = event.currentTarget
  const box = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - box.left}px`)
  el.style.setProperty('--my', `${event.clientY - box.top}px`)
}
