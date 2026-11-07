// ─────────────────────────────────────────────────────────────
//  ONE FILE TO EDIT. Everything on the site reads from here.
// ─────────────────────────────────────────────────────────────

export const config = {
  // Your LeetCode username (for live stats). Change this!
  leetcodeUsername: 'vishnuvardhan05',
  githubUsername: 'vishnu2005vardhan',
  // Create a free form at https://formspree.io → paste its ID (e.g. "xyzabcd")
  formspreeId: 'xljjkbyy',
  // Serverless endpoint for the AI chat (api/chat.js). Leave as is on Vercel.
  chatEndpoint: '/api/chat',
}

export const profile = {
  name: 'Vishnu Vardhan Reddy M R',
  short: 'Vishnu',
  role: 'AI & Full-Stack Developer',
  tagline: 'I build software that thinks — from RAG chatbots in the cloud to threat detection on a Raspberry Pi.',
  location: 'Bengaluru, India',
  email: 'vishnu560597@gmail.com',
  phone: '+91 91874 86054',
  photo: '/vishnu.jpg',
  resume: '/Vishnu_Vardhan_Reddy_Resume.pdf',
  links: {
    github: 'https://github.com/vishnu2005vardhan',
    linkedin: 'https://www.linkedin.com/in/vishnuvardhanreddy05/',
  },
  status: 'Open to internships & SDE roles',
  about: [
    "I'm a Computer Science (Data Science) undergrad at Acharya Institute of Technology, Bengaluru, graduating in 2027 with an 8.5 CGPA.",
    'I like the full journey of a product: designing the API, wiring the auth, shipping the React UI and then teaching it to reason with an LLM. My work spans MERN apps, retrieval-augmented chatbots, n8n automations and edge-AI computer vision.',
    "Off the keyboard, I'm a state-level kabaddi player, a VTU representative and an NCC cadet. Sport taught me the thing I bring to every team: stay calm under pressure and finish the raid.",
  ],
}

export const stats = [
  { value: 'Accepted', label: 'Springer LNNS paper · MCT4SD 2026' },
  { value: '93.8%', label: 'Precision of my edge threat detector' },
  { value: '150+', label: 'LeetCode problems solved' },
  { value: '8.5', label: 'CGPA · B.E. CSE (Data Science)' },
]

