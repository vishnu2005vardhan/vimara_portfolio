import { profile, education, languages } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHead eyebrow="01 · whoami" title={<>Engineer by training.<br /><span className="grad-text">Builder by habit.</span></>} />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-slate-400">
          {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          <div className="flex flex-wrap gap-2 pt-2">
            {languages.map((l) => <span key={l} className="chip">🗣 {l}</span>)}
            <span className="chip">📍 {profile.location}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="glass p-6">
          <p className="font-mono text-xs text-slate-500">~/education</p>
          <ol className="relative mt-5 space-y-7 border-l border-line pl-6">
            {education.map((e) => (
              <li key={e.school} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-neon-cyan bg-void shadow-[0_0_12px_#22e4ff]" />
                <p className="font-mono text-xs text-neon-cyan">{e.period}</p>
                <h3 className="mt-1 font-semibold text-white">{e.degree}</h3>
                <p className="text-sm text-slate-400">{e.school}</p>
                <p className="mt-2 inline-block rounded-md bg-neon-violet/10 px-2 py-0.5 font-mono text-xs text-neon-violet">{e.score}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
