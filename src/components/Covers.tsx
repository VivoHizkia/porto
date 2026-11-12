import type { Project } from '../data/projects'

/* A typographic cover: a coloured panel with a category line, a short headline, and the project number. */
export function Cover({ project, index }: { project: Project; index: number }) {
  return (
    <div className="cover" data-tone={project.cover} aria-hidden="true">
      <span className="cover__eyebrow">{project.eyebrow}</span>
      <p className="cover__headline">
        {project.headline?.split('\n').map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <span className="cover__number">{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}
