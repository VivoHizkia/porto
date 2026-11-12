import type { Layer } from './profile'

export type Project = {
  name: string
  summary: string
  tech: string[]
  layers: Layer[]
  repo: string
  live?: string
}

const repo = (name: string) => `https://github.com/VivoHizkia/${name}`

export const featuredProjects: Project[] = [
  {
    name: 'Trading Floor',
    summary:
      'A rule-based crypto futures bot for Binance USDT-M, with a virtual isometric office as its dashboard. Entries come only from strategies and a risk engine tested with walk-forward backtests. AI agents write the reports and cannot override a trade decision.',
    tech: ['TypeScript', 'Next.js', 'Node.js', 'Binance API', 'Telegram'],
    layers: ['interface', 'server', 'data'],
    repo: repo('Ai-agent-trading'),
  },
  {
    name: 'TemplateBin',
    summary:
      'A multi-vendor marketplace for personal website templates. Sellers write their own HTML and CSS, buyers fill in the content through a generated editor with live preview, then pay to publish it as a live site. Includes admin review, seller balances, and payouts.',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'SQLite', 'Tailwind CSS'],
    layers: ['interface', 'server', 'data'],
    repo: repo('TEMPLATEBIN'),
  },
  {
    name: 'PlacidWay Knowledge Chatbot',
    summary:
      'A chatbot that answers only from seven source pages and links every answer to the page it came from. When the pages do not cover a question, it says so instead of guessing. Retrieval is a hand-written BM25 search over 178 chunks, with no vector database.',
    tech: ['Next.js 16', 'TypeScript', 'BM25', 'Gemini', 'cheerio'],
    layers: ['interface', 'server'],
    repo: repo('Built-chatbot-assessment'),
    live: 'https://built-chatbot-assessment.vercel.app',
  },
  {
    name: 'Accounting System',
    summary:
      'A full-stack accounting app: chart of accounts, journals, invoices, payments, contacts, and reports, with an audit log and JWT authentication.',
    tech: ['Hono', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS'],
    layers: ['interface', 'server', 'data'],
    repo: repo('accounting-system'),
  },
]

export const moreProjects: Project[] = [
  {
    name: 'Klipin',
    summary:
      'A toolkit for short-video creators: hook, idea, and hashtag generators, a saved library, and a weekly schedule planner with calendar export.',
    tech: ['React', 'Express', 'Tailwind CSS', 'Claude API'],
    layers: ['interface', 'server'],
    repo: repo('klipin'),
  },
  {
    name: 'Saham Detections',
    summary:
      'A dashboard that screens Indonesian (IDX) stocks and scores buy signals from moving averages, RSI, MACD, and volume.',
    tech: ['Python', 'Streamlit', 'pandas', 'Plotly'],
    layers: ['interface', 'data'],
    repo: repo('sahamdetections'),
  },
  {
    name: 'Todo with undo and redo',
    summary: 'A todo list with full undo and redo, built around a custom history hook.',
    tech: ['React', 'TypeScript'],
    layers: ['interface'],
    repo: repo('todolist'),
  },
  {
    name: 'Invoice App',
    summary:
      'An invoice manager from the Frontend Mentor challenge: create, edit, filter, and mark invoices as paid, in light or dark mode.',
    tech: ['React', 'Redux Toolkit', 'Tailwind CSS'],
    layers: ['interface'],
    repo: repo('frontend'),
  },
  {
    name: 'Task System',
    summary: 'A task scheduler with per-user quotas, saved state, and logging, written as a refactoring exercise.',
    tech: ['Python'],
    layers: ['server', 'data'],
    repo: repo('testcode'),
  },
]
