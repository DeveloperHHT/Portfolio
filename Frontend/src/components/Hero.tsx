import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { useApp } from '../context/AppContext'
import { useMagnetic } from '../hooks/useMagnetic'
import { useMotionAllowed } from '../hooks/useMotionAllowed'
import { useTilt } from '../hooks/useTilt'
import { publicUrl } from '../utils/publicUrl'
import { NeuralField } from './fx/NeuralField'
import './Hero.css'

const TYPE_MS = 70
const DELETE_MS = 35
const HOLD_MS = 1800
const GAP_MS = 350

/** Call-to-action link that leans toward the pointer. */
function MagneticLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <a ref={ref} className={`${className} hero__magnetic`} href={href}>
      {children}
    </a>
  )
}

/** Types each word out, holds it, deletes it, then moves to the next. Static first word when motion is off. */
function useTypewriter(words: string[], animate: boolean): string {
  const [text, setText] = useState(words[0] ?? '')

  useEffect(() => {
    if (!animate || words.length === 0) {
      setText(words[0] ?? '')
      return
    }
    let wordIndex = 0
    let length = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const word = words[wordIndex]
      if (!deleting) {
        length += 1
        setText(word.slice(0, length))
        if (length === word.length) {
          deleting = true
          timer = setTimeout(tick, HOLD_MS)
        } else {
          timer = setTimeout(tick, TYPE_MS)
        }
      } else {
        length -= 1
        setText(word.slice(0, length))
        if (length === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          timer = setTimeout(tick, GAP_MS)
        } else {
          timer = setTimeout(tick, DELETE_MS)
        }
      }
    }

    setText('')
    timer = setTimeout(tick, GAP_MS)
    return () => clearTimeout(timer)
  }, [words, animate])

  return text
}

/** Given names stay plain, the surname gets the gradient on its own line. */
function splitName(name: string): { given: string; family: string } {
  const words = name.trim().split(/\s+/)
  return { given: words.slice(0, -1).join(' '), family: words[words.length - 1] ?? '' }
}

const stagger = (index: number): CSSProperties => ({ '--d': `${index * 90}ms` }) as CSSProperties

export function Hero() {
  const { content } = useApp()
  const { hero, nav } = content
  const motion = useMotionAllowed()
  const tiltRef = useTilt<HTMLDivElement>(8)
  const role = useTypewriter(hero.roles, motion)
  const { given, family } = splitName(hero.name)
  const badges = [hero.roles[0], hero.roles[1], hero.roles[3]].filter(Boolean)

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <NeuralField />
        <span className="hero__orb hero__orb--violet" />
        <span className="hero__orb hero__orb--cyan" />
        <span className="hero__orb hero__orb--rose" />
      </div>

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow hero__rise" style={stagger(0)}>
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 className="hero__name hero__rise" style={stagger(1)}>
            {given && <span className="hero__name-given">{given} </span>}
            <span className="hero__name-family gradient-text">{family}</span>
          </h1>

          <p className="hero__role hero__rise" style={stagger(2)}>
            <span className="sr-only">{hero.roles.join(', ')}</span>
            <span className="hero__role-live" aria-hidden="true">
              {role}
              <span className="hero__caret" />
            </span>
          </p>

          <p className="hero__tagline hero__rise" style={stagger(3)}>
            {hero.tagline.split(' ').map((word, index) => (
              <Fragment key={`${hero.tagline}-${index}`}>
                <span className="hero__word" style={{ '--w': index } as CSSProperties}>
                  {word}
                </span>{' '}
              </Fragment>
            ))}
          </p>

          <div className="hero__actions hero__rise" style={stagger(4)}>
            <MagneticLink className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <span className="hero__arrow" aria-hidden="true">
                →
              </span>
            </MagneticLink>
            <MagneticLink className="btn hero__btn-outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </MagneticLink>
          </div>

          <ul className="hero__chips hero__rise" style={stagger(5)}>
            {hero.chips.map((chip, index) => (
              <li key={chip} className="tag hero__chip" style={{ '--n': index } as CSSProperties}>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div ref={tiltRef} className="hero__visual hero__rise" style={stagger(2)}>
          <div className="hero__avatar">
            <div className="hero__avatar-glow" aria-hidden="true" />
            <div className="hero__avatar-ring">
              <img
                className="hero__avatar-img"
                src={publicUrl('portrait.jpg')}
                alt={hero.name}
                width={460}
                height={460}
                fetchPriority="high"
              />
            </div>
            {badges.map((badge, index) => (
              <span key={badge} className={`hero__badge hero__badge--${index + 1}`} aria-hidden="true">
                <span className="hero__badge-dot" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {nav[0] && (
        <a className="hero__scroll" href={`#${nav[0].id}`}>
          <span className="hero__scroll-label">{nav[0].label}</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
