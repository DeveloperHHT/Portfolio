import './scenes.css'

/** Hills that repeat every 400 units, so two copies side by side scroll without a seam. */
const FAR_HILLS = 'M0 150 L40 128 L88 142 L140 112 L196 140 L248 118 L300 144 L352 124 L400 150 V190 H0Z'
const NEAR_HILLS = 'M0 160 L60 140 L120 156 L180 132 L240 154 L310 136 L360 152 L400 160 V190 H0Z'

/**
 * A rider on a sunset road. Hills and road markings scroll at different speeds,
 * the wheels turn, the bike rocks on its suspension. Hovering the card opens the throttle.
 */
export function RideScene() {
  return (
    <svg className="ride" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ride-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d1f5e" />
          <stop offset="0.5" stopColor="#c0508a" />
          <stop offset="0.82" stopColor="#fb7185" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="ride-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2340" />
          <stop offset="1" stopColor="#120e1d" />
        </linearGradient>
        <linearGradient id="ride-tank" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9b82ff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="ride-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbe0" />
          <stop offset="0.55" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ride-beam" cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="#fff7c2" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff7c2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill="url(#ride-sky)" />
      <g className="ride__stars" fill="#fff">
        <circle cx="46" cy="26" r="1.2" />
        <circle cx="110" cy="46" r="1" />
        <circle cx="180" cy="18" r="1.3" />
        <circle cx="338" cy="30" r="1.1" />
      </g>
      <circle className="ride__sun-glow" cx="310" cy="136" r="74" fill="url(#ride-sun)" />
      <circle className="ride__sun" cx="310" cy="136" r="30" fill="#fff3c4" />

      <g className="ride__layer ride__layer--far">
        <path d={FAR_HILLS} fill="#4a2a63" opacity="0.85" />
        <path d={FAR_HILLS} transform="translate(400 0)" fill="#4a2a63" opacity="0.85" />
        <path d={FAR_HILLS} transform="translate(800 0)" fill="#4a2a63" opacity="0.85" />
      </g>
      <g className="ride__layer ride__layer--near">
        <path d={NEAR_HILLS} fill="#2a1a45" />
        <path d={NEAR_HILLS} transform="translate(400 0)" fill="#2a1a45" />
        <path d={NEAR_HILLS} transform="translate(800 0)" fill="#2a1a45" />
      </g>

      <rect y="186" width="400" height="34" fill="url(#ride-road)" />
      <line x1="0" y1="186.5" x2="400" y2="186.5" stroke="#fde68a" strokeWidth="1.5" opacity="0.65" />
      <line className="ride__dashes" x1="-20" y1="204" x2="420" y2="204" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />

      <g className="ride__speed" stroke="#fff" strokeLinecap="round" strokeWidth="1.6">
        <line x1="88" y1="142" x2="58" y2="142" />
        <line x1="80" y1="156" x2="36" y2="156" />
        <line x1="90" y1="176" x2="64" y2="176" />
      </g>

      <ellipse className="ride__shadow" cx="205" cy="190" rx="106" ry="4" fill="#000" opacity="0.35" />

      <g className="ride__bike">
        <g className="ride__body">
          <path d="M276 112 L372 98 L372 134 L276 122Z" fill="url(#ride-beam)" className="ride__beam" />

          {/* frame and twin-cylinder engine */}
          <path d="M254 112 L212 152" stroke="#3b3550" strokeWidth="5" strokeLinecap="round" />
          <path d="M146 148 L196 156" stroke="#3b3550" strokeWidth="5" strokeLinecap="round" />
          <rect x="170" y="146" width="44" height="22" rx="7" fill="#d5dbe8" />
          <rect x="176" y="152" width="32" height="6" rx="3" fill="#8b93a8" />
          <g stroke="#e2e8f0" strokeWidth="1">
            <rect x="176" y="122" width="12" height="28" rx="3" fill="#2b2640" transform="rotate(-26 182 148)" />
            <rect x="196" y="122" width="12" height="28" rx="3" fill="#2b2640" transform="rotate(26 202 148)" />
          </g>
          <g stroke="#8b93a8" strokeWidth="1" opacity="0.8">
            <line x1="170" y1="130" x2="180" y2="136" />
            <line x1="172" y1="124" x2="182" y2="130" />
            <line x1="218" y1="130" x2="208" y2="136" />
            <line x1="216" y1="124" x2="206" y2="130" />
          </g>

          {/* dual exhaust, flared at the back */}
          <path d="M196 160 C168 166 132 168 100 164" stroke="#e8edf7" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          <path d="M198 166 C170 174 134 176 100 172" stroke="#aeb7cb" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M104 160 L96 163 L96 169 L104 172Z" fill="#cbd5e1" />

          {/* rear fender, solo seat, sissy bar */}
          <path d="M100 167 A28 28 0 0 1 156 158 L151 162 A23 23 0 0 0 107 167Z" fill="#1d1a2e" stroke="#e2e8f0" strokeWidth="1.4" />
          <path d="M120 140 C134 130 166 130 184 138 L180 146 C164 143 140 145 122 148Z" fill="#241f3a" />
          <path d="M126 138 C142 132 164 132 178 138" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M122 142 C114 130 112 116 116 106" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* teardrop tank */}
          <path d="M188 120 C200 106 232 104 246 114 C252 120 248 132 240 135 L198 138 C186 134 184 126 188 120Z" fill="url(#ride-tank)" />
          <path d="M196 117 C210 110 230 110 242 116" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* raked fork, fender, headlamp, pullback bars, windshield */}
          <path d="M254 110 L282 166" stroke="#e2e8f0" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M259 108 L287 164" stroke="#aeb7cb" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M258 162 A27 27 0 0 1 307 158 L302 163 A22 22 0 0 0 263 166Z" fill="#1d1a2e" stroke="#e2e8f0" strokeWidth="1.4" />
          <path d="M269 113 C276 104 280 96 276 86 L281 86 C286 98 284 108 276 118Z" fill="#bfeaff" opacity="0.4" />
          <circle cx="272" cy="119" r="8.5" fill="#e5e7eb" stroke="#aeb7cb" strokeWidth="1.5" />
          <circle cx="274" cy="119" r="5" fill="#fff7c2" />
          <path d="M255 106 C262 96 254 84 238 86" stroke="#e2e8f0" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          <path d="M240 86 L233 87" stroke="#0e0b18" strokeWidth="5" strokeLinecap="round" />

          {/* rider: upright, laid back, boots on the floorboards */}
          <rect x="212" y="164" width="26" height="4" rx="2" fill="#aeb7cb" />
          <path d="M152 136 L204 142 L228 164" stroke="#16203a" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="231" cy="165" rx="8" ry="3.8" fill="#0b0a14" />
          <path d="M152 138 C150 122 158 104 170 96 L184 100 C180 114 176 126 172 138Z" fill="#1f2a44" />
          <path d="M156 118 C160 106 164 100 170 96" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M174 102 C198 108 222 98 238 88" stroke="#1f2a44" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="178" cy="82" r="11.5" fill="#f1d2b3" />
          <path d="M165 82 C165 70 176 66 187 72 C190 74 190 79 189 82 L165 84Z" fill="#14151f" />
          <path d="M178 83 L192 83" stroke="#0b0a14" strokeWidth="4" strokeLinecap="round" />
          <path className="ride__scarf" d="M168 92 C156 90 146 96 134 90" stroke="#fb7185" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
        <g className="ride__wheel ride__wheel--rear" transform="translate(128 166)">
          <circle r="23" fill="#0e0b18" />
          <circle r="16.5" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <g className="ride__spokes" stroke="#cbd5e1" strokeWidth="1.1">
            <line x1="-16" y1="0" x2="16" y2="0" />
            <line x1="0" y1="-16" x2="0" y2="16" />
            <line x1="-11.3" y1="-11.3" x2="11.3" y2="11.3" />
            <line x1="-11.3" y1="11.3" x2="11.3" y2="-11.3" />
            <line x1="-15" y1="-5.5" x2="15" y2="5.5" />
            <line x1="-15" y1="5.5" x2="15" y2="-5.5" />
          </g>
          <circle r="4" fill="#e2e8f0" />
          <circle r="1.8" fill="#fb7185" />
        </g>
        <g className="ride__wheel ride__wheel--front" transform="translate(282 166)">
          <circle r="23" fill="#0e0b18" />
          <circle r="16.5" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <g className="ride__spokes" stroke="#cbd5e1" strokeWidth="1.1">
            <line x1="-16" y1="0" x2="16" y2="0" />
            <line x1="0" y1="-16" x2="0" y2="16" />
            <line x1="-11.3" y1="-11.3" x2="11.3" y2="11.3" />
            <line x1="-11.3" y1="11.3" x2="11.3" y2="-11.3" />
            <line x1="-15" y1="-5.5" x2="15" y2="5.5" />
            <line x1="-15" y1="5.5" x2="15" y2="-5.5" />
          </g>
          <circle r="4" fill="#e2e8f0" />
          <circle r="1.8" fill="#22d3ee" />
        </g>
      </g>
    </svg>
  )
}
