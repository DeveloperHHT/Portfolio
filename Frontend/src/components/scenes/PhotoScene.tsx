import './scenes.css'

/** Foreground pine, reused on both sides of the frame. */
const PINE = 'M20 220 V196 H6 L26 166 H14 L34 130 L54 166 H42 L62 196 H48 V220Z'

/**
 * A dawn landscape seen through a camera viewfinder. The sun climbs, clouds drift,
 * the autofocus box hunts, locks and the shutter fires. Hovering zooms in and snaps focus.
 */
export function PhotoScene() {
  return (
    <div className="photo" aria-hidden="true">
      <svg className="photo__land" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="photo-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f1650" />
            <stop offset="0.4" stopColor="#6d3fb8" />
            <stop offset="0.75" stopColor="#f0708f" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="photo-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6a15a" />
            <stop offset="0.35" stopColor="#8a4fa8" />
            <stop offset="1" stopColor="#1a1238" />
          </linearGradient>
          <radialGradient id="photo-sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fffbe0" />
            <stop offset="0.5" stopColor="#ffe08a" />
            <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="220" fill="url(#photo-sky)" />
        <g className="photo__stars" fill="#fff">
          <circle cx="60" cy="24" r="1.1" />
          <circle cx="150" cy="40" r="0.9" />
          <circle cx="330" cy="22" r="1.2" />
          <circle cx="372" cy="56" r="0.9" />
        </g>

        <g className="photo__sun">
          <circle cx="200" cy="140" r="64" fill="url(#photo-sun)" />
          <circle cx="200" cy="140" r="23" fill="#fff6cf" />
        </g>

        <g className="photo__cloud photo__cloud--a" fill="#ffd0c2" opacity="0.55">
          <ellipse cx="90" cy="66" rx="42" ry="5" />
          <ellipse cx="116" cy="60" rx="26" ry="4" />
        </g>
        <g className="photo__cloud photo__cloud--b" fill="#ffe0c8" opacity="0.5">
          <ellipse cx="300" cy="84" rx="48" ry="5" />
          <ellipse cx="276" cy="78" rx="24" ry="4" />
        </g>

        <g className="photo__birds" stroke="#2a1a45" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path className="photo__bird photo__bird--a" d="M0 0 q4 -4 8 0 q4 -4 8 0" />
          <path className="photo__bird photo__bird--b" d="M0 0 q3 -3 6 0 q3 -3 6 0" />
        </g>

        <path d="M0 144 L52 116 L98 136 L152 100 L212 138 L264 110 L322 136 L372 116 L400 134 V150 H0Z" fill="#5a3a78" opacity="0.85" />
        <path d="M0 146 L72 128 L132 142 L202 124 L282 142 L350 126 L400 140 V150 H0Z" fill="#2f1f4d" />

        <rect y="144" width="400" height="76" fill="url(#photo-lake)" />
        <ellipse className="photo__reflection" cx="200" cy="166" rx="22" ry="12" fill="#fff0b8" opacity="0.7" />
        <g className="photo__ripples" stroke="#ffe9b0" strokeLinecap="round" strokeWidth="1.2">
          <line x1="168" y1="156" x2="232" y2="156" opacity="0.5" />
          <line x1="178" y1="164" x2="222" y2="164" opacity="0.4" />
          <line x1="186" y1="172" x2="214" y2="172" opacity="0.35" />
        </g>

        <path d={PINE} fill="#120c22" />
        <path d={PINE} fill="#120c22" transform="translate(-4 0) scale(0.8) translate(-10 44)" />
        <path d={PINE} fill="#120c22" transform="translate(400 0) scale(-1 1) translate(-6 0)" />
        <path d={PINE} fill="#120c22" transform="translate(400 0) scale(-0.78 0.78) translate(-4 48)" />
      </svg>

      <div className="photo__flash" />

      <div className="photo__hud">
        <span className="photo__corner photo__corner--tl" />
        <span className="photo__corner photo__corner--tr" />
        <span className="photo__corner photo__corner--bl" />
        <span className="photo__corner photo__corner--br" />
        <span className="photo__grid" />
        <span className="photo__focus">
          <span className="photo__focus-dot" />
        </span>
        <div className="photo__meta photo__meta--top">
          <span className="photo__rec">
            <i />
            RAW
          </span>
          <span>AF-S</span>
          <span className="photo__battery" />
        </div>
        <div className="photo__meta photo__meta--bottom">
          <span>1/250</span>
          <span>f/2.8</span>
          <span>ISO 100</span>
          <span className="photo__exposure">
            <i />
            <i />
            <i className="is-on" />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  )
}
