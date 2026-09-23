import { pageMetadata } from '../app/seo'
import { site } from '../app/site'
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
  const description = 'Backend .NET Developer building reliable, secure workflows for scheduling, financial operations, tenant access, and real-time auctions.'

  return pageMetadata({ title, description, path: '/', imagePath: '/og/portfolio.png' })
}

export default function HomeRoute() {
  return (
    <AppShell>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <FeaturedProjects />
        <CoreStack />
        <Experience />
        <EngineeringPrinciples />
        <ContactSection />
      </main>
    </AppShell>
  )
}
