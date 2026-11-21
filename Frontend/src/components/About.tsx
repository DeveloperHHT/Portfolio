import type { CSSProperties } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './SectionHead'
import './About.css'

const MAX_SCORE = 5

export function About() {
  const { content } = useApp()
  const { about, ui } = content
  const textRef = useReveal<HTMLDivElement>()
  const factsRef = useReveal<HTMLDivElement>()
  const languagesRef = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" titleId="about-title" title={about.title} />

        <div className="about__grid">
          <div ref={textRef} className="about__text reveal">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'about__lead' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about__aside">
            <div ref={factsRef} className="card about__card reveal" style={{ '--i': 1 } as CSSProperties}>
              <dl className="about__facts">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="about__fact">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div ref={languagesRef} className="card about__card reveal" style={{ '--i': 2 } as CSSProperties}>
              <h3 className="about__card-title">{ui.languagesLabel}</h3>
              <ul className="about__languages">
                {about.languages.map((language, index) => (
                  <li key={language.name} className="about__language">
                    <div className="about__language-head">
                      <span className="about__language-name">{language.name}</span>
                      <span className="about__language-level">{language.level}</span>
                    </div>
                    <div
                      className="about__meter"
                      role="meter"
                      aria-label={`${language.name}, ${language.level}`}
                      aria-valuemin={0}
                      aria-valuemax={MAX_SCORE}
                      aria-valuenow={language.score}
                    >
                      <span
                        className="about__meter-fill"
                        style={
                          {
                            '--fill': language.score / MAX_SCORE,
                            '--n': index,
                          } as CSSProperties
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
