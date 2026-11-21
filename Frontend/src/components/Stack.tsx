import type { CSSProperties } from 'react'
import { useApp } from '../context/AppContext'
import { useReveal } from '../hooks/useReveal'
import { SectionHead } from './SectionHead'
import { trackPointer } from '../hooks/usePointerGlow'
import { publicUrl } from '../utils/publicUrl'
import type { StackGroup } from '../content/types'
import '../styles/pointer-glow.css'
import './Stack.css'

// Tiles drawn for the repo live in public/icons; the key is the item name from the content
const iconFiles: Record<string, string> = {
  Claude: 'claude',
  OpenAI: 'openai',
  Gemini: 'gemini',
  'Hugging Face': 'huggingface',
  NVIDIA: 'nvidia',
  Pandas: 'pandas',
  NumPy: 'numpy',
  'MS SQL Server': 'mssql',
  SQLAlchemy: 'sqlalchemy',
  pytest: 'pytest',
  Playwright: 'playwright',
}

// Brand colours for the initial badge of items without a tile
const brandColors: Record<string, string> = {
  Python: '#3776ab',
  PyTorch: '#ee4c2c',
  TensorFlow: '#ff6f00',
  OpenCV: '#5c3ee8',
  'scikit-learn': '#f7931e',
  FastAPI: '#009688',
  Flask: '#8a8f9c',
  Java: '#e76f00',
  '.NET': '#512bd4',
  MySQL: '#00758f',
  SQLite: '#0f80cc',
  React: '#61dafb',
  Vite: '#646cff',
  TypeScript: '#3178c6',
  Flutter: '#02569b',
  Dart: '#00b4ab',
  Qt: '#41cd52',
  Unity: '#8a8f9c',
  'C#': '#9b4f96',
  Docker: '#2496ed',
  'GitHub Actions': '#2088ff',
  AWS: '#ff9900',
  Azure: '#0078d4',
  'Google Cloud': '#4285f4',
  'Google Cloud Run': '#4285f4',
  Linux: '#fcc624',
  Git: '#f05032',
  'Raspberry Pi': '#c51a4a',
}

function Pill({ name }: { name: string }) {
  const file = iconFiles[name]
  const color = brandColors[name] ?? 'var(--accent)'
  return (
    <li className="pill" style={{ '--brand': color } as CSSProperties}>
      {file ? (
        <img className="pill__icon" src={publicUrl(`icons/${file}.svg`)} alt="" width={20} height={20} loading="lazy" />
      ) : (
        <span className="pill__badge" aria-hidden="true">
          {name.replace(/^\./, '').charAt(0).toUpperCase()}
        </span>
      )}
      {name}
    </li>
  )
}

function GroupCard({ group, index }: { group: StackGroup; index: number }) {
  const ref = useReveal<HTMLLIElement>()
  return (
    <li ref={ref} className="stack__item reveal" style={{ '--i': index } as CSSProperties}>
      <section className="stack__card card glow" onPointerMove={trackPointer}>
        <h3 className="stack__name">{group.name}</h3>
        <ul className="stack__pills">
          {group.items.map((item) => (
            <Pill key={item} name={item} />
          ))}
        </ul>
      </section>
    </li>
  )
}

/** Two endless rows of every tool, drifting in opposite directions. Decorative: the grid below lists the same items. */
function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={reverse ? 'marquee marquee--reverse' : 'marquee'} aria-hidden="true">
      <ul className="marquee__track">
        {[...items, ...items].map((name, index) => (
          <Pill key={`${name}-${index}`} name={name} />
        ))}
      </ul>
    </div>
  )
}

export function Stack() {
  const { content } = useApp()
  const all = content.stack.groups.flatMap((group) => group.items)
  const half = Math.ceil(all.length / 2)
  return (
    <section id="stack" className="section stack">
      <div className="container">
        <SectionHead id="stack" title={content.stack.title} />
        <div className="marquee-wrap">
          <Marquee items={all.slice(0, half)} />
          <Marquee items={all.slice(half)} reverse />
        </div>
        <ul className="stack__grid">
          {content.stack.groups.map((group, index) => (
            <GroupCard key={group.name} group={group} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
