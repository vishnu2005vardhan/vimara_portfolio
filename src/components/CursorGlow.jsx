import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const m = (e) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)` }
    addEventListener('pointermove', m)
    return () => removeEventListener('pointermove', m)
  }, [])
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full opacity-40 blur-3xl md:block"
      style={{ background: 'radial-gradient(circle, rgba(34,228,255,.12), rgba(162,89,255,.08) 40%, transparent 70%)' }} />
  )
}
