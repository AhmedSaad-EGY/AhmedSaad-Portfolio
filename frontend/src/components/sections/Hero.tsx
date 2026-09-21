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
    <section id="home" className="hero-grid scroll-mt-20 border-b border-border/70" aria-labelledby="hero-title">
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      <Container className="grid min-h-[calc(100svh-4.25rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.04fr)_minmax(25rem,0.96fr)] lg:gap-14 lg:py-24">
        <div className="relative z-10">
          <p className="section-eyebrow">BACKEND ENGINEERING · CAIRO, EGYPT</p>
          <h1 id="hero-title" className="mt-6 max-w-3xl text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] text-text-primary sm:text-6xl lg:text-[4.65rem]">
            Ahmed Mohammed Saad
          </h1>
          <p className="mt-5 font-mono text-sm font-medium tracking-[0.12em] text-cyan sm:text-base">Backend .NET Developer</p>
          <p className="mt-8 max-w-xl text-xl font-medium leading-8 text-text-primary sm:text-2xl sm:leading-9">
            Building reliable APIs and backend systems with ASP.NET Core, SQL Server, and Entity Framework Core.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-text-secondary">
            Focused on real business workflows, secure APIs, database design, concurrency, testing, and maintainable backend architecture.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="focus-ring button-primary" to="/projects">
              View Projects
            </Link>
            <a className="focus-ring button-secondary" href="#contact">
              Get in touch
            </a>
          </div>
          <ul className="hero-socials mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Professional links">
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
