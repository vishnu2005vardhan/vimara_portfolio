import { useEffect, useState } from 'react'
import { achievements } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

async function sha256(s) {
  if (!crypto?.subtle) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return (h >>> 0).toString(16).padStart(64, '0') }
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('')
}

// Each achievement is a block whose hash covers the previous block's hash —
// exactly the idea behind my SecureEdge evidence ledger. Try tampering!
export default function Achievements() {
  const [data, setData] = useState(achievements.map((a) => a.title))
  const [sealed, setSealed] = useState([]) // hashes computed from original data
  const [live, setLive] = useState([])     // hashes computed from current data
  const [verifying, setVerifying] = useState(-1)

  const chain = async (titles) => {
    const out = []; let prev = '0'.repeat(64)
    for (let i = 0; i < titles.length; i++) { const h = await sha256(`${i}|${prev}|${titles[i]}|${achievements[i].detail}`); out.push(h); prev = h }
    return out
  }
  useEffect(() => { chain(achievements.map((a) => a.title)).then((h) => { setSealed(h); setLive(h) }) }, [])
  useEffect(() => { chain(data).then(setLive) }, [data])

  const valid = live.map((h, i) => h === sealed[i])
  const allValid = valid.length && valid.every(Boolean)
  const tamper = (i) => setData((d) => d.map((t, j) => (j === i ? t + ' (edited)' : t)))
  const restore = () => setData(achievements.map((a) => a.title))
  const verify = async () => { for (let i = 0; i < achievements.length; i++) { setVerifying(i); await new Promise((r) => setTimeout(r, 180)) } setVerifying(-1) }

  return (
    <section id="achievements" className="section">
      <SectionHead eyebrow="04 · achievement ledger" title={<>Wins, <span className="grad-text">hash-linked</span>.</>}
        sub="Every block below is sealed with a real SHA-256 hash of the block before it — the same idea as my SecureEdge evidence ledger. Hit “tamper” on any block and watch the chain break." />

      <Reveal className="mb-6 flex flex-wrap items-center gap-3">
        <span className={`rounded-lg px-3 py-2 font-mono text-xs font-bold ${allValid ? 'bg-neon-lime/10 text-neon-lime' : 'bg-neon-pink/10 text-neon-pink'}`}>
          chain status: {allValid ? 'VALID ✓' : 'TAMPERED ✗'}
        </span>
        <button onClick={verify} className="btn-ghost px-3 py-2 font-mono text-xs">verify chain</button>
        {!allValid && <button onClick={restore} className="btn-ghost px-3 py-2 font-mono text-xs">restore original</button>}
      </Reveal>

      <div className="relative gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {achievements.map((a, i) => {
          const ok = valid[i] !== false
          return (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <article className={`relative overflow-hidden rounded-2xl border bg-panel/80 backdrop-blur transition-all duration-300 ${ok ? 'border-line' : 'border-neon-pink/60 shadow-[0_0_30px_rgba(255,61,168,.15)]'} ${verifying === i ? 'ring-2 ring-neon-cyan' : ''}`}>
                {a.image && <img src={a.image} alt={a.title} className="aspect-[4/5] w-full object-cover object-top" loading="lazy" />}
                <div className="p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                    <span className="text-slate-500">block #{String(i).padStart(2, '0')} · {a.year}</span>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-neon-cyan">{a.tag}</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug text-white">{data[i]}</h3>
                  <p className="mt-2 text-sm text-slate-400">{a.detail}</p>
                  <div className="mt-4 space-y-1 rounded-lg bg-black/40 p-3 font-mono text-[10px] leading-relaxed">
                    <div className="truncate text-slate-600">prev: {i === 0 ? '0'.repeat(16) : (live[i - 1] || '').slice(0, 24)}…</div>
                    <div className={`truncate ${ok ? 'text-neon-lime/80' : 'text-neon-pink'}`}>hash: {(live[i] || '').slice(0, 24)}…</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`font-mono text-[11px] font-bold ${ok ? 'text-neon-lime' : 'text-neon-pink'}`}>{ok ? '● VERIFIED' : '● INVALID'}</span>
                    <button onClick={() => tamper(i)} className="font-mono text-[11px] text-slate-500 underline decoration-dotted hover:text-neon-pink">tamper</button>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
