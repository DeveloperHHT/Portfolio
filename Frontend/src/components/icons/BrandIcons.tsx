import type { ComponentType, SVGProps } from 'react'

/** Small hand-drawn marks for the services linked from the site. Decorative: the link text carries the meaning. */
export type IconProps = SVGProps<SVGSVGElement>

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function LinkedInIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M5 3.2a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.2 9h3.6v11.8H3.2V9Zm6 0h3.4v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.5h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v5.9H9.2V9Z"
      />
    </Svg>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </Svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect {...stroke} x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle {...stroke} cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </Svg>
  )
}

export function SpotifyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle {...stroke} cx="12" cy="12" r="9" />
      <path {...stroke} d="M7.2 9.4c3.2-.9 7-.6 9.8 1.1M7.8 12.5c2.7-.7 5.6-.4 8 1M8.4 15.4c2.2-.5 4.4-.3 6.2.8" />
    </Svg>
  )
}

export function AppleMusicIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} d="M9 17.5V6.2l10-2v11.3" />
      <circle cx="6.8" cy="17.6" r="2.4" fill="currentColor" />
      <circle cx="16.8" cy="15.6" r="2.4" fill="currentColor" />
    </Svg>
  )
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect {...stroke} x="2.8" y="5.5" width="18.4" height="13" rx="4" />
      <path fill="currentColor" d="m10.2 9.4 5 2.6-5 2.6V9.4Z" />
    </Svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path fill="currentColor" d="M8 5.2v13.6a1 1 0 0 0 1.52.85l11-6.8a1 1 0 0 0 0-1.7l-11-6.8A1 1 0 0 0 8 5.2Z" />
    </Svg>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} d="M7 17 17 7M8.5 7H17v8.5" />
    </Svg>
  )
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} d="M12 19.5V5M5.5 11.5 12 5l6.5 6.5" />
    </Svg>
  )
}

/** Picks the mark for a link by its host, so the icon never depends on the (translatable) label. */
const iconByHost: [pattern: RegExp, icon: ComponentType<IconProps>][] = [
  [/(^|\.)linkedin\.com$/, LinkedInIcon],
  [/(^|\.)github\.com$/, GitHubIcon],
  [/(^|\.)instagram\.com$/, InstagramIcon],
  [/(^|\.)spotify\.com$/, SpotifyIcon],
  [/(^|\.)music\.apple\.com$/, AppleMusicIcon],
  [/(^|\.)youtube(-nocookie)?\.com$/, YouTubeIcon],
]

export function iconForHref(href: string): ComponentType<IconProps> | null {
  try {
    const host = new URL(href).hostname
    return iconByHost.find(([pattern]) => pattern.test(host))?.[1] ?? null
  } catch {
    return null
  }
}
