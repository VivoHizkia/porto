import { Fragment, lazy, Suspense } from 'react'
import { LAYER_LABELS, LAYER_ORDER, profile, stats, buildPhrases } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { CountUp, Typewriter } from './Effects'
import { SceneBoundary } from './SceneBoundary'

const HeroScene = lazy(() => import('./HeroScene'))

const LAYER_NOTES = {
  interface: 'React, Next.js',
  server: 'Node.js, Laravel',
  data: 'MySQL, PostgreSQL',
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <header className="hero" id="top">
      <div className="hero__text">
        <p className="hero__status">
          <i aria-hidden="true" />
          Open to full-stack roles, {profile.location}
        </p>
        <h1 className="hero__name">
          {profile.name.split(' ').map((word, index) => (
            <Fragment key={word}>
              <span style={{ animationDelay: `${index * 120}ms, 0s` }}>{word}</span>{' '}
            </Fragment>
          ))}
        </h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__build">
          I build <Typewriter phrases={buildPhrases} />
        </p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            View projects
          </a>
          <a className="button" href="#contact">
            Contact me
          </a>
        </div>
        <dl className="hero__stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd>
                <CountUp to={stat.value} suffix={stat.suffix} />
              </dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
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
