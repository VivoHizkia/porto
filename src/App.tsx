import { Hero } from './components/Hero'
import { Archive, Contact, Experience, Expertise, Footer, Nav, Projects } from './components/Sections'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <Nav />
      <Hero />
      <main>
        <Projects />
        <Expertise />
        <Experience />
        <Archive />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
