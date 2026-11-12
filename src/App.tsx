import { lazy, Suspense } from 'react'
import { CursorGlow } from './components/Effects'
import { Hero } from './components/Hero'
import { SceneBoundary } from './components/SceneBoundary'
import { About, Contact, Experience, Footer, Marquee, Nav, Projects } from './components/Sections'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

const Backdrop = lazy(() => import('./components/Backdrop'))

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop__aurora" />
        <SceneBoundary fallback={null}>
          <Suspense fallback={null}>
            <Backdrop animated={!reducedMotion} />
          </Suspense>
        </SceneBoundary>
      </div>
      {!reducedMotion && <CursorGlow />}

      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
