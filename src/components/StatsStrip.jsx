import { stats } from '../data/profile.js'
import Reveal from './Reveal.jsx'

export default function StatsStrip() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4" style={{ gap: 1 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-panel/90 p-6 backdrop-blur">
            <div className="text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
