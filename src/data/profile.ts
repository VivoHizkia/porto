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
  location: 'Tangerang Selatan, Indonesia',
  intro:
    'I work across the whole stack, from the interface people use to the API behind it and the data underneath. As a system engineer I also kept production web services running.',
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
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML and CSS'],
  },
  {
    title: 'API',
    layer: 'server',
    summary: 'The logic behind each request.',
    skills: ['Node.js', 'Express', 'Hono', 'Laravel', 'PHP', 'Python'],
  },
  {
    title: 'Data',
    layer: 'data',
    summary: 'Where it is stored and queried.',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'SQLite', 'Prisma'],
  },
  {
    title: 'Mobile and games',
    summary: 'Apps beyond the browser.',
    skills: ['Kotlin', 'Jetpack Compose', 'React Native', 'Ionic', 'Unity with C#'],
  },
  {
    title: 'Operations',
    summary: 'Keeping production running.',
    skills: ['Apache', 'Docker', 'Git and GitHub', 'Load balancing', 'Service recovery scripts'],
  },
  {
    title: 'AI and automation',
    summary: 'Models and bots wired into products.',
    skills: ['Gemini API', 'Claude API', 'BM25 retrieval', 'Trading bots', 'Telegram bots'],
  },
]

export const buildPhrases = [
  'dashboards',
  'internal business systems',
  'mobile apps',
  'AI chatbots',
  'trading bots',
]

export const stats = [
  { value: 1, suffix: '+', label: 'year full-time in web operations' },
  { value: 2, suffix: '+', label: 'years of internships and freelance' },
  { value: 14, suffix: '', label: 'projects built' },
]

export const marqueeItems = [
  'React',
  'Next.js',
  'TypeScript',
  'Vue.js',
  'Node.js',
  'Laravel',
  'Express',
  'Hono',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Prisma',
  'Kotlin',
  'React Native',
  'Docker',
  'Python',
  'Three.js',
]
