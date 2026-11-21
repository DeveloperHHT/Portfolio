import { useState } from 'react'
import { PlayIcon } from '../icons/BrandIcons'
import './embed.css'

interface SpotifyFacadeProps {
  trackId: string
  title: string
  loadLabel: string
  hint: string
}

const EMBED_HEIGHT = 152
const IFRAME_PERMISSIONS = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'

/**
 * Click-to-load Spotify player. Nothing is requested from Spotify until the
 * button is pressed. Mount it with `key={trackId}` so a new track starts
 * from the facade again.
 */
export function SpotifyFacade({ trackId, title, loadLabel, hint }: SpotifyFacadeProps) {
  const [loaded, setLoaded] = useState(false)
  const [ready, setReady] = useState(false)

  if (!loaded) {
    return (
      <div className="facade">
        <button type="button" className="facade__button" onClick={() => setLoaded(true)}>
          <span className="facade__icon">
            <PlayIcon />
          </span>
          {loadLabel}
        </button>
        <p className="facade__hint">{hint}</p>
      </div>
    )
  }

  return (
    <div className={`facade facade--loaded${ready ? ' is-ready' : ''}`} style={{ height: EMBED_HEIGHT }}>
      <iframe
        className="facade__frame"
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=oembed`}
        title={title}
        width="100%"
        height={EMBED_HEIGHT}
        allow={IFRAME_PERMISSIONS}
        loading="lazy"
        onLoad={() => setReady(true)}
      />
    </div>
  )
}
