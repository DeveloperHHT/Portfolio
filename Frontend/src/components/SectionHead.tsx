import type { ReactNode } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import './SectionHead.css'

interface Props {
  /** Matches an entry in content.nav; the number and label come from its position. Leave out for a second heading in the same section. */
  id?: string
  title: ReactNode
  intro?: ReactNode
  /** Id for the h2, so a section can point aria-labelledby at it. */
  titleId?: string
  /** Warm accent for the off-duty part. */
  tone?: 'cool' | 'warm'
}

/** Shared section header: numbered eyebrow, big title, animated rule, optional intro. */
export function SectionHead({ id, title, intro, titleId, tone = 'cool' }: Props) {
  const { content } = useApp()
  const ref = useReveal<HTMLDivElement>(0.3)
  const index = id ? content.nav.findIndex((item) => item.id === id) : -1
  const label = index >= 0 ? content.nav[index].label : ''

  return (
    <div ref={ref} className={`section-head section-head--${tone}${index < 0 ? ' section-head--sub' : ''} reveal`}>
      {index >= 0 && (
        <p className="section-head__eyebrow">
          <span className="section-head__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="section-head__line" aria-hidden="true" />
          <span>{label}</span>
        </p>
      )}
      <h2 id={titleId} className="section-head__title">
        {title}
      </h2>
      {intro ? <p className="section-head__intro">{intro}</p> : null}
    </div>
  )
}
