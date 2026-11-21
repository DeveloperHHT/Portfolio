import type { SVGProps } from 'react'
import type { Job } from '../../content/types'

type IconProps = SVGProps<SVGSVGElement>

function Base(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="11" width="14" height="9.5" rx="2.4" />
      <path d="M8.2 11V8.2a3.8 3.8 0 0 1 7.6 0V11" />
      <path d="M12 15v2" />
    </Base>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  )
}

function BriefcaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.4" />
      <path d="M9 7.5V6a1.8 1.8 0 0 1 1.8-1.8h2.4A1.8 1.8 0 0 1 15 6v1.5M3.5 13h17" />
    </Base>
  )
}

function SproutIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20.5v-9" />
      <path d="M12 11.5C12 8 9.6 5.5 5.5 5.5c0 4 2.4 6 6.5 6Z" />
      <path d="M12 14c0-3 2.2-5 6.5-5 0 3.4-2.4 5-6.5 5Z" />
    </Base>
  )
}

function CompassIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.6 8.4-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </Base>
  )
}

export function JobKindIcon({ kind, ...props }: { kind: Job['kind'] } & IconProps) {
  if (kind === 'intern') return <SproutIcon {...props} />
  if (kind === 'freelance') return <CompassIcon {...props} />
  return <BriefcaseIcon {...props} />
}
