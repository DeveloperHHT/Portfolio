import type { CSSProperties } from 'react'
import { useApp } from '../../context/AppContext'
import { useReveal } from '../../hooks/useReveal'
import './visuals.css'

/** A fake terminal that plays a four-agent run once when it scrolls into view. Pure CSS animation. */
export function AgentTerminal() {
  const { content } = useApp()
  const { title, command, steps, done } = content.visuals.terminal
  const ref = useReveal<HTMLDivElement>(0.35)

  return (
    <div ref={ref} className="terminal reveal" role="img" aria-label={`${title}: ${command}. ${steps.map((s) => `${s.agent} ${s.text}`).join('. ')}. ${done}`}>
      <div className="terminal__bar" aria-hidden="true">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body" aria-hidden="true">
        <p className="terminal__line terminal__line--cmd">
          <span className="terminal__prompt">$</span>
          <span className="terminal__typed" style={{ '--len': command.length } as CSSProperties}>
            {command}
          </span>
        </p>
        {steps.map((step, index) => (
          <p key={step.agent} className="terminal__line terminal__step" style={{ '--k': index } as CSSProperties}>
            <span className={`terminal__agent terminal__agent--${index % 4}`}>[{step.agent}]</span>
            <span className="terminal__text">{step.text}</span>
          </p>
        ))}
        <p className="terminal__line terminal__done" style={{ '--k': steps.length } as CSSProperties}>
          <span className="terminal__check">✔</span> {done}
          <span className="terminal__cursor" />
        </p>
      </div>
    </div>
  )
}
