import { useState, type CSSProperties } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './SectionHead'
import { RideScene } from './scenes/RideScene'
import { PhotoScene } from './scenes/PhotoScene'
import type { Link, Track } from '../content/types'
import { SpotifyFacade } from './embed/SpotifyFacade'
import { publicUrl } from '../utils/publicUrl'
import { ArrowUpRightIcon, InstagramIcon, iconForHref } from './icons/BrandIcons'
import './OffDuty.css'

const coverUrl = (track: Track) => publicUrl(`music/${track.slug}.jpg`)

type PlatformBrand = 'spotify' | 'apple' | 'youtube' | 'other'

function brandOf(href: string): PlatformBrand {
  try {
    const host = new URL(href).hostname
    if (host.endsWith('spotify.com')) return 'spotify'
    if (host.endsWith('apple.com')) return 'apple'
    if (host.endsWith('youtube.com')) return 'youtube'
  } catch {
    /* fall through */
  }
  return 'other'
}

const revealStyle = (index: number) => ({ '--i': index }) as CSSProperties

export function OffDuty() {
  const { content } = useApp()
  return (
    <section id="offduty" className="section offduty">
      <div className="offduty__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead id="offduty" tone="warm" title={content.music.title} intro={content.music.intro} />

        <MusicPlayer />

        <div className="offduty__pair">
          <RideCard />
          <PhotographyCard />
        </div>
      </div>
    </section>
  )
}

function MusicPlayer() {
  const { content } = useApp()
  const { tracks, platforms } = content.music
  const { ui } = content
  const [selected, setSelected] = useState(0)
  const track = tracks[selected]
  const rootRef = useReveal<HTMLDivElement>(0.08)

  return (
    <div ref={rootRef} className="music reveal">
      <div className="music__card card">
        <div className="music__now">
          <div className="stage">
            <div key={`disc-${track.slug}`} className="stage__disc">
              <div className="stage__spin">
                <span className="stage__label" style={{ backgroundImage: `url(${coverUrl(track)})` }} />
              </div>
              <span className="stage__sheen" />
            </div>
            <img
              key={`cover-${track.slug}`}
              className="stage__cover"
              src={coverUrl(track)}
              alt={track.title}
              width={600}
              height={600}
            />
          </div>
          <h3 key={`title-${track.slug}`} className="music__title">
            {track.title}
          </h3>
        </div>

        <ul className="tracklist">
          {tracks.map((item, index) => (
            <li key={item.slug}>
              <button
                type="button"
                className="tracklist__item"
                aria-current={index === selected ? 'true' : undefined}
                onClick={() => setSelected(index)}
              >
                <img className="tracklist__thumb" src={coverUrl(item)} alt="" width={96} height={96} loading="lazy" />
                <span className="tracklist__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="tracklist__title">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="music__player">
          <SpotifyFacade
            key={track.spotifyId}
            trackId={track.spotifyId}
            title={track.title}
            loadLabel={ui.loadPlayer}
            hint={ui.loadPlayerHint}
          />
        </div>
      </div>

      <div className="music__links">
        {platforms.map((platform) => (
          <PlatformPill key={platform.href + platform.label} platform={platform} openOn={ui.openOn} />
        ))}
      </div>

    </div>
  )
}

function PlatformPill({ platform, openOn }: { platform: Link; openOn: string }) {
  const Icon = iconForHref(platform.href)
  return (
    <a
      className={`pill pill--${brandOf(platform.href)}`}
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {Icon && <Icon className="pill__icon" />}
      <span>
        {openOn} {platform.label}
      </span>
    </a>
  )
}

function RideCard() {
  const { content } = useApp()
  const { ride } = content
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="reveal" style={revealStyle(0)}>
      <article className="feature card card--lift feature--ride">
        <div className="feature__visual">
          <RideScene />
        </div>
        <div className="feature__body">
          <h3 className="feature__title">{ride.title}</h3>
          <p className="feature__text">{ride.text}</p>
          <a className="feature__link" href={ride.instagram.href} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>{ride.instagram.label}</span>
            <ArrowUpRightIcon className="feature__arrow" />
          </a>
        </div>
      </article>
    </div>
  )
}

function PhotographyCard() {
  const { content } = useApp()
  const { photography } = content.ride
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="reveal" style={revealStyle(1)}>
      <article className="feature card card--lift feature--photo">
        <div className="feature__visual">
          <PhotoScene />
        </div>
        <div className="feature__body">
          <h3 className="feature__title">{photography.title}</h3>
          <p className="feature__text">{photography.text}</p>
          <a className="feature__link" href={photography.link.href} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>{photography.link.label}</span>
            <ArrowUpRightIcon className="feature__arrow" />
          </a>
        </div>
      </article>
    </div>
  )
}
