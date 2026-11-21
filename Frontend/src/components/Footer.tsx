import { useApp } from '../context/AppContext'
import { ArrowUpIcon } from './icons/BrandIcons'
import './Footer.css'

function scrollToTop() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

export function Footer() {
  const { content } = useApp()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__rule" aria-hidden="true" />
        <div className="footer__row">
          <div className="footer__info">
            <p className="footer__copy">
              © {new Date().getFullYear()} {content.hero.name}
            </p>
          </div>
          <button type="button" className="footer__top" onClick={scrollToTop}>
            <span>{content.ui.backToTop}</span>
            <ArrowUpIcon className="footer__arrow" />
          </button>
        </div>
      </div>
    </footer>
  )
}