export const projects = [
  {
    id: 'edge-iot',
    featured: true,
    title: 'SecureEdge — Edge-Based Intelligent IoT Monitoring with Blockchain Security',
    kicker: 'Major Project · Research paper accepted',
    summary:
      'Cloud surveillance adds latency and tamper risk. SecureEdge detects threats locally on a Raspberry Pi with a custom YOLOv8 model (knife, pistol, smartphone) plus YOLOv8n person counting — and seals every security event into a SHA-256 hash-linked ledger so the evidence can be verified later.',
    points: [
      'Custom YOLOv8 trained 150 epochs (best at 107); YOLOv8n for crowd counting',
      'Rule-based decision matrix on confidence, crowd size and time of day',
      'Event-triggered evidence capture: screenshot + clip + metadata',
      'SHA-256 hash-linked event blocks; dashboard verifies chain as VALID',
      'Flask dashboard with live feed, alerts, event history and recording',
    ],
    metrics: [
      { label: 'Precision', value: 93.83 },
      { label: 'Recall', value: 86.5 },
      { label: 'mAP@50', value: 93.61 },
      { label: 'mAP@50–95', value: 71.07 },
    ],
    flow: ['Pi Camera', 'OpenCV Preprocess', 'YOLOv8 + YOLOv8n', 'Decision Matrix', 'Evidence', 'SHA-256 Metadata', 'Hash Ledger', 'Dashboard'],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'Raspberry Pi', 'SHA-256 Ledger'],
    paper: 'Accepted at MCT4SD 2026, Manila (Springer LNNS) — oral presentation on 10 December 2026.',
    team: 'Team of 4 · Guide: Prof. Sanjay P, Acharya Institute of Technology',
    images: ['/edge-dashboard.png', '/edge-evidence.png'],
    poster: '/edge-iot-poster.png',
    links: [{ label: 'View project poster', href: '/edge-iot-poster.png' }],
  },
  {
    id: 'edureach',
    title: 'EduReach AI — Agentic College Chatbot',
    kicker: 'Agentic RAG · Voice AI',
    summary:
      'A full-stack AI assistant that gives students instant answers on admissions, courses, fees, placements and campus life — by text or by talking to an AI voice counselor.',
    points: [
      'Agentic RAG pipeline with LangChain + MongoDB Atlas Vector Search',
      'Google Gemini for grounded, context-aware answers',
      'AI voice counseling powered by Vapi AI',
      'JWT authentication; frontend on Vercel, backend on Render',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'LangChain', 'Gemini', 'Vapi AI'],
    links: [{ label: 'Live demo', href: 'https://edureach-ai-chi.vercel.app/' }],
    accent: 'cyan',
  },
  {
    id: 'finance',
    title: 'AI-Powered Finance Tracker',
    kicker: 'MERN · OpenAI',
    summary:
      'Income, expense and budget management with an AI analyst on top — it reads your spending and tells you where your money is going.',
    points: [
      'JWT auth + REST APIs on Node/Express',
      'Redux Toolkit state management, responsive Tailwind UI',
      'AI-powered financial insights via OpenAI API',
      'Spending analytics, reports and interactive dashboard charts',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind', 'Node.js', 'Express', 'MongoDB Atlas', 'OpenAI'],
    links: [{ label: 'GitHub', href: 'https://github.com/vishnu2005vardhan/AI-Finance_Tracker' }],
    accent: 'violet',
  },
  {
    id: 'news',
    title: 'AI News Summarizer — Daily Newsletter Agent',
    kicker: 'Automation · n8n',
    summary:
      'An n8n workflow that pulls AI & tech news from multiple RSS feeds, summarizes every article with Gemini and mails me a personalized newsletter each morning.',
    points: [
      'Multi-source RSS ingestion on a daily schedule',
      'Gemini-generated summaries per article',
      'Formatted digest delivered through Gmail',
      'Cut 30 minutes of browsing down to 2 minutes of reading',
    ],
    stack: ['n8n', 'Gemini AI', 'Gmail API', 'RSS'],
    links: [{ label: 'See on LinkedIn', href: 'https://www.linkedin.com/in/vishnuvardhanreddy05/' }],
    accent: 'lime',
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C'] },
  { group: 'Frontend', items: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'HTML5'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Flask'] },
  { group: 'AI / ML', items: ['RAG', 'LangChain', 'Gemini', 'OpenAI API', 'Vapi AI', 'YOLOv8', 'OpenCV'] },
  { group: 'Data', items: ['MongoDB Atlas', 'Vector Search', 'SQL'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'n8n', 'Vercel', 'Render', 'Raspberry Pi'] },
  { group: 'Core CS', items: ['DSA', 'Networks', 'GenAI'] },
]

// Rendered as a hash-linked "chain of blocks" — a nod to the SecureEdge ledger.
export const achievements = [
  { year: '2026', title: 'Research paper accepted — Springer LNNS', detail: 'MCT4SD 2026, Manila. Oral presentation on 10 Dec 2026 for the SecureEdge project.', tag: 'Research' },
  { year: '2026', title: 'VTU Kabaddi — Runners-up, Bengaluru North Division', detail: 'Represented Acharya Institute of Technology in the 2026-27 VTU inter-collegiate kabaddi (men).', tag: 'Sport', image: '/kabaddi-trophy.jpg' },
  { year: 'Win', title: 'Hackathon Winner — SRM University, Chennai', detail: 'Won the hackathon hosted by SRM University, Chennai.', tag: 'Hackathon' },
  { year: 'Ongoing', title: '150+ LeetCode problems solved', detail: 'Consistent DSA practice in arrays, trees, graphs and DP.', tag: 'DSA' },
  { year: 'Ongoing', title: 'State-level Kabaddi player & VTU representative', detail: 'Pressure, timing and teamwork — learned on the mat.', tag: 'Sport' },
  { year: 'Ongoing', title: 'NCC Cadet', detail: 'Discipline, leadership and service.', tag: 'Leadership' },
]

export const education = [
  { school: 'Acharya Institute of Technology, Bengaluru', degree: 'B.E. Computer Science (Data Science)', period: '2023 – 2027', score: 'CGPA 8.5 / 10' },
  { school: 'Varadadri PU College, Bagepalli', degree: 'Pre-University (PCMB)', period: 'Passed March 2023', score: '93.6%' },
]

export const languages = ['English', 'Kannada', 'Telugu']

// Suggested questions shown as chips in the AI chat
export const suggestedQuestions = [
  'What is your best project?',
  'Tell me about your research paper',
  'What tech stack do you use?',
  'Are you open to internships?',
  'How do I contact you?',
]
