import type { CSSProperties } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'
import { SectionHead } from './SectionHead'
import type { PrivateProject, PublicProject } from '../content/types'
import { LockIcon } from './icons/SectionIcons'
import { GitHubIcon } from './icons/BrandIcons'
import './Work.css'

function PrivateCard({ project, label, index }: { project: PrivateProject; label: string; index: number }) {
  const ref = useReveal<HTMLLIElement>()
  const tiltRef = useTilt<HTMLElement>(4)
  return (
    <li ref={ref} className="work__item reveal" style={{ '--i': index } as CSSProperties}>
      <article ref={tiltRef} className="private-card card tilt">
        <div className="private-card__veil" aria-hidden="true">
          <span className="private-card__bar" />
          <span className="private-card__bar" />
          <span className="private-card__bar" />
          <span className="private-card__lock">
            <LockIcon />
          </span>
        </div>
        <p className="private-card__label">
          <LockIcon aria-hidden="true" />
          {label}
        </p>
        <h3 className="work__name">{project.title}</h3>
        <p className="work__text">{project.text}</p>
        <TagList tags={project.tags} />
      </article>
    </li>
  )
}

function PublicCard({ project, linkLabel, index }: { project: PublicProject; linkLabel: string; index: number }) {
  const ref = useReveal<HTMLLIElement>()
  const tiltRef = useTilt<HTMLElement>(4)
  return (
    <li ref={ref} className="work__item reveal" style={{ '--i': index } as CSSProperties}>
      <article ref={tiltRef} className="public-card card tilt">
        <h3 className="work__name">{project.title}</h3>
        <p className="work__text">{project.text}</p>
        <TagList tags={project.tags} />
        <a className="public-card__link" href={project.href} target="_blank" rel="noopener noreferrer">
          <GitHubIcon aria-hidden="true" />
          {linkLabel}
          <span className="public-card__arrow" aria-hidden="true">→</span>
        </a>
      </article>
    </li>
  )
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="work__tags">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export function Work() {
  const { content } = useApp()
  const { privateWork, publicWork, ui } = content

  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHead id="work" title={privateWork.title} intro={privateWork.intro} />
        <ul className="work__grid work__grid--private">
          {privateWork.projects.map((project, index) => (
            <PrivateCard key={project.title} project={project} label={ui.private} index={index} />
          ))}
        </ul>

        <SectionHead title={publicWork.title} intro={publicWork.intro} />
        <ul className="work__grid work__grid--public">
          {publicWork.projects.map((project, index) => (
            <PublicCard key={project.href} project={project} linkLabel={publicWork.linkLabel} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
