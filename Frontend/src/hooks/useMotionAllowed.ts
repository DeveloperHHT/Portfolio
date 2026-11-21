import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** True while the visitor has not asked the OS for reduced motion. Updates live. */
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(() => !(window.matchMedia?.(QUERY).matches ?? false))
  useEffect(() => {
    const query = window.matchMedia?.(QUERY)
    if (!query) return
    const onChange = () => setAllowed(!query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return allowed
}

/** True on devices with a real hover-capable pointer (so no touch-only phones). */
export function hasFinePointer(): boolean {
  return window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false
}
