import { Link } from 'react-router'

import type { Project } from '../../content/projects'

type ProjectCardProps = {
  project: Project
  featured?: boolean
  sequence?: string
}

export function ProjectCard({ project, featured = false, sequence }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'project-card-featured' : ''}`}>
      <div className="project-card__meta">
        <span>{sequence ?? 'PROJECT'}</span>
        <span>{featured ? 'FLAGSHIP CASE STUDY' : project.subtitle}</span>
      </div>
      <div className={featured ? 'project-card__featured-grid' : ''}>
        <div>
          <h3 className={`${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-6 font-semibold tracking-tight text-text-primary`}>{project.name}</h3>
          <p className="mt-5 leading-7 text-text-secondary">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.technologies.slice(0, featured ? 7 : 5).map((technology) => (
              <li className="tech-tag" key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
        {featured ? (
          <ul className="project-highlights" aria-label={`${project.name} highlights`}>
            {project.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        ) : null}
      </div>
      <div className="project-card__actions">
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {project.links.map((link) => (
            <a className="focus-ring font-medium text-text-primary hover:text-cyan" href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label} ↗</a>
          ))}
        </div>
        {project.caseStudyPath ? (
          <Link className="focus-ring project-case-study" to={project.caseStudyPath}>Case study →</Link>
        ) : null}
      </div>
    </article>
  )
}
