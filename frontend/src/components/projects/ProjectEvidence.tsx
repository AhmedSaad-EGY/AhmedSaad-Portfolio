import type { Project } from '../../content/projects'
import { SectionHeading } from '../ui/SectionHeading'

type ProjectEvidenceProps = {
  project: Project
  id: string
  step: string
}

/** Source-backed engineering evidence that also stays reachable when mobile cards omit the highlight list. */
export function ProjectEvidence({ project, id, step }: ProjectEvidenceProps) {
  return (
    <section className="case-section" id={id} data-scroll-anchor aria-labelledby={`${id}-title`} data-reveal data-case-step={step}>
      <SectionHeading id={`${id}-title`} eyebrow="ENGINEERING EVIDENCE" title="Evidence behind each engineering claim." />
      <ul className="project-evidence mt-8" aria-label={`${project.name} engineering evidence`}>
        {project.highlights.map((highlight, index) => (
          <li key={highlight}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{highlight}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
