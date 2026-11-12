export type Job = {
  role: string
  company: string
  kind: string
  period: string
  location: string
  points: string[]
}

export const jobs: Job[] = [
  {
    role: 'System Engineer, Web Operations',
    company: 'Mobile Data Indonesia',
    kind: 'Full-time',
    period: 'Mar 2025 to Mar 2026',
    location: 'Tangerang, Indonesia',
    points: [
      'Maintained the company web server (Apache) and MySQL databases, monitoring user data and system health with SQL queries to keep services stable.',
      'Built a PHP load balancing system that spreads incoming traffic across servers, preventing crashes during traffic spikes.',
      'Wrote an automated recovery script in PHP that brings services back up after unexpected outages.',
      'Supervised team members, assigning tasks and coordinating day-to-day web operations.',
    ],
  },
  {
    role: 'Front End Developer',
    company: 'Mobile Data Indonesia',
    kind: 'Internship',
    period: 'Sep 2024 to Mar 2025',
    location: 'Tangerang, Indonesia',
    points: [
      'Developed a central dashboard that monitors the performance and status of multiple operational systems in real time.',
      'Built a web-based invoice management system with automated invoice generation and payment-status tracking.',
    ],
  },
  {
    role: 'Front End Developer',
    company: 'Equinox Shipping Group',
    kind: 'Internship',
    period: 'Jun 2024 to Sep 2024',
    location: 'Jakarta Selatan, Indonesia',
    points: [
      "Designed and built the front end of the internal job portal and integrated it with the company's recruitment website.",
      "Developed and optimized the dashboard UI of the company's internal website.",
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Multimedia Nusantara University',
    kind: 'Freelance',
    period: 'Feb 2023 to Jul 2023',
    location: 'Tangerang, Indonesia',
    points: [
      'Designed the UI/UX and built a responsive dashboard for a community health center (Puskesmas) system.',
      'Built a full-stack queue management system, designing the back-end architecture and database logic in Laravel.',
      "Built and optimized the project's public landing page.",
    ],
  },
]

export type School = {
  name: string
  detail: string
  period: string
}

export const schools: School[] = [
  {
    name: 'Multimedia Nusantara University',
    detail: 'Bachelor of Science in Computer Science, GPA 3.24 / 4.00',
    period: 'Aug 2021 to Jan 2026',
  },
  {
    name: 'SMA Penabur Bintaro Jaya',
    detail: 'Senior high school',
    period: 'Jul 2018 to May 2021',
  },
]
