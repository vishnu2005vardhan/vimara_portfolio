import { useEffect, useState } from 'react'

export default function FloatingAsk() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const s = () => setShow(scrollY > innerHeight * 0.9)
    addEventListener('scroll', s); return () => removeEventListener('scroll', s)
  }, [])
  const go = () => {
    document.getElementById('ask')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => dispatchEvent(new Event('focus-ai-chat')), 700)
  }
  return (
    <button onClick={go} aria-label="Ask my AI"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-neon-cyan px-4 py-3 font-mono text-xs font-bold text-void shadow-[0_0_30px_rgba(34,228,255,.5)] transition-all duration-500 hover:scale-105 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-void opacity-60" /><span className="relative h-2 w-2 rounded-full bg-void" /></span>
      Ask my AI
    </button>
  )
}
