import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import type { Link } from '../content/types'
import { ArrowUpRightIcon, iconForHref } from './icons/BrandIcons'
import './Contact.css'

/** How far (px) a button follows the pointer. Small on purpose, it should feel magnetic, not loose. */
const PULL = 8

export function Contact() {
  const { content } = useApp()
  const { contact } = content
  const bodyRef = useReveal<HTMLDivElement>()

  return (
    <section id="contact" className="section contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <div ref={bodyRef} className="contact__body reveal">
          <h2 className="contact__title gradient-text">{contact.title}</h2>
          <p className="contact__text">{contact.text}</p>
        </div>
        <ul className="contact__links">
          {contact.links.map((link, index) => (
            <li key={link.href}>
              <ContactLink link={link} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ContactLink({ link, index }: { link: Link; index: number }) {
  const revealRef = useReveal<HTMLDivElement>()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const Icon = iconForHref(link.href)

  const follow = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = linkRef.current
    if (!el || event.pointerType !== 'mouse') return
    const box = el.getBoundingClientRect()
    const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2)
    const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2)
    el.style.setProperty('--pull-x', `${(dx * PULL).toFixed(1)}px`)
    el.style.setProperty('--pull-y', `${(dy * PULL).toFixed(1)}px`)
  }

  const release = () => {
    linkRef.current?.style.removeProperty('--pull-x')
    linkRef.current?.style.removeProperty('--pull-y')
  }

  return (
    <div ref={revealRef} className="reveal" style={{ '--i': index } as CSSProperties}>
      <a
        ref={linkRef}
        className="contact__link"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={follow}
        onPointerLeave={release}
      >
        {Icon && (
          <span className="contact__icon">
            <Icon />
          </span>
        )}
        <span className="contact__label">{link.label}</span>
        <ArrowUpRightIcon className="contact__arrow" />
      </a>
    </div>
  )
}
