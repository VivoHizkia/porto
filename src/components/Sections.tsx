import { useEffect, useState, type ReactNode } from 'react'
import { jobs, schools } from '../data/experience'
import { profile, skillGroups } from '../data/profile'
import { featuredProjects, moreProjects, PROJECT_FILTERS, type Project, type ProjectKind } from '../data/projects'
import { Cover } from './Covers'

const NAV_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
]

export function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id)
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.4) current = link.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav__inner">
        <a className="logo" href="#top" aria-label={`${profile.name}, back to top`}>
          vivo<span>.</span>
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
        <a className="button button--outline nav__cta" href="#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </nav>
  )
}

function SectionHead({
  id,
  number,
  label,
  title,
  lead,
}: {
  id: string
  number: string
  label: string
  title: ReactNode
  lead?: string
}) {
  return (
    <div className="section__head">
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h2 className="section__title" id={id}>
        {title}
      </h2>
      {lead && <p className="section__lead">{lead}</p>}
    </div>
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

function ProjectLinks({ project }: { project: Project }) {
  if (!project.live && !project.repo) return null
  return (
    <p className="project__links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer">
          Source on GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
    </p>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionHead
        id="projects-title"
        number="01"
        label="Selected work"
        title="Built across the stack."
        lead="Interface, API, and data — connected in real projects."
      />
      <div className="featured">
        {featuredProjects.map((project, index) => (
          <article className="feature" key={project.name}>
            <Cover project={project} index={index} />
            <div className="feature__body">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="feature__foot">
                <TechList tech={project.tech} />
                <ProjectLinks project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section className="section" id="expertise" aria-labelledby="expertise-title">
      <SectionHead
        id="expertise-title"
        number="02"
        label="Toolkit"
        title="The right tools. Every layer."
        lead="These are the tools I have worked with, on the job and in my own projects."
      />
      <ol className="toolkit">
        {skillGroups.map((group, index) => (
          <li key={group.title}>
            <span className="toolkit__index">0{index + 1}</span>
            <div>
              <h3>{group.title}</h3>
              <p className="toolkit__summary">{group.summary}</p>
              <p className="toolkit__skills">{group.skills.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section background" id="experience" aria-labelledby="experience-title">
      <div className="background__intro">
        <p className="eyebrow">03 / Background</p>
        <h2 className="section__title" id="experience-title">
          Experience
          <br />
          that connects.
        </h2>
        <p className="section__lead">From building interfaces to keeping production systems running.</p>
      </div>

      <ol className="jobs">
        {jobs.map((job) => (
          <li className="row" key={job.role + job.period}>
            <div className="row__meta">
              <p className="row__when">{job.period.replace(' to ', ' — ')}</p>
              <p>{job.location}</p>
            </div>
            <div>
              <h3>{job.role}</h3>
              <p className="row__where">
                {job.company} / {job.kind}
              </p>
              <ul className="row__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="eyebrow background__label">Education</h3>
      <ol className="schools">
        {schools.map((school) => (
          <li className="row row--compact" key={school.name}>
            <div className="row__meta">
              <p>{school.period.replace(' to ', ' — ')}</p>
            </div>
            <div>
              <h4>{school.name}</h4>
              <p className="row__detail">{school.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Archive() {
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all')
  const visible = moreProjects.filter((project) => filter === 'all' || project.kind === filter)

  return (
    <section className="section" id="archive" aria-labelledby="archive-title">
      <SectionHead
        id="archive-title"
        number="04"
        label="Explorations"
        title="More things I’ve built."
        lead="From mobile apps and games to small tools that make everyday work easier."
      />
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
      <div className="archive">
        {visible.map((project) => (
          <article className="archive__item" key={project.name}>
            <h3>
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noreferrer">
                  {project.name}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p>{project.summary}</p>
            <TechList tech={project.tech} />
          </article>
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
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div>
          <p className="eyebrow eyebrow--light">Let’s build something that works.</p>
          <h2 className="contact__title" id="contact-title">
            Good work starts with a hello.
          </h2>
          <p className="contact__lead">
            I am looking for full-stack developer roles and I am based in {profile.location}. Email is
            the fastest way to reach me.
          </p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <p className="contact__phone">
            Or call <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
          </p>
        </div>
        <div className="contact__actions">
          <a className="button button--cream" href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="button button--gold" href={profile.whatsappHref} target="_blank" rel="noreferrer">
            Message on WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <button className="button button--ghost" type="button" onClick={copyEmail}>
            {copied ? 'Email copied' : 'Copy email'}
          </button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="logo" href="#top">
          vivo<span>.</span>
        </a>
        <p>Full-stack developer · {profile.location}</p>
        <a className="text-link" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
