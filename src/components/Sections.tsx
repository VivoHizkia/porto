import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { jobs, schools } from '../data/experience'
import { marqueeItems, profile, skillGroups } from '../data/profile'
import { featuredProjects, moreProjects, PROJECT_FILTERS, type Project, type ProjectKind } from '../data/projects'
import { Cover } from './Covers'
import { GlowCard, Reveal } from './Effects'
import { LayerMarks } from './LayerMarks'

const NAV_LINKS = [
  { id: 'about', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      bar.current?.style.setProperty('transform', `scaleX(${progress})`)

      let current = ''
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id)
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.45) current = link.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav" aria-label="Main">
      <a className="nav__name" href="#top">
        {profile.name}
      </a>
      <ul className="nav__links">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} aria-current={active === link.id ? 'true' : undefined}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav__progress" ref={bar} aria-hidden="true" />
    </nav>
  )
}

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" aria-label="Technologies I use">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <Reveal>
      <h2 className="section__title" id={id}>
        {children}
      </h2>
    </Reveal>
  )
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <SectionTitle id="about-title">What I work with</SectionTitle>
      <Reveal delay={80}>
        <p className="section__lead">
          Tools I have used on the job and in my own projects, grouped by the layer of the stack
          they belong to.
        </p>
      </Reveal>
      <div className="skills">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 70}>
            <GlowCard className="skills__group" tilt={4}>
              <div data-layer={group.layer}>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const element = list.current
      if (!element) return
      const box = element.getBoundingClientRect()
      const progress = (window.innerHeight * 0.6 - box.top) / box.height
      element.style.setProperty('--progress', String(Math.min(Math.max(progress, 0), 1)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionTitle id="experience-title">Experience</SectionTitle>
      <ol className="timeline" ref={list}>
        {jobs.map((job) => (
          <li className="timeline__item" key={job.role + job.period}>
            <Reveal>
              <p className="timeline__when">
                {job.period} <span>{job.location}</span>
              </p>
              <h3>{job.role}</h3>
              <p className="timeline__where">
                {job.company} <span>{job.kind}</span>
              </p>
              <ul className="timeline__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <h3 className="section__subtitle">Education</h3>
      </Reveal>
      <div className="schools">
        {schools.map((school, index) => (
          <Reveal key={school.name} delay={index * 90}>
            <GlowCard className="school" tilt={3}>
              <p className="timeline__when">{school.period}</p>
              <h4>{school.name}</h4>
              <p>{school.detail}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.live && !project.repo) return null
  return (
    <p className="project__links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live demo
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer">
          Source on GitHub
        </a>
      )}
    </p>
  )
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="tech" aria-label="Built with">
      {tech.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all')
  const visible = moreProjects.filter((project) => filter === 'all' || project.kind === filter)

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionTitle id="projects-title">Projects</SectionTitle>
      <Reveal delay={80}>
        <p className="section__lead">
          The three bars beside each name show which layers of the stack the project covers:
          interface, API, and data.
        </p>
      </Reveal>

      <div className="featured">
        {featuredProjects.map((project) => (
          <Reveal key={project.name}>
            <GlowCard className="feature" tilt={2}>
              <div className="feature__cover">{project.cover && <Cover kind={project.cover} />}</div>
              <article className="feature__body">
                <div className="project__head">
                  <LayerMarks layers={project.layers} />
                  <h3>{project.name}</h3>
                </div>
                <p>{project.summary}</p>
                <TechList tech={project.tech} />
                <ProjectLinks project={project} />
              </article>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="section__subtitle">More projects</h3>
      </Reveal>
      <div className="filters" role="group" aria-label="Filter projects">
        {PROJECT_FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="more" key={filter}>
        {visible.map((project, index) => (
          <div className="more__item" key={project.name} style={{ '--i': index } as CSSProperties}>
            <GlowCard className="project--small" tilt={5}>
              <article>
                <div className="project__head">
                  <LayerMarks layers={project.layers} />
                  <h4>{project.name}</h4>
                </div>
                <p>{project.summary}</p>
                <TechList tech={project.tech} />
                <ProjectLinks project={project} />
              </article>
            </GlowCard>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <Reveal>
        <div className="contact">
          <h2 className="section__title" id="contact-title">
            Get in touch
          </h2>
          <p className="section__lead">
            I am looking for a full-stack developer role and I am based in {profile.location}.
            Email is the fastest way to reach me.
          </p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact__actions">
            <button className="button button--primary" type="button" onClick={copyEmail}>
              {copied ? 'Email copied' : 'Copy email'}
            </button>
            <a className="button" href={profile.whatsappHref} target="_blank" rel="noreferrer">
              Message on WhatsApp
            </a>
            <a className="button" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <p className="contact__phone">
            Or call <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 {profile.name}. Built with React and Three.js.
      </p>
    </footer>
  )
}
