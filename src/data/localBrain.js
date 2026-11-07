// Offline fallback "brain": answers common questions without any API.
import { profile, projects, skills, achievements, education, config } from './profile.js'

const P = Object.fromEntries(projects.map((p) => [p.id, p]))

const intents = [
  { keys: ['hi', 'hello', 'hey', 'namaste', 'yo'], exact: true,
    reply: () => `Hey! 👋 I'm Vishnu's AI twin. Ask me about my projects, research paper, skills, kabaddi — or how to hire me.` },
  { keys: ['paper', 'research', 'springer', 'publication', 'conference', 'mct4sd', 'manila'],
    reply: () => `My team's paper on **SecureEdge** — edge-based IoT monitoring with blockchain security — was accepted at **MCT4SD 2026, Manila (Springer LNNS)**. We present it orally on 10 December 2026. The detector hits 93.83% precision and 86.50% recall, and every alert is sealed in a SHA-256 hash-linked ledger.` },
  { keys: ['edge', 'iot', 'yolo', 'blockchain', 'raspberry', 'surveillance', 'major', 'secureedge', 'detection'],
    reply: () => { const p = P['edge-iot']; return `**${p.title}** — ${p.summary}\n\nResults: ${p.metrics.map((m) => `${m.label} ${m.value}%`).join(' · ')}.` } },
  { keys: ['edureach', 'college chatbot', 'rag', 'vapi', 'voice', 'langchain'],
    reply: () => { const p = P.edureach; return `**${p.title}** — ${p.summary} It uses ${p.stack.join(', ')}. Live demo: ${p.links[0].href}` } },
  { keys: ['finance', 'expense', 'budget', 'money', 'tracker'],
    reply: () => { const p = P.finance; return `**${p.title}** — ${p.summary} Built with ${p.stack.join(', ')}. Code: ${p.links[0].href}` } },
  { keys: ['news', 'n8n', 'newsletter', 'automation', 'rss', 'summarizer'],
    reply: () => { const p = P.news; return `**${p.title}** — ${p.summary} It turned 30 minutes of browsing into 2 minutes of reading.` } },
  { keys: ['best project', 'proud', 'favourite', 'favorite', 'projects', 'built', 'work'],
    reply: () => `My flagship is **SecureEdge** — real-time threat detection on a Raspberry Pi with a tamper-evident blockchain ledger; it became a Springer paper. I've also shipped **EduReach AI** (agentic RAG + voice counselor), an **AI Finance Tracker** (MERN + OpenAI) and an **n8n AI news agent**. Which one should I go deeper on?` },
  { keys: ['stack', 'skill', 'tech', 'language', 'know', 'react', 'node', 'mern', 'python'],
    reply: () => `Here's my toolkit:\n${skills.slice(0, 5).map((s) => `• **${s.group}:** ${s.items.join(', ')}`).join('\n')}` },
  { keys: ['intern', 'hire', 'job', 'available', 'open to', 'opportunit', 'role', 'recruit'],
    reply: () => `Yes — I'm **${profile.status.toLowerCase()}**. I graduate in 2027 and love full-stack + AI work. Best way to reach me: ${profile.email}, or the contact form below. 🚀` },
  { keys: ['contact', 'email', 'reach', 'phone', 'linkedin', 'mail'],
    reply: () => `📧 ${profile.email}\n💼 ${profile.links.linkedin}\n🐙 ${profile.links.github}\nOr drop a message in the contact section at the bottom.` },
  { keys: ['kabaddi', 'sport', 'ncc', 'trophy', 'hobby', 'hobbies'],
    reply: () => `I'm a state-level kabaddi player and VTU representative — our team finished **runners-up in the VTU Bengaluru North Division (2026-27)**. I'm also an NCC cadet. Sport keeps me calm under pressure, which helps at hackathons too!` },
  { keys: ['hackathon', 'srm', 'leetcode', 'dsa', 'achievement', 'award'],
    reply: () => `Highlights:\n${achievements.slice(0, 4).map((a) => `• ${a.title}`).join('\n')}` },
  { keys: ['education', 'college', 'cgpa', 'degree', 'study', 'university', 'gpa', 'marks'],
    reply: () => education.map((e) => `🎓 **${e.degree}** — ${e.school} (${e.period}), ${e.score}`).join('\n') },
  { keys: ['resume', 'cv'],
    reply: () => `You can download my resume from the button at the top of the page. 📄` },
  { keys: ['who are you', 'about', 'yourself', 'introduce'],
    reply: () => `I'm ${profile.name}, a ${profile.role} from Bengaluru. ${profile.about[1]}` },
]

export function localAnswer(q) {
  const t = q.toLowerCase().trim()
  for (const i of intents) {
    const hit = i.exact ? i.keys.some((k) => t === k || t.startsWith(k + ' ') || t.startsWith(k + '!')) : i.keys.some((k) => t.includes(k))
    if (hit) return i.reply()
  }
  return `Good question! I don't have that detail in my memory yet. Try asking about my projects, research, skills or achievements — or email me at ${profile.email}.`
}
