import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'
import { SectionHead } from './SectionHead'
import { AgentTerminal } from './visuals/AgentTerminal'
import { Pipeline } from './visuals/Pipeline'
import { trackPointer } from '../hooks/usePointerGlow'
import { FocusIcon } from './icons/FocusIcons'
import type { CSSProperties } from 'react'
import type { FocusArea } from '../content/types'
import '../styles/pointer-glow.css'
import './Focus.css'

function FocusCard({ area, index }: { area: FocusArea; index: number }) {
  const ref = useReveal<HTMLLIElement>()
  const tiltRef = useTilt<HTMLElement>(4)
  return (
    <li ref={ref} className="focus__item reveal" style={{ '--i': index } as CSSProperties} data-area={area.id}>
      <article ref={tiltRef} className="focus__card card glow tilt" onPointerMove={trackPointer}>
        <div className="focus__top">
          <span className="focus__icon">
            <FocusIcon id={area.id} />
          </span>
          <div>
            <h3 className="focus__title">{area.title}</h3>
            <p className="focus__summary">{area.summary}</p>
          </div>
        </div>
        <ul className="focus__points">
          {area.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </li>
  )
}

export function Focus() {
  const { content } = useApp()
  return (
    <section id="focus" className="section focus">
      <div className="container">
        <SectionHead id="focus" title={content.focus.title} intro={content.focus.intro} />
        <ul className="focus__grid">
          {content.focus.areas.map((area, index) => (
            <FocusCard key={area.id} area={area} index={index} />
          ))}
        </ul>
        <div className="focus-visuals">
          <Pipeline />
          <AgentTerminal />
        </div>
      </div>
    </section>
  )
}
