import { useState } from 'react'
import BootScreen from './components/BootScreen.jsx'
import NeuralBackground from './components/NeuralBackground.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsStrip from './components/StatsStrip.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import LiveStats from './components/LiveStats.jsx'
import Blog from './components/Blog.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingAsk from './components/FloatingAsk.jsx'

export default function App() {
  const [booted, setBooted] = useState(() => {
    try { return sessionStorage.getItem('booted') === '1' } catch { return false }
  })
  const finish = () => {
    try { sessionStorage.setItem('booted', '1') } catch {}
    setBooted(true)
  }
  return (
    <div className="noise relative min-h-screen">
      {!booted && <BootScreen onDone={finish} />}
      <NeuralBackground />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsStrip />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <LiveStats />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <FloatingAsk />
    </div>
  )
}
