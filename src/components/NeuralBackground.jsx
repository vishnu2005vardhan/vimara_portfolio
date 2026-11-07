import { useEffect, useRef } from 'react'

// Drifting nodes that connect when close — a living neural net behind the page.
export default function NeuralBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf, nodes = []
    const mouse = { x: -999, y: -999 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'
      const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
      }))
      c.dpr = dpr
    }
    const onMove = (e) => { mouse.x = e.clientX * c.dpr; mouse.y = e.clientY * c.dpr }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const max = 140 * c.dpr
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < max) {
            ctx.strokeStyle = `rgba(34,228,255,${(1 - d / max) * 0.18})`
            ctx.lineWidth = c.dpr * 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < max * 1.4) {
          ctx.strokeStyle = `rgba(162,89,255,${(1 - dm / (max * 1.4)) * 0.5})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = 'rgba(160,240,255,.55)'
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    resize(); draw()
    addEventListener('resize', resize); addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', onMove) }
  }, [])
  return (
    <>
      <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
    </>
  )
}
