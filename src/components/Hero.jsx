import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import AIChat from './AIChat.jsx'

const ROLES = ['Full-Stack MERN Developer', 'RAG & GenAI Builder', 'Edge-AI Researcher', 'Automation Tinkerer', 'State-level Kabaddi Player']

function useTyped(words) {
  const [i, setI] = useState(0), [txt, setTxt] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const t = setTimeout(() => {
      if (!del && txt === w) return setDel(true)
      if (del && txt === '') { setDel(false); return setI(i + 1) }
      setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1))
    }, !del && txt === w ? 1600 : del ? 30 : 65)
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return txt
}

export default function Hero() {
  const typed = useTyped(ROLES)
  return (
    <section id="top" className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_1fr] [&>*]:min-w-0">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1.5 animate-spinslow rounded-full bg-[conic-gradient(#22e4ff,#a259ff,#ff3da8,#22e4ff)] opacity-80 blur-[2px]" />
            <img src={profile.photo} alt={profile.name} className="relative h-20 w-20 rounded-full border-4 border-void object-cover sm:h-24 sm:w-24" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-lime/30 bg-neon-lime/10 px-3 py-1 font-mono text-[11px] text-neon-lime">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-lime" /> {profile.status}
          </span>
        </div>

        <p className="eyebrow mt-8">Hello, world — I'm</p>
        <h1 className="mt-3 text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Vishnu Vardhan<br /><span className="grad-text">Reddy.</span>
        </h1>
        <p className="mt-5 h-7 font-mono text-lg text-neon-cyan">
          {'> '}{typed}<span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 animate-blink bg-neon-cyan" />
        </p>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">{profile.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">See my work →</a>
          <a href={profile.resume} download className="btn-ghost">Download resume</a>
        </div>
        <div className="mt-8 flex items-center gap-5 font-mono text-xs text-slate-500">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-neon-cyan">GitHub ↗</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-neon-cyan">LinkedIn ↗</a>
          <a href={`mailto:${profile.email}`} className="hover:text-neon-cyan">Email ↗</a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
        <p className="mb-3 font-mono text-xs text-slate-500"><span className="text-neon-violet">//</span> don't read my resume — interview my AI</p>
        <AIChat />
      </motion.div>

      <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 lg:flex">
        scroll <span className="h-10 w-px overflow-hidden bg-line"><span className="block h-1/2 w-px animate-scan bg-neon-cyan" /></span>
      </a>
    </section>
  )
}
