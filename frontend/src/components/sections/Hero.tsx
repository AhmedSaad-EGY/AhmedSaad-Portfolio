import { Link } from 'react-router'

import { site, socialLinks } from '../../app/site'
import { Container } from '../ui/Container'
import { HeroTechnicalVisual } from './HeroTechnicalVisual'

export function Hero() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: [site.links.github, site.links.linkedin],
  }

  return (
    <section id="home" data-scroll-anchor data-chapter="00" className="hero-grid chapter-section border-b border-border/70" aria-labelledby="hero-title">
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <span className="hero-structure-line" aria-hidden="true" />
      <span className="hero-flow-field" aria-hidden="true" />
      <Container className="grid min-h-[calc(100svh-4.25rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(23rem,0.85fr)] lg:gap-12 lg:py-24">
        <div className="relative z-10">
          <p className="section-eyebrow" data-hero-step="1">BACKEND ENGINEERING · CAIRO, EGYPT</p>
          <h1 id="hero-title" data-hero-step="2" className="hero-title mt-6 max-w-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-text-primary" aria-label="Ahmed Mohammed Saad">
            <span className="hero-name hero-name--full" aria-hidden="true">Ahmed Mohammed Saad</span>
            <span className="hero-name hero-name--compact" aria-hidden="true">Ahmed M.Saad</span>
          </h1>
          <p className="mt-5 font-mono text-sm font-medium tracking-[0.12em] text-cyan sm:text-base" data-hero-step="3">Backend .NET Developer</p>
          <p className="mt-8 max-w-xl text-xl font-medium leading-8 text-text-primary sm:text-2xl sm:leading-9" data-hero-step="4">
            Building reliable APIs and backend systems with ASP.NET Core, SQL Server, and Entity Framework Core.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-text-secondary" data-hero-step="5">
            Focused on real business workflows, secure APIs, database design, concurrency, testing, and maintainable backend architecture.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-hero-step="6">
            <Link className="focus-ring button-primary interactive-cta" data-magnetic to="/projects">
              View Projects
            </Link>
            <a className="focus-ring button-secondary interactive-cta" data-magnetic href="#contact">
              Get in touch
            </a>
          </div>
          <ul className="hero-socials mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Professional links" data-hero-step="6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a className="focus-ring text-text-secondary hover:text-cyan" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <HeroTechnicalVisual />
      </Container>
    </section>
  )
}
