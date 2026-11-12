import { profile, skillGroups } from '../data/profile'
import { featuredProjects, moreProjects, type Project } from '../data/projects'
import { LayerMarks } from './LayerMarks'

export function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="nav__name" href="#top">
        {profile.name}
      </a>
      <ul className="nav__links">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <h2 className="section__title" id="about-title">
        What I work with
      </h2>
      <p className="section__lead">
        Most of my projects are TypeScript from top to bottom. These are the tools I have shipped
        with, grouped by the layer of the stack they belong to.
      </p>
      <div className="skills">
        {skillGroups.map((group) => (
          <div className="skills__group" key={group.title} data-layer={group.layer}>
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <p className="project__links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live demo
        </a>
      )}
      <a href={project.repo} target="_blank" rel="noreferrer">
        Source on GitHub
      </a>
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
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <h2 className="section__title" id="projects-title">
        Projects
      </h2>
      <p className="section__lead">
        The three bars beside each project show which layers of the stack it covers: interface,
        API, and data.
      </p>

      <div className="featured">
        {featuredProjects.map((project) => (
          <article className="project" key={project.name}>
            <div className="project__head">
              <LayerMarks layers={project.layers} />
              <h3>{project.name}</h3>
            </div>
            <div className="project__body">
              <p>{project.summary}</p>
              <TechList tech={project.tech} />
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>

      <h3 className="section__subtitle">Smaller builds</h3>
      <div className="more">
        {moreProjects.map((project) => (
          <article className="project project--small" key={project.name}>
            <div className="project__head">
              <LayerMarks layers={project.layers} />
              <h4>{project.name}</h4>
            </div>
            <p>{project.summary}</p>
            <TechList tech={project.tech} />
            <ProjectLinks project={project} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <h2 className="section__title" id="contact-title">
        Get in touch
      </h2>
      <p className="section__lead">
        I am looking for a full-stack developer role. Email is the fastest way to reach me.
      </p>
      <a className="contact__email" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <dl className="contact__list">
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
          </dd>
        </div>
        <div>
          <dt>WhatsApp</dt>
          <dd>
            <a href={profile.whatsappHref} target="_blank" rel="noreferrer">
              Send a message
            </a>
          </dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.githubHandle}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
