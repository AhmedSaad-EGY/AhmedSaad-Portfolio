import { Link, useLocation } from 'react-router'

import { homeSectionIds, primaryNavigation } from '../../app/navigation'
import logoMarkUrl from '../../assets/brand/logo-mark.png'
import { site } from '../../app/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Container } from '../ui/Container'
import { MobileNav } from './MobileNav'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(homeSectionIds, { enabled: isHome })

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border/70">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link className="focus-ring brand-mark" to="/" aria-label="Ahmed Mohammed Saad home">
          <img src={logoMarkUrl} alt="" width="160" height="120" />
          <span className="brand-name" aria-hidden="true">
            <span className="brand-name--full">Ahmed Mohammed Saad</span>
            <span className="brand-name--compact">Ahmed M.Saad</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {primaryNavigation.map((item) => {
            const href = item.sectionId === 'projects' && isHome
              ? '#projects'
              : item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href
            const isProjectRoute = item.href === '/projects' && location.pathname.startsWith('/projects')
            const currentState = isProjectRoute ? 'page' : isHome && activeSection === item.sectionId ? 'location' : undefined

            return href === '/projects' ? (
              <Link
                className="focus-ring nav-link"
                to={href}
                aria-current={currentState}
                key={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <a className="focus-ring nav-link" href={href} aria-current={currentState} key={item.label}>
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="header-actions hidden items-center xl:flex">
            {[
              ['GitHub', site.links.github],
              ['LinkedIn', site.links.linkedin],
              ['Resume', site.links.resume],
            ].map(([label, href]) => (
              <a
                className="focus-ring header-cta interactive-cta"
                data-magnetic
                href={href}
                target="_blank"
                rel="noreferrer"
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
          <MobileNav activeSection={activeSection} />
        </div>
      </Container>
    </header>
  )
}
