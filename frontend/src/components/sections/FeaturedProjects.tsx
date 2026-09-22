import { Link } from 'react-router'

import { projects } from '../../content/projects'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function FeaturedProjects() {
  const [clinic, ...secondaryProjects] = projects

  return (
    <section id="projects" data-scroll-anchor data-reveal data-chapter="02" className="projects-section chapter-section py-16 sm:py-24 lg:py-28" aria-labelledby="featured-projects-title">
      <SectionAtmosphere scene="projects" />
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="FEATURED PROJECTS" title="Backend work grounded in real workflows." />
          <Link className="focus-ring text-sm font-semibold text-cyan hover:text-text-primary" data-magnetic to="/projects" data-reveal-item data-reveal-order={0}>
            View all projects →
          </Link>
        </div>
        <div className="mt-12">
          <ProjectCard featured sequence="01" revealOrder={0} project={clinic} />
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {secondaryProjects.map((project, index) => (
              <ProjectCard sequence={`0${index + 2}`} revealOrder={index + 1} key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
