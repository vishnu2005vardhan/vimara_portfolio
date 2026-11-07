import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <p className="font-mono text-xs text-slate-500">© {new Date().getFullYear()} {profile.name} · built with React, Tailwind & Gemini</p>
        <p className="font-mono text-xs text-slate-600">ledger status: <span className="text-neon-lime">VALID</span> · <a href="#top" className="hover:text-neon-cyan">back to top ↑</a></p>
      </div>
    </footer>
  )
}
