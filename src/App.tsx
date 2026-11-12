import { Hero } from './components/Hero'
import { About, Contact, Footer, Nav, Projects } from './components/Sections'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Nav />
      <Hero />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
