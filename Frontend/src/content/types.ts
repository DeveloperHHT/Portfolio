/** Every piece of copy on the site lives in one typed object per language. */
export type Lang = 'en' | 'tr'

export interface Link {
  label: string
  href: string
}

export interface FocusArea {
  id: 'agents' | 'vision' | 'production' | 'backend' | 'bizdev'
  title: string
  summary: string
  points: string[]
}

export interface Job {
  role: string
  org: string
  period: string
  kind: 'work' | 'intern' | 'freelance'
  points: string[]
}

export interface PrivateProject {
  title: string
  text: string
  tags: string[]
}

export interface PublicProject {
  title: string
  text: string
  tags: string[]
  href: string
}

export interface StackGroup {
  name: string
  items: string[]
}

export interface Track {
  title: string
  slug: string // matches an image in public/music/<slug>.jpg
  spotifyId: string
}

export interface Content {
  meta: { title: string; description: string }
  ui: {
    skipToContent: string
    themeToLight: string
    themeToDark: string
    langLabel: string
    present: string
    private: string
    loadPlayer: string
    loadPlayerHint: string
    openOn: string
    backToTop: string
    languagesLabel: string
    mainNav: string
    openMenu: string
    closeMenu: string
  }
  nav: { id: string; label: string }[]
  hero: {
    eyebrow: string
    name: string
    roles: string[]
    tagline: string
    primaryCta: Link
    secondaryCta: Link
    chips: string[]
  }
  about: {
    title: string
    paragraphs: string[]
    facts: { label: string; value: string }[]
    languages: { name: string; level: string; score: number }[] // score 1-5
  }
  visuals: {
    terminal: { title: string; command: string; steps: { agent: string; text: string }[]; done: string }
    pipeline: { title: string; steps: { label: string; items: string[]; output: string }[] }
  }
  focus: { title: string; intro: string; areas: FocusArea[] }
  experience: { title: string; intro: string; jobs: Job[] }
  education: {
    title: string
    schools: { school: string; degree: string; period?: string; status: string; highlights?: string[] }[]
    communitiesTitle: string
    communities: { name: string; role: string; period: string }[]
    academicProjectsTitle: string
    academicProjects: { name: string; text: string }[]
  }
  privateWork: { title: string; intro: string; projects: PrivateProject[] }
  publicWork: { title: string; intro: string; linkLabel: string; projects: PublicProject[] }
  stack: { title: string; groups: StackGroup[] }
  music: {
    title: string
    intro: string
    tracks: Track[]
    platforms: Link[]
  }
  ride: {
    title: string
    text: string
    instagram: Link
    photography: { title: string; text: string; link: Link }
  }
  contact: { title: string; text: string; links: Link[] }
}
