export type Layer = 'interface' | 'server' | 'data'

export const LAYER_LABELS: Record<Layer, string> = {
  interface: 'Interface',
  server: 'API',
  data: 'Data',
}

export const LAYER_ORDER: Layer[] = ['interface', 'server', 'data']

export const profile = {
  name: 'Vivo Hizkia Imanuel',
  role: 'Full-Stack Developer',
  intro:
    'I build web applications end to end: the interface people use, the API behind it, and the data underneath. Lately that includes AI and automation, from a source-grounded chatbot to a rule-based trading bot.',
  email: 'vivoimanuel22@gmail.com',
  phoneDisplay: '+62 812-1121-1030',
  phoneHref: 'tel:+6281211211030',
  whatsappHref: 'https://wa.me/6281211211030',
  github: 'https://github.com/VivoHizkia',
  githubHandle: 'VivoHizkia',
}

export type SkillGroup = {
  title: string
  layer?: Layer
  summary: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Interface',
    layer: 'interface',
    summary: 'What people see and use.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Redux Toolkit'],
  },
  {
    title: 'API',
    layer: 'server',
    summary: 'The logic behind each request.',
    skills: ['Node.js', 'Hono', 'Express', 'Next.js route handlers', 'JWT auth', 'Python'],
  },
  {
    title: 'Data',
    layer: 'data',
    summary: 'Where it is stored and queried.',
    skills: ['PostgreSQL', 'SQLite', 'Prisma', 'pandas'],
  },
  {
    title: 'AI and automation',
    summary: 'Models and bots wired into real products.',
    skills: ['Gemini API', 'Claude API', 'BM25 retrieval', 'Trading bots', 'Telegram bots', 'Streamlit'],
  },
]
