import { useEffect, useState } from 'react'
import { config } from '../data/profile.js'
import Reveal, { SectionHead } from './Reveal.jsx'

const cache = (k, fn) => async () => {
  try { const c = JSON.parse(sessionStorage.getItem(k) || 'null'); if (c) return c } catch {}
  const v = await fn()
  try { sessionStorage.setItem(k, JSON.stringify(v)) } catch {}
  return v
}

const getGitHub = cache('gh', async () => {
  const u = config.githubUsername
  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${u}`).then((r) => (r.ok ? r.json() : Promise.reject())),
    fetch(`https://api.github.com/users/${u}/repos?per_page=100&sort=updated`).then((r) => (r.ok ? r.json() : [])),
  ])
  const langs = {}
  repos.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1))
  return {
    repos: user.public_repos, followers: user.followers,
    stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    langs: Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5),
    recent: repos.filter((r) => !r.fork).slice(0, 4).map((r) => ({ name: r.name, url: r.html_url, lang: r.language, desc: r.description })),
  }
})

const getLeetCode = cache('lc', async () => {
  const u = config.leetcodeUsername
  const tries = [
    async () => { const d = await fetch(`https://alfa-leetcode-api.onrender.com/${u}/solved`).then((r) => r.json()); if (d.solvedProblem == null) throw 0; return { total: d.solvedProblem, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved } },
    async () => { const d = await fetch(`https://leetcode-stats-api.herokuapp.com/${u}`).then((r) => r.json()); if (d.status !== 'success') throw 0; return { total: d.totalSolved, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved } },
  ]
  for (const t of tries) { try { return await t() } catch {} }
  throw new Error('lc')
})

export default function LiveStats() {
  const [gh, setGh] = useState(null), [lc, setLc] = useState(null)
  const [ghErr, setGhErr] = useState(false), [lcErr, setLcErr] = useState(false)
  useEffect(() => {
    getGitHub().then(setGh).catch(() => setGhErr(true))
    getLeetCode().then(setLc).catch(() => setLcErr(true))
  }, [])

  return (
    <section id="stats" className="section">
      <SectionHead eyebrow="05 · telemetry" title={<>Live from my <span className="grad-text">terminals</span>.</>} sub="Pulled in real time from GitHub and LeetCode." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
        <Reveal className="glass p-6">
          <Head label="github" user={config.githubUsername} href={`https://github.com/${config.githubUsername}`} />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Num label="public repos" v={gh?.repos} err={ghErr} />
            <Num label="stars earned" v={gh?.stars} err={ghErr} />
            <Num label="followers" v={gh?.followers} err={ghErr} />
          </div>
          {gh?.langs?.length > 0 && (
            <div className="mt-6">
              <p className="font-mono text-[11px] text-slate-500">top languages</p>
              <div className="mt-2 flex h-2 overflow-hidden rounded-full">
                {gh.langs.map(([l, n], i) => <span key={l} style={{ flex: n, background: ['#22e4ff', '#a259ff', '#b6ff3b', '#ff3da8', '#ffb03b'][i] }} title={l} />)}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-slate-400">
                {gh.langs.map(([l], i) => <span key={l} className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: ['#22e4ff', '#a259ff', '#b6ff3b', '#ff3da8', '#ffb03b'][i] }} />{l}</span>)}
              </div>
            </div>
          )}
          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-black/40 p-3" id="ghchart">
            <img onError={() => { const el = document.getElementById('ghchart'); if (el) el.style.display = 'none' }} src={`https://ghchart.rshah.org/22e4ff/${config.githubUsername}`} alt="GitHub contribution graph" className="min-w-[640px] opacity-90 [filter:invert(1)_hue-rotate(180deg)]" loading="lazy" />
          </div>
          {gh?.recent?.length > 0 && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {gh.recent.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="rounded-lg border border-line p-3 transition hover:border-neon-cyan">
                  <p className="truncate font-mono text-xs text-white">{r.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">{r.desc || r.lang || 'repository'}</p>
                </a>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="glass p-6">
          <Head label="leetcode" user={config.leetcodeUsername} href={`https://leetcode.com/u/${config.leetcodeUsername}/`} />
          <div className="mt-8 flex justify-center">
            <Ring lc={lc} err={lcErr} />
          </div>
          <div className="mt-8 space-y-3">
            {[['Easy', 'easy', '#b6ff3b'], ['Medium', 'medium', '#ffb03b'], ['Hard', 'hard', '#ff3da8']].map(([l, k, c]) => (
              <div key={k} className="flex items-center justify-between rounded-lg border border-line px-4 py-2.5 font-mono text-sm">
                <span style={{ color: c }}>{l}</span><span className="text-white">{lc ? lc[k] : lcErr ? '—' : '…'}</span>
              </div>
            ))}
          </div>
          {lcErr && <p className="mt-4 text-center font-mono text-[11px] text-slate-500">live feed unavailable · 150+ solved</p>}
        </Reveal>
      </div>
    </section>
  )
}

function Head({ label, user, href }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-mono text-sm text-white"><span className="text-neon-cyan">$</span> {label} --user {user}</p>
      <a href={href} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-slate-500 hover:text-neon-cyan">open ↗</a>
    </div>
  )
}
function Num({ label, v, err }) {
  return (
    <div className="rounded-xl border border-line bg-black/30 p-4">
      <div className="text-2xl font-bold text-white">{v ?? (err ? '—' : <span className="animate-pulse text-slate-600">…</span>)}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  )
}
function Ring({ lc, err }) {
  const total = lc?.total ?? (err ? 150 : 0)
  const pct = Math.min(1, total / 300)
  const C = 2 * Math.PI * 70
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r="70" fill="none" stroke="#1a2033" strokeWidth="10" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="url(#lg)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
        <defs><linearGradient id="lg"><stop offset="0" stopColor="#22e4ff" /><stop offset="1" stopColor="#a259ff" /></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-4xl font-bold text-white">{lc ? total : err ? '150+' : '…'}</div><div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">solved</div></div>
      </div>
    </div>
  )
}
