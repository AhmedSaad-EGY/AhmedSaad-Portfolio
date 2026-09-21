import { Link, useLocation } from 'react-router'

import logoMarkUrl from '../../assets/brand/logo-mark.png'
import { site } from '../../app/site'
import { Container } from '../ui/Container'
import { MobileNav } from './MobileNav'

const items = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Projects', '/projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
] as const

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/95">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link className="focus-ring brand-mark" to="/" aria-label="Ahmed Mohammed Saad home">
          <img src={logoMarkUrl} alt="" width="160" height="120" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {items.map(([label, destination]) => {
            const href = destination.startsWith('#') && !isHome ? `/${destination}` : destination
            const isCurrent = destination === '/projects' && location.pathname.startsWith('/projects')

            return href === '/projects' ? (
              <Link
                className="focus-ring nav-link"
                to={href}
                aria-current={isCurrent ? 'page' : undefined}
                key={label}
              >
                {label}
              </Link>
            ) : (
              <a className="focus-ring nav-link" href={href} key={label}>
                {label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="focus-ring header-cta hidden sm:inline-flex"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
