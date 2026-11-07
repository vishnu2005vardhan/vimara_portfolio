import { useMemo, useState } from 'react'
import { skills } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

const COLORS = ['#22e4ff', '#a259ff', '#b6ff3b', '#ff3da8', '#ffb03b', '#5b8cff', '#9aa4b8']

export default function Skills() {
  const [active, setActive] = useState(null)
  const nodes = useMemo(() => {
    const all = skills.flatMap((g, gi) => g.items.map((s) => ({ s, gi }))).sort((a, b) => a.s.length - b.s.length)
    const rings = [0.34, 0.61, 0.85]
    const perRing = [7, 12, all.length - 19]
    let k = 0
    return rings.flatMap((r, ri) => {
      const n = perRing[ri]
      return Array.from({ length: n }, (_, j) => {
        const node = all[k++]
        if (!node) return null
        const a = (j / n) * Math.PI * 2 + ri * 0.4
        return { ...node, x: 50 + Math.cos(a) * r * 50, y: 50 + Math.sin(a) * r * 50 }
      }).filter(Boolean)
    })
  }, [])

  return (
    <section id="skills" className="section">
      <SectionHead eyebrow="03 · stack" title={<>My <span className="grad-text">neural map</span> of tools.</>} sub="Hover a cluster to light up its neurons." />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] [&>*]:min-w-0">
        <Reveal className="space-y-2">
          {skills.map((g, gi) => (
            <button key={g.group} onMouseEnter={() => setActive(gi)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(gi)} onBlur={() => setActive(null)}
              className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${active === gi ? 'border-white/20 bg-white/[0.04]' : 'border-line bg-panel/50'}`}>
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COLORS[gi], boxShadow: `0 0 12px ${COLORS[gi]}` }} />
              <span>
                <span className="block font-semibold text-white">{g.group}</span>
                <span className="mt-1 block text-sm text-slate-400">{g.items.join(' · ')}</span>
              </span>
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {[0.34, 0.61, 0.85].map((r) => (
              <div key={r} className="absolute rounded-full border border-dashed border-line" style={{ inset: `${50 - r * 50}%` }} />
            ))}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
              {nodes.map((n, i) => (
                <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke={COLORS[n.gi]} strokeWidth={active === n.gi ? 0.35 : 0.12} opacity={active === null ? 0.35 : active === n.gi ? 0.9 : 0.06} style={{ transition: 'all .3s' }} />
              ))}
            </svg>
            <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neon-cyan/50 bg-void font-mono text-2xl font-bold text-neon-cyan shadow-[0_0_40px_rgba(34,228,255,.35)]">V</div>
            {nodes.map((n) => {
              const on = active === null || active === n.gi
              return (
                <span key={n.s} onMouseEnter={() => setActive(n.gi)} onMouseLeave={() => setActive(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-default whitespace-nowrap rounded-full border bg-void/90 px-2 py-1 font-mono text-[9px] transition-all duration-300 sm:text-[11px]"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, borderColor: on ? COLORS[n.gi] + '88' : '#1a2033', color: on ? '#e2e8f0' : '#475569', opacity: on ? 1 : 0.35, transform: `translate(-50%,-50%) scale(${active === n.gi ? 1.12 : 1})`, boxShadow: active === n.gi ? `0 0 16px ${COLORS[n.gi]}66` : 'none' }}>
                  {n.s}
                </span>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
