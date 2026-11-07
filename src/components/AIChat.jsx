import { useEffect, useRef, useState } from 'react'
import { config, profile, suggestedQuestions } from '../data/profile.js'
import { localAnswer } from '../data/localBrain.js'
import RichText from './RichText.jsx'

const GREETING = `Hi, I'm **Vishnu.AI** — an AI twin trained on Vishnu's work. Ask me anything about his projects, research paper, skills or availability.`

export default function AIChat() {
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState('checking') // 'live' | 'offline' | 'checking'
  const box = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const focus = () => inputRef.current?.focus({ preventScroll: true })
    addEventListener('focus-ai-chat', focus)
    return () => removeEventListener('focus-ai-chat', focus)
  }, [])
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' }) }, [msgs])

  const typeOut = (full) =>
    new Promise((resolve) => {
      let i = 0
      setMsgs((m) => [...m, { role: 'assistant', content: '' }])
      const step = () => {
        i = Math.min(full.length, i + Math.max(2, Math.round(full.length / 90)))
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: 'assistant', content: full.slice(0, i) }; return c })
        if (i < full.length) setTimeout(step, 14)
        else resolve()
      }
      step()
    })

  async function ask(q) {
    const question = (q ?? input).trim()
    if (!question || busy) return
    setInput('')
    const history = [...msgs, { role: 'user', content: question }]
    setMsgs(history)
    setBusy(true)
    let reply = null
    if (mode !== 'offline') {
      try {
        const ctrl = new AbortController()
        const t = setTimeout(() => ctrl.abort(), 12000)
        const r = await fetch(config.chatEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({ messages: history.slice(1) }),
        })
        clearTimeout(t)
        if (r.ok) { const d = await r.json(); reply = d.reply; setMode('live') }
        else setMode('offline')
      } catch { setMode('offline') }
    }
    if (!reply) { await new Promise((r) => setTimeout(r, 450)); reply = localAnswer(question) }
    await typeOut(reply)
    setBusy(false)
  }

  return (
    <div id="ask" className="glow-border glass relative flex h-[520px] flex-col overflow-hidden rounded-2xl shadow-[0_0_80px_rgba(34,228,255,.08)]">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
          <span className="font-mono text-xs text-slate-400">vishnu.ai — talk to me</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400" title={mode === 'live' ? 'Answering with Google Gemini' : 'Answering from a built-in knowledge base'}>
          <i className={`h-1.5 w-1.5 rounded-full ${mode === 'offline' ? 'bg-neon-violet' : 'bg-neon-lime'} animate-pulse`} />
          {mode === 'offline' ? 'local brain' : mode === 'live' ? 'gemini · live' : 'online'}
        </span>
      </div>

      {/* messages */}
      <div ref={box} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-[14px] leading-relaxed" aria-live="polite">
        {msgs.map((m, i) =>
          m.role === 'assistant' ? (
            <div key={i} className="flex gap-3">
              <img src={profile.photo} alt="" className="mt-0.5 h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-neon-cyan/50" />
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-white/[0.03] px-4 py-2.5 text-slate-300">
                <RichText text={m.content} />
                {busy && i === msgs.length - 1 && m.content === '' && <Dots />}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-neon-cyan/15 px-4 py-2.5 text-white ring-1 ring-neon-cyan/30">{m.content}</div>
            </div>
          )
        )}
        {busy && msgs[msgs.length - 1].role === 'user' && (
          <div className="flex gap-3"><img src={profile.photo} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-neon-cyan/50" /><div className="rounded-2xl border border-line bg-white/[0.03] px-4 py-3"><Dots /></div></div>
        )}
      </div>

      {/* suggestions */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
        {suggestedQuestions.map((q) => (
          <button key={q} disabled={busy} onClick={() => ask(q)} className="shrink-0 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-slate-400 transition hover:border-neon-cyan hover:text-neon-cyan disabled:opacity-40">
            {q}
          </button>
        ))}
      </div>

      {/* input */}
      <form onSubmit={(e) => { e.preventDefault(); ask() }} className="flex items-center gap-2 border-t border-line px-3 py-3">
        <span className="pl-1 font-mono text-neon-cyan">❯</span>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about projects, research, skills…" maxLength={300}
          className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none" aria-label="Ask Vishnu's AI" />
        <button disabled={busy || !input.trim()} className="rounded-lg bg-neon-cyan px-3 py-2 font-mono text-xs font-bold text-void transition disabled:opacity-30">SEND</button>
      </form>
    </div>
  )
}

function Dots() {
  return <span className="inline-flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: `${i * 0.15}s` }} />)}</span>
}
