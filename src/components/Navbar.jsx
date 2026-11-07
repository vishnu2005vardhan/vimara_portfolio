import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'

const LINKS = [
  ['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'],
  ['Ledger', '#achievements'], ['Stats', '#stats'], ['Blog', '#blog'], ['Contact', '#contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const s = () => setScrolled(scrollY > 30)
    addEventListener('scroll', s)
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    LINKS.forEach(([, h]) => { const el = document.querySelector(h); el && io.observe(el) })
    return () => { removeEventListener('scroll', s); io.disconnect() }
  }, [])
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${scrolled ? 'glass shadow-[0_8px_40px_rgba(0,0,0,.5)]' : 'border border-transparent'}`}>
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-neon-cyan/10 text-neon-cyan ring-1 ring-neon-cyan/40">V</span>
          <span>vishnu<span className="text-neon-cyan">.ai</span></span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className={`rounded-lg px-3 py-1.5 text-sm transition ${active === h ? 'bg-white/5 text-neon-cyan' : 'text-slate-400 hover:text-white'}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={profile.resume} download className="hidden rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-slate-300 transition hover:border-neon-cyan hover:text-neon-cyan sm:inline-block">resume.pdf ↓</a>
          <button onClick={() => setOpen(!open)} className="rounded-lg border border-line p-2 lg:hidden" aria-label="Menu">
            <div className="space-y-1"><span className="block h-0.5 w-5 bg-slate-300" /><span className="block h-0.5 w-5 bg-slate-300" /><span className="block h-0.5 w-3 bg-neon-cyan" /></div>
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl p-3 lg:hidden">
          {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5">{l}</a>)}
          <a href={profile.resume} download className="block rounded-lg px-3 py-2 text-neon-cyan">Download resume ↓</a>
        </div>
      )}
    </header>
  )
}
