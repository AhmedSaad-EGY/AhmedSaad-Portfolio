import { ProjectCard } from '../components/projects/ProjectCard'
import { AppShell } from '../components/layout/AppShell'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { pageMetadata } from '../app/seo'
import { site } from '../app/site'
import { projects } from '../content/projects'

export function meta() {
  const title = `Projects | ${site.name}`
  const description = 'Selected backend engineering projects by Ahmed Mohammed Saad.'

  return pageMetadata({ title, description, path: '/projects', imagePath: '/og/portfolio.png' })
}

export default function ProjectsRoute() {
  const [clinic, ...secondaryProjects] = projects

  return (
    <AppShell>
      <main id="main-content" tabIndex={-1}>
        <section className="page-entry page-intro chapter-section border-b border-border/80 py-16 sm:py-20 lg:py-24" data-chapter="P1">
          <Container>
            <SectionHeading
              eyebrow="PROJECTS"
              title="Backend projects with real business workflows."
              description="Selected source-controlled portfolio content. Each project links to the level of technical detail its verified source supports."
            />
          </Container>
        </section>
        <section className="projects-section chapter-section py-14 sm:py-18 lg:py-20" aria-label="Project list" data-reveal data-chapter="P2">
          <Container>
            <ProjectCard featured sequence="01" revealOrder={0} project={clinic} />
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {secondaryProjects.map((project, index) => (
                <ProjectCard sequence={`0${index + 2}`} revealOrder={index + 1} key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </AppShell>
  )
}
