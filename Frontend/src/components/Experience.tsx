import type { CSSProperties, ReactNode } from 'react'
import { useApp } from '../context/AppContext'
import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { SectionHead } from './SectionHead'
import { trackPointer } from '../hooks/usePointerGlow'
import type { Job } from '../content/types'
import { CheckIcon, JobKindIcon } from './icons/SectionIcons'
import '../styles/pointer-glow.css'
import './Experience.css'

interface TimelineItemProps {
  job: Job
  index: number
  ongoing: boolean
}

function TimelineItem({ job, index, ongoing }: TimelineItemProps) {
  const ref = useReveal<HTMLLIElement>(0.2)
  return (
    <li
      ref={ref}
      className={`timeline__item reveal${ongoing ? ' is-current' : ''}`}
      style={{ '--i': Math.min(index, 3) } as CSSProperties}
      data-kind={job.kind}
    >
      <span className="timeline__marker" aria-hidden="true">
        <JobKindIcon kind={job.kind} />
      </span>
      <article className="timeline__card card glow" onPointerMove={trackPointer}>
        <div className="timeline__head">
          <h3 className="timeline__role">{job.role}</h3>
          <p className="timeline__org">{job.org}</p>
          <p className="timeline__period">
            {ongoing && <span className="live-dot" aria-hidden="true" />}
            {job.period}
          </p>
        </div>
        <ul className="timeline__points">
          {job.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </li>
  )
}

export function Experience() {
  const { content } = useApp()
  const { experience, education, ui } = content
  const lineRef = useReveal<HTMLOListElement>(0.05)
  const eduRef = useReveal<HTMLHeadingElement>()
  const wrapRef = useRef<HTMLDivElement>(null)
  useScrollProgress(wrapRef)
  const isOngoing = (period: string) => period.includes(ui.present)

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHead id="experience" title={experience.title} intro={experience.intro} />

        <div ref={wrapRef} className="timeline-wrap">
        <ol ref={lineRef} className="timeline">
          {experience.jobs.map((job, index) => (
            <TimelineItem key={`${job.org}-${job.period}`} job={job} index={index} ongoing={isOngoing(job.period)} />
          ))}
        </ol>
        <span className="timeline__dot" aria-hidden="true" />
        </div>

        <div className="education">
          <h3 ref={eduRef} className="education__title reveal">
            {education.title}
          </h3>

          <ul className="education__schools">
            {education.schools.map((school, index) => (
              <EduCard key={school.school} index={index}>
                <div className="edu-card__top">
                  <h4 className="edu-card__name">{school.school}</h4>
                  <span className="edu-card__badge">
                    <CheckIcon className="edu-card__badge-icon" />
                    {school.status}
                  </span>
                </div>
                <p className="edu-card__sub">{school.degree}</p>
                {school.period && (
                  <p className="edu-card__meta">
                    {isOngoing(school.period) && <span className="live-dot" aria-hidden="true" />}
                    {school.period}
                  </p>
                )}
                {school.highlights && (
                  <ul className="edu-card__highlights">
                    {school.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </EduCard>
            ))}
          </ul>

          <div className="education__panels">
            <EduPanel title={education.communitiesTitle} index={0}>
              <ul className="edu-list">
                {education.communities.map((community) => (
                  <li key={community.name}>
                    <p className="edu-list__name">{community.name}</p>
                    <p className="edu-list__role">{community.role}</p>
                    <p className="edu-card__meta">{community.period}</p>
                  </li>
                ))}
              </ul>
            </EduPanel>

            <EduPanel title={education.academicProjectsTitle} index={1}>
              <ul className="edu-list">
                {education.academicProjects.map((project) => (
                  <li key={project.name}>
                    <p className="edu-list__name">{project.name}</p>
                    <p className="edu-list__text">{project.text}</p>
                  </li>
                ))}
              </ul>
            </EduPanel>
          </div>
        </div>
      </div>
    </section>
  )
}

function EduCard({ index, children }: { index: number; children: ReactNode }) {
  const ref = useReveal<HTMLLIElement>()
  return (
    <li ref={ref} className="edu-card reveal" style={{ '--i': index } as CSSProperties}>
      <div className="edu-card__body card glow" onPointerMove={trackPointer}>
        {children}
      </div>
    </li>
  )
}

function EduPanel({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} className="edu-panel reveal" style={{ '--i': index } as CSSProperties}>
      <div className="edu-panel__body card glow" onPointerMove={trackPointer}>
        <h4 className="edu-panel__title">{title}</h4>
        {children}
      </div>
    </section>
  )
}
