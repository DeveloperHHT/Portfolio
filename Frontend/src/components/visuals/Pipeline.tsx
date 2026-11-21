import type { CSSProperties } from 'react'
import { useApp } from '../../context/AppContext'
import { useReveal } from '../../hooks/useReveal'
import './visuals.css'

/** Five stages from sensor to screen. A pulse travels down the line once visible. */
export function Pipeline() {
  const { content } = useApp()
  const { title, steps } = content.visuals.pipeline
  const ref = useReveal<HTMLDivElement>(0.2)

  return (
    <div ref={ref} className="pipeline reveal">
      <h3 className="pipeline__title">{title}</h3>
      <div className="pipeline__track">
        <span className="pipeline__rail" aria-hidden="true">
          <span className="pipeline__pulse" />
        </span>
      <ol className="pipeline__list">
        {steps.map((step, index) => (
          <li key={step.label} className="pipeline__step" style={{ '--k': index } as CSSProperties}>
            <span className="pipeline__node" aria-hidden="true">
              {index + 1}
            </span>
            <div className="pipeline__card">
              <div className="pipeline__head">
                <span className="pipeline__label">{step.label}</span>
                <span className="pipeline__output">→ {step.output}</span>
              </div>
              <ul className="pipeline__items">
                {step.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  )
}
