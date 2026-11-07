import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

const ACCENTS = { cyan: '#22e4ff', violet: '#a259ff', lime: '#b6ff3b', pink: '#ff3da8' }

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <section id="projects" className="section">
      <SectionHead eyebrow="02 · selected work" title={<>Things I've <span className="grad-text">shipped</span>.</>} sub="From a Springer-accepted edge-AI system to agents that read the news for me." />
      {featured && <Featured p={featured} />}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {rest.map((p, i) => <Reveal key={p.id} delay={i * 0.1}><Card p={p} n={i + 2} /></Reveal>)}
      </div>
    </section>
  )
}

function Featured({ p }) {
  const [lightbox, setLightbox] = useState(null)
  return (
    <Reveal>
      <article className="glow-border glass overflow-hidden rounded-3xl">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-6 py-4 sm:px-8">
          <span className="rounded-md bg-neon-lime/10 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-neon-lime">★ Featured</span>
          <span className="font-mono text-xs text-slate-400">{p.kicker}</span>
          <span className="ml-auto font-mono text-xs text-slate-500">project_01</span>
        </div>

        <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{p.title}</h3>
            <p className="mt-4 leading-relaxed text-slate-400">{p.summary}</p>

            <div className="mt-6 rounded-2xl border border-neon-violet/30 bg-neon-violet/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-neon-violet">📄 Publication</p>
              <p className="mt-1 text-sm text-slate-200">{p.paper}</p>
              <p className="mt-1 text-xs text-slate-500">{p.team}</p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm text-slate-300"><span className="mt-1 font-mono text-neon-cyan">▹</span>{pt}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-black/40 p-5">
              <p className="font-mono text-xs text-slate-500">YOLOv8 validation · best epoch 107</p>
              <div className="mt-4 space-y-4">
                {p.metrics.map((m, i) => (
                  <div key={m.label}>
                    <div className="flex justify-between font-mono text-xs"><span className="text-slate-400">{m.label}</span><span className="text-white">{m.value.toFixed(2)}%</span></div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" initial={{ width: 0 }} whileInView={{ width: `${m.value}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.15, ease: 'easeOut' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {p.images.map((src, i) => (
                <button key={src} onClick={() => setLightbox(src)} className="group relative overflow-hidden rounded-xl border border-line">
                  <img src={src} alt={i === 0 ? 'Live monitoring dashboard' : 'Evidence screenshot'} className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <span className="absolute bottom-1.5 left-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">{i === 0 ? 'dashboard' : 'evidence'}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setLightbox(p.poster)} className="btn-ghost w-full justify-center text-sm">View full research poster ↗</button>
          </div>
        </div>

        {/* pipeline */}
        <div className="border-t border-line px-6 py-6 sm:px-8">
          <p className="mb-4 font-mono text-xs text-slate-500">system_flow.pipeline</p>
          <div className="flex flex-wrap items-center gap-y-3">
            {p.flow.map((step, i) => (
              <div key={step} className="flex items-center">
                <span className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-slate-200"><span className="mr-1.5 text-neon-cyan">{String(i + 1).padStart(2, '0')}</span>{step}</span>
                {i < p.flow.length - 1 && (
                  <span className="relative mx-1.5 h-px w-6 bg-line sm:w-8"><span className="flow-dot absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-neon-cyan shadow-[0_0_8px_#22e4ff]" style={{ animationDelay: `${i * 0.3}s` }} /></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-black/90 p-4 backdrop-blur">
          <img src={lightbox} alt="Project visual" className="max-h-[90vh] max-w-full rounded-xl border border-line" />
          <span className="absolute right-5 top-5 font-mono text-sm text-slate-400">close ✕</span>
        </div>
      )}
    </Reveal>
  )
}

function Card({ p, n }) {
  const c = ACCENTS[p.accent] || ACCENTS.cyan
  const [pos, setPos] = useState({ x: 50, y: 50, rx: 0, ry: 0 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100
    setPos({ x, y, rx: (50 - y) / 12, ry: (x - 50) / 12 })
  }
  return (
    <article onMouseMove={move} onMouseLeave={() => setPos({ x: 50, y: 50, rx: 0, ry: 0 })}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/80 p-6 backdrop-blur transition-transform duration-200 will-change-transform"
      style={{ transform: `perspective(900px) rotateX(${pos.rx}deg) rotateY(${pos.ry}deg)` }}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${c}22, transparent 60%)` }} />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: c }}>{p.kicker}</span>
        <span className="font-mono text-xs text-slate-600">0{n}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold leading-snug text-white">{p.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>
      <ul className="mt-4 space-y-1.5">
        {p.points.map((pt) => <li key={pt} className="flex gap-2 text-[13px] text-slate-300"><span style={{ color: c }}>▹</span>{pt}</li>)}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="chip text-[10px]">{s}</span>)}</div>
      <div className="mt-auto flex gap-4 pt-6">
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="font-mono text-xs font-bold transition hover:underline" style={{ color: c }}>{l.label} ↗</a>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: c }} />
    </article>
  )
}
