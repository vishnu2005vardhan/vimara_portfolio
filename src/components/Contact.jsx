import { useState } from 'react'
import { config, profile } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

export default function Contact() {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const configured = config.formspreeId && !config.formspreeId.startsWith('YOUR_')
  const [copied, setCopied] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const f = new FormData(e.target)
    if (!configured) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${f.get('name')}`)
      const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`)
      location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }
    setState('sending')
    try {
      const r = await fetch(`https://formspree.io/f/${config.formspreeId}`, { method: 'POST', body: f, headers: { Accept: 'application/json' } })
      setState(r.ok ? 'sent' : 'error'); if (r.ok) e.target.reset()
    } catch { setState('error') }
  }
  const copy = () => { navigator.clipboard?.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <section id="contact" className="section">
      <SectionHead eyebrow="07 · handshake" title={<>Let's build something <span className="grad-text">together</span>.</>} sub="Internships, SDE roles, hackathon teams or just a chat about AI — my inbox is open." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-4">
          <button onClick={copy} className="glass flex w-full items-center justify-between p-5 text-left transition hover:border-neon-cyan">
            <span><span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">email</span><span className="mt-1 block text-white">{profile.email}</span></span>
            <span className="font-mono text-xs text-neon-cyan">{copied ? 'copied ✓' : 'copy'}</span>
          </button>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="glass flex items-center justify-between p-5 transition hover:border-neon-cyan">
            <span><span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">linkedin</span><span className="mt-1 block text-white">vishnuvardhanreddy05</span></span><span className="text-neon-cyan">↗</span>
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="glass flex items-center justify-between p-5 transition hover:border-neon-cyan">
            <span><span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">github</span><span className="mt-1 block text-white">vishnu2005vardhan</span></span><span className="text-neon-cyan">↗</span>
          </a>
          <a href={profile.resume} download className="btn-primary w-full justify-center">Download resume (PDF)</a>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass space-y-4 p-6 sm:p-8">
            <p className="font-mono text-xs text-slate-500"><span className="text-neon-cyan">$</span> send_message --to vishnu</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="name" placeholder="Your name" />
              <Field name="email" type="email" label="email" placeholder="you@company.com" />
            </div>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">message</span>
              <textarea required name="message" rows={5} placeholder="Hi Vishnu, we'd love to talk about…" className="mt-2 w-full resize-none rounded-xl border border-line bg-black/40 px-4 py-3 text-white placeholder:text-slate-600 focus:border-neon-cyan focus:outline-none" />
            </label>
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <button disabled={state === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
              {state === 'sending' ? 'Transmitting…' : state === 'sent' ? 'Message delivered ✓' : 'Send message →'}
            </button>
            {state === 'error' && <p className="text-center font-mono text-xs text-neon-pink">Something went wrong — please email me directly.</p>}
            {state === 'sent' && <p className="text-center font-mono text-xs text-neon-lime">Thanks! I'll get back to you soon.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ name, label, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
      <input required name={name} type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-line bg-black/40 px-4 py-3 text-white placeholder:text-slate-600 focus:border-neon-cyan focus:outline-none" />
    </label>
  )
}
