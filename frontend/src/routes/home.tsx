import { absoluteUrl, site, socialImageUrl } from '../app/site'
import { AppShell } from '../components/layout/AppShell'
import { About } from '../components/sections/About'
import { ContactSection } from '../components/sections/ContactSection'
import { CoreStack } from '../components/sections/CoreStack'
import { EngineeringPrinciples } from '../components/sections/EngineeringPrinciples'
import { Experience } from '../components/sections/Experience'
import { FeaturedProjects } from '../components/sections/FeaturedProjects'
import { Hero } from '../components/sections/Hero'

export function meta() {
  const title = `${site.name} | ${site.role}`
  const description = 'Backend .NET Developer building reliable APIs and backend systems with ASP.NET Core, SQL Server, and Entity Framework Core.'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: socialImageUrl },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { tagName: 'link', rel: 'canonical', href: absoluteUrl('/') },
  ]
}

export default function HomeRoute() {
  return (
    <AppShell>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <CoreStack />
        <FeaturedProjects />
        <Experience />
        <EngineeringPrinciples />
        <ContactSection />
      </main>
    </AppShell>
  )
}
