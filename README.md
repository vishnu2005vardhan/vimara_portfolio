# vishnu.ai — Portfolio

A dark, neon, AI-first portfolio. Visitors don't read a resume; they interview an AI twin.

Built with React 18, Vite, Tailwind CSS, Framer Motion and a Gemini-powered Vercel serverless function.

## What's inside

| Section | What makes it different |
|---|---|
| Boot screen | A short terminal boot sequence (once per visit, click to skip) |
| Hero + Vishnu.AI | A chat window answers questions about you with Google Gemini. Falls back to a built-in offline "local brain" if no API key is set, so it never breaks |
| Projects | SecureEdge featured with animated metric bars, screenshots, the research poster in a lightbox and an animated 8-step pipeline. Other projects get 3D tilt cards |
| Neural map | Skills drawn as a network; hover a group to light up its nodes |
| Achievement ledger | Every achievement is a block with a **real SHA-256 hash** linked to the previous one. Visitors can "tamper" with a block and watch the chain break, a live demo of your blockchain project |
| Telemetry | Live GitHub repos, stars, languages and contribution graph, plus LeetCode solved counts |
| Blog | Markdown posts from `src/posts/` open in a reader |
| Contact | Formspree form (falls back to opening the visitor's email app), copy-email, resume download |

## Run it locally

```bash
npm install
npm run dev        # open http://localhost:5173
```

## Edit your content

Almost everything lives in **`src/data/profile.js`**: text, projects, skills, achievements and links. The AI chat reads from the same file, so it updates automatically.

- **Images:** `public/`, including `vishnu.jpg`, `kabaddi-trophy.jpg`, the poster and screenshots
- **Resume:** replace `public/Vishnu_Vardhan_Reddy_Resume.pdf` (keep the name)
- **New blog post:** copy a file in `src/posts/` and change the front-matter at the top

## Deploy on Vercel (free)

1. Push this folder to a new GitHub repo.
2. On vercel.com, choose **Add New → Project** and import the repo. It detects Vite automatically.
3. **Turn on the AI:** get a free key at https://aistudio.google.com/apikey. In Vercel, go to **Settings → Environment Variables** and add `GEMINI_API_KEY`, then redeploy. Optionally set `GEMINI_MODEL` (default `gemini-2.5-flash`).
4. **Turn on the contact form:** create a free form at https://formspree.io and paste its ID into `config.formspreeId` in `profile.js`.

The key stays on the server in `api/chat.js` and is never sent to the browser. Without a key, the chat uses the offline brain in `src/data/localBrain.js`.

## Checklist before going live

- [ ] Set `config.leetcodeUsername` in `profile.js` to your real LeetCode username
- [ ] Add `GEMINI_API_KEY` in Vercel
- [ ] Add your Formspree ID
- [ ] Replace the `lnkd.in` short links in `profile.js` with the full GitHub/demo URLs
- [ ] Read the two blog posts in `src/posts/` and adjust them to your own words
