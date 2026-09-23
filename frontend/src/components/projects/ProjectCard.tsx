import { Link } from 'react-router'

import type { Project } from '../../content/projects'

type ProjectCardProps = {
  project: Project
  featured?: boolean
  sequence?: string
  revealOrder?: number
  showVisual?: boolean
  imageLoading?: 'eager' | 'lazy'
}

export function ProjectCard({ project, featured = false, sequence, revealOrder = 0, showVisual = true, imageLoading = 'lazy' }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? 'project-card-featured' : ''}`} data-reveal-item data-reveal-order={revealOrder} data-pointer-surface>
      <span className="project-card__spotlight" aria-hidden="true" />
      <span className="project-card__edge" aria-hidden="true" />
      <div className="project-card__meta">
        <span>{sequence ?? 'PROJECT'}</span>
        <span>{project.presentation.label.toUpperCase()}</span>
      </div>
      <div className={featured ? 'project-card__featured-grid' : 'project-card__body'}>
        <div className="project-card__copy">
          <h3 className={`${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-6 font-semibold tracking-tight text-text-primary`}>{project.name}</h3>
          <p className="mt-5 leading-7 text-text-secondary">{project.cardSummary}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.technologies.slice(0, featured ? 7 : 5).map((technology) => (
              <li className="tech-tag" key={technology}>{technology}</li>
            ))}
          </ul>
          {featured ? (
            <ul className="project-highlights" aria-label={`${project.name} highlights`}>
              {project.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          ) : null}
        </div>
        <figure className="project-card__visual" data-fit={project.visual.fit}>
          {showVisual ? (
            <img
              src={project.visual.src}
              alt={project.visual.alt}
              width={project.visual.width}
              height={project.visual.height}
              loading={imageLoading}
              decoding="async"
            />
          ) : null}
          <figcaption className="project-card__visual-caption"><span>PROJECT VISUAL · CONCEPT</span><strong>{project.name}</strong></figcaption>
        </figure>
      </div>
      <div className="project-card__actions">
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {project.links.map((link) => (
            <a className="focus-ring project-action font-medium text-text-primary hover:text-cyan" href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label} <span className="project-action__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        {project.caseStudyPath ? (
          <Link className="focus-ring project-case-study interactive-cta" data-magnetic to={project.caseStudyPath}>
            {project.presentation.actionLabel} <span className="project-action__arrow" aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  )
}
