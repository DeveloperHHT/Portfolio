import { useEffect, useRef } from 'react'
import { useMotionAllowed } from '../../hooks/useMotionAllowed'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 140
const POINTER_RADIUS = 180

/**
 * Drifting network of nodes drawn on a canvas. Nodes near the cursor link to it.
 * Pauses when scrolled out of view or the tab is hidden; a single static frame when motion is reduced.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const motion = useMotionAllowed()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const host = canvas.parentElement ?? canvas

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }

    const colors = () => {
      const light = document.documentElement.dataset.theme === 'light'
      return light ? { dot: '91,61,240', line: '91,61,240' } : { dot: '155,130,255', line: '120,200,255' }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(26, (width * height) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const draw = (step: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const { dot, line } = colors()
      for (const n of nodes) {
        if (step) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${line},${(1 - d / LINK_DISTANCE) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y)
        if (pd < POINTER_RADIUS) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - pd / POINTER_RADIUS) * 0.6})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(${dot},0.7)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      frame = 0
      if (!visible || document.hidden) return
      draw(true)
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!frame && motion) frame = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      pointer.x = event.clientX - box.left
      pointer.y = event.clientY - box.top
    }
    const onLeave = () => {
      pointer.x = pointer.y = -9999
    }

    resize()
    draw(false)
    const observer = new ResizeObserver(() => {
      resize()
      draw(false)
    })
    observer.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(host)
    const onVisibility = () => {
      if (!document.hidden) start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    start()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [motion])

  return <canvas ref={canvasRef} className="hero__neural" aria-hidden="true" />
}
