import { useApp } from './context/AppContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Focus } from './components/Focus'
import { Experience } from './components/Experience'
import { Work } from './components/Work'
import { Stack } from './components/Stack'
import { OffDuty } from './components/OffDuty'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/fx/ScrollProgress'
import { CursorGlow } from './components/fx/CursorGlow'

/** Page shell. Each section is its own component and reads copy from the content layer. */
export function App() {
  const { content } = useApp()
  return (
    <>
      <a className="skip-link" href="#main">
        {content.ui.skipToContent}
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Focus />
        <Experience />
        <Work />
        <Stack />
        <OffDuty />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
