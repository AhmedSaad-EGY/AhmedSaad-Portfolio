import logoMarkUrl from '../../assets/brand/logo-mark.png'
import { site, socialLinks } from '../../app/site'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-bg pt-10 pb-[calc(2.5rem+var(--mobile-dock-clearance))]">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img className="h-8 w-auto" src={logoMarkUrl} alt="" width="160" height="120" />
            <p className="text-sm font-semibold text-text-primary">{site.name}</p>
          </div>
          <p className="mt-4 text-sm text-text-secondary">{site.role}</p>
          <p className="mt-1 text-sm text-text-muted">Cairo, Egypt</p>
        </div>
        <div className="footer-links flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {socialLinks.map((link) => (
            <a className="focus-ring text-text-secondary hover:text-cyan" href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
