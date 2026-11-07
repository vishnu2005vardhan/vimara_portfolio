import { useEffect, useState } from 'react'

const LINES = [
  '> initializing vishnu.ai kernel ...',
  '> loading knowledge base [projects, research, skills] ... ok',
  '> connecting neural interface ... ok',
  '> verifying achievement ledger (sha-256) ... VALID',
  '> welcome.',
]

export default function BootScreen({ onDone }) {
  const [n, setN] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(() => {
    if (n < LINES.length) {
      const t = setTimeout(() => setN(n + 1), 260)
      return () => clearTimeout(t)
    }
    const t1 = setTimeout(() => setOut(true), 350)
    const t2 = setTimeout(onDone, 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [n, onDone])

  return (
    <div
      onClick={onDone}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-void transition-opacity duration-500 ${out ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-full max-w-xl px-6 font-mono text-sm">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className={i === LINES.length - 1 ? 'text-neon-cyan text-base mt-2' : 'text-slate-400'}>
            {l.includes('VALID') ? <>{l.replace('VALID', '')}<span className="text-neon-lime">VALID</span></> : l}
          </div>
        ))}
        <span className="inline-block h-4 w-2 bg-neon-cyan animate-blink align-middle" />
        <div className="mt-8 h-px w-full overflow-hidden bg-line">
          <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-all duration-300" style={{ width: `${(n / LINES.length) * 100}%` }} />
        </div>
        <p className="mt-3 text-[11px] text-slate-600">click to skip</p>
      </div>
    </div>
  )
}
