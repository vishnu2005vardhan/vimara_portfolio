import { useEffect, useMemo, useState } from 'react'
import Reveal, { SectionHead } from './Reveal.jsx'

// Drop a new .md file in src/posts/ with the same front-matter and it appears here.
const files = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parse(raw, slug) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  const meta = {}
  ;(m ? m[1] : '').split('\n').forEach((l) => { const i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim() })
  const body = m ? m[2] : raw
  const words = body.split(/\s+/).length
  return { slug, ...meta, tags: (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean), body, mins: Math.max(1, Math.round(words / 200)) }
}

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((p, i) => {
    if (/^\*\*.+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (/^\*.+\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>
    if (/^`.+`$/.test(p)) return <code key={i}>{p.slice(1, -1)}</code>
    return p
  })
}

function Markdown({ src }) {
  const out = []; const lines = src.split('\n'); let i = 0
  while (i < lines.length) {
    const l = lines[i]
    if (l.startsWith('```')) { const code = []; i++; while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]); i++; out.push(<pre key={i}><code>{code.join('\n')}</code></pre>); continue }
    if (l.startsWith('### ')) { out.push(<h3 key={i}>{inline(l.slice(4))}</h3>); i++; continue }
    if (l.startsWith('## ')) { out.push(<h2 key={i}>{inline(l.slice(3))}</h2>); i++; continue }
    if (/^[-*] /.test(l)) { const items = []; while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2)); out.push(<ul key={i}>{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>); continue }
    if (!l.trim()) { i++; continue }
    const para = []; while (i < lines.length && lines[i].trim() && !/^(#|```|[-*] )/.test(lines[i])) para.push(lines[i++])
    out.push(<p key={i}>{inline(para.join(' '))}</p>)
  }
  return <div className="prose-blog">{out}</div>
}

export default function Blog() {
  const posts = useMemo(() => Object.entries(files).map(([p, raw]) => parse(raw, p.split('/').pop().replace('.md', ''))).sort((a, b) => (a.date < b.date ? 1 : -1)), [])
  const [open, setOpen] = useState(null)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', esc); return () => removeEventListener('keydown', esc)
  }, [open])

  return (
    <section id="blog" className="section">
      <SectionHead eyebrow="06 · logs" title={<>Notes from the <span className="grad-text">build</span>.</>} sub="Write-ups on what I build and what I learn along the way." />
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <button onClick={() => setOpen(p)} className="group h-full w-full rounded-2xl border border-line bg-panel/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-neon-cyan/50">
              <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                <span>{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span><span>·</span><span>{p.mins} min read</span>
              </div>
              <h3 className="mt-3 text-xl font-bold leading-snug text-white transition group-hover:text-neon-cyan">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip text-[10px]">#{t}</span>)}</div>
              <span className="mt-5 inline-block font-mono text-xs text-neon-cyan">read →</span>
            </button>
          </Reveal>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/85 backdrop-blur-md" onClick={() => setOpen(null)}>
          <article onClick={(e) => e.stopPropagation()} className="glass relative mx-auto my-10 max-w-2xl p-6 sm:p-10">
            <button onClick={() => setOpen(null)} className="absolute right-4 top-4 font-mono text-sm text-slate-400 hover:text-white">esc ✕</button>
            <p className="font-mono text-xs text-slate-500">{open.date} · {open.mins} min read</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white">{open.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">{open.tags.map((t) => <span key={t} className="chip text-[10px]">#{t}</span>)}</div>
            <Markdown src={open.body} />
          </article>
        </div>
      )}
    </section>
  )
}
