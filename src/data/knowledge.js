import { profile, projects, skills, achievements, education, languages } from './profile.js'

// Plain-text knowledge base the AI twin answers from.
export function buildKnowledge() {
  const proj = projects
    .map((p) => `## ${p.title}\n${p.summary}\n- ${p.points.join('\n- ')}\nStack: ${p.stack.join(', ')}${p.paper ? `\nPaper: ${p.paper}` : ''}${p.metrics ? `\nMetrics: ${p.metrics.map((m) => `${m.label} ${m.value}%`).join(', ')}` : ''}\nLinks: ${p.links.map((l) => l.href).join(', ')}`)
    .join('\n\n')
  return `NAME: ${profile.name}
ROLE: ${profile.role}
LOCATION: ${profile.location}
STATUS: ${profile.status}
EMAIL: ${profile.email}
GITHUB: ${profile.links.github}
LINKEDIN: ${profile.links.linkedin}
ABOUT: ${profile.about.join(' ')}

PROJECTS:
${proj}

SKILLS:
${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n')}

ACHIEVEMENTS:
${achievements.map((a) => `- ${a.title}: ${a.detail}`).join('\n')}

EDUCATION:
${education.map((e) => `- ${e.degree}, ${e.school} (${e.period}) — ${e.score}`).join('\n')}

LANGUAGES SPOKEN: ${languages.join(', ')}`
}

export function systemPrompt() {
  return `You are "Vishnu.AI", the AI twin of ${profile.name}, living on his portfolio website. Speak in first person as Vishnu: friendly, confident, concise (2–5 sentences, use short bullet lists only when listing things). Answer ONLY from the knowledge below. If something isn't covered, say you don't have that detail here and suggest emailing ${profile.email}. Never invent dates, companies, grades or numbers. Visitors are often recruiters — highlight impact and point them to the relevant section or link when useful. Politely decline unrelated requests (e.g. writing code for them) and steer back to Vishnu.

KNOWLEDGE:
${buildKnowledge()}`
}
