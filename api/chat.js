// Vercel serverless function: POST /api/chat  { messages: [{role:'user'|'assistant', content}] }
// Needs GEMINI_API_KEY in Vercel env vars. Optional: GEMINI_MODEL (default gemini-2.5-flash).
import { systemPrompt } from '../src/data/knowledge.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const key = process.env.GEMINI_API_KEY
  if (!key) return res.status(503).json({ error: 'AI not configured' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : []
  if (!messages.length) return res.status(400).json({ error: 'No messages' })

  const contents = messages
    .filter((m) => m && typeof m.content === 'string')
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, 1500) }] }))

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt() }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
      }),
    })
    const data = await r.json()
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
    if (!r.ok || !text) return res.status(502).json({ error: data?.error?.message || 'Empty response' })
    return res.status(200).json({ reply: text })
  } catch (e) {
    return res.status(500).json({ error: 'AI request failed' })
  }
}
