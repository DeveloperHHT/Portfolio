import type { ReactElement, SVGProps } from 'react'
import type { FocusArea } from '../../content/types'

type IconProps = SVGProps<SVGSVGElement>

function Base(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

/** Agents: a hub with four connected nodes. */
function AgentsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="4.6" cy="5.6" r="1.7" />
      <circle cx="19.4" cy="5.6" r="1.7" />
      <circle cx="4.6" cy="18.4" r="1.7" />
      <circle cx="19.4" cy="18.4" r="1.7" />
      <path d="M10.2 10.4 5.9 6.7M13.8 10.4l4.3-3.7M10.2 13.6l-4.3 3.7M13.8 13.6l4.3 3.7" />
      <path d="M12 3.2v4M12 16.8v4" strokeOpacity={0.45} />
    </Base>
  )
}

/** Vision: an eye inside viewfinder corners. */
function VisionIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 8V5.5a2 2 0 0 1 2-2H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16" />
      <path d="M6.2 12S8.4 8.4 12 8.4s5.8 3.6 5.8 3.6-2.2 3.6-5.8 3.6S6.2 12 6.2 12Z" />
      <circle cx="12" cy="12" r="1.7" />
    </Base>
  )
}

/** Production: a shipping container cube with a rocket-style lift line. */
function ProductionIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.2 19.8 7.6v8.8L12 20.8 4.2 16.4V7.6L12 3.2Z" />
      <path d="M4.5 7.8 12 12l7.5-4.2M12 12v8.6" />
      <path d="M8 5.5l7.8 4.4" strokeOpacity={0.45} />
    </Base>
  )
}

/** Backend: three stacked server layers. */
function BackendIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.6" y="3.8" width="16.8" height="4.6" rx="1.4" />
      <rect x="3.6" y="9.7" width="16.8" height="4.6" rx="1.4" />
      <rect x="3.6" y="15.6" width="16.8" height="4.6" rx="1.4" />
      <path d="M7.2 6.1h.01M7.2 12h.01M7.2 17.9h.01" strokeWidth={2.2} />
      <path d="M12 6.1h5.2M12 12h5.2M12 17.9h5.2" strokeOpacity={0.45} />
    </Base>
  )
}

/** Business development: bars with a rising trend line. */
function BizdevIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M6 20.5v-4M11 20.5v-7M16 20.5v-5" strokeWidth={2.6} strokeOpacity={0.55} />
      <path d="m4.6 11.4 4.6-4.2 3.4 2.9 6.6-5.6" />
      <path d="M15.4 4.5h3.8v3.8" />
    </Base>
  )
}

const icons: Record<FocusArea['id'], (props: IconProps) => ReactElement> = {
  agents: AgentsIcon,
  vision: VisionIcon,
  production: ProductionIcon,
  backend: BackendIcon,
  bizdev: BizdevIcon,
}

export function FocusIcon({ id, ...props }: { id: FocusArea['id'] } & IconProps) {
  const Icon = icons[id]
  return <Icon {...props} />
}
