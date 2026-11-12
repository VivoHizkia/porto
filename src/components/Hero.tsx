import { lazy, Suspense } from 'react'
import { LAYER_LABELS, LAYER_ORDER, profile } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SceneBoundary } from './SceneBoundary'

const HeroScene = lazy(() => import('./HeroScene'))

const LAYER_NOTES = {
  interface: 'React, Next.js',
  server: 'Node.js, Hono',
  data: 'PostgreSQL, Prisma',
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <header className="hero" id="top">
      <div className="hero__text">
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            View projects
          </a>
          <a className="button" href="#contact">
            Contact me
          </a>
        </div>
      </div>

      <div className="hero__stage">
        <div className="hero__canvas">
          <SceneBoundary fallback={<div className="hero__fallback" aria-hidden="true" />}>
            <Suspense fallback={null}>
              <HeroScene animated={!reducedMotion} />
            </Suspense>
          </SceneBoundary>
        </div>
        <ul className="hero__legend">
          {LAYER_ORDER.map((layer) => (
            <li key={layer} data-layer={layer}>
              <strong>{LAYER_LABELS[layer]}</strong>
              <span>{LAYER_NOTES[layer]}</span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
