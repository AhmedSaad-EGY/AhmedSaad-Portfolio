import { Link } from 'react-router'

import { projectStructuredData } from '../../app/seo'
import type { Project } from '../../content/projects'
import { AppShell } from '../layout/AppShell'
import { ProjectEvidence } from '../projects/ProjectEvidence'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

type ProjectDetailPageProps = { project: Project }

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <AppShell>
      <main id="main-content" tabIndex={-1}>
        <script type="application/ld+json">{JSON.stringify(projectStructuredData(project))}</script>
        <section className="page-entry case-hero chapter-section border-b border-border/80 py-16 sm:py-20 lg:py-24" data-chapter="C1">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16">
            <div>
              <Link className="focus-ring text-sm text-cyan hover:text-text-primary" to="/projects">← All projects</Link>
              <p className="section-eyebrow mt-9">{project.presentation.label.toUpperCase()} · {project.slug === 'khidma' ? 'DATABASE ENGINEERING' : 'BACKEND ENGINEERING'}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-6xl">{project.name}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">{project.cardSummary}</p>
              <div className="mt-8 flex flex-wrap gap-2 text-sm">
                {project.links.map((link) => (
                  <a className="focus-ring project-resource-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                    {link.label} <span className="project-action__arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="project-detail-hero-side">
              <figure className="project-detail-visual" data-fit={project.visual.fit}>
                <img src={project.visual.src} alt={project.visual.alt} width={project.visual.width} height={project.visual.height} decoding="async" />
                <figcaption>PROJECT VISUAL · CONCEPT</figcaption>
              </figure>
              <div className="case-hero__summary">
                <span>TECHNICAL SUMMARY</span>
                <dl>{project.presentation.technicalSummary.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
              </div>
            </div>
          </Container>
        </section>

        <Container className="case-article max-w-5xl space-y-16 py-14 lg:py-20">
          <section className="case-section case-section--intro" data-reveal data-case-step="00" aria-labelledby="overview-title">
            <SectionHeading eyebrow="OVERVIEW" title="A source-backed engineering story." />
            <p id="overview-title" className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary" data-reveal-copy>{project.overview}</p>
          </section>
          <section className="case-section" data-reveal data-case-step="01" aria-labelledby="signals-title">
            <SectionHeading eyebrow="ENGINEERING SIGNALS" title="What the source demonstrates." />
            <ul id="signals-title" className="project-detail-signals mt-8" aria-label={`${project.name} engineering signals`}>
              {project.engineeringSignals.map((signal, index) => <li key={signal}><span>{String(index + 1).padStart(2, '0')}</span>{signal}</li>)}
            </ul>
          </section>
          <section className="case-section" data-reveal data-case-step="02" aria-labelledby="challenges-title">
            <SectionHeading eyebrow="CHALLENGES & SOLUTIONS" title="Technical decisions tied to real workflows." />
            <ol id="challenges-title" className="project-detail-challenges mt-8">
              {project.challenges.map((item, index) => <li key={item.challenge}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{item.challenge}</h2><p>{item.solution}</p></div></li>)}
            </ol>
          </section>
          <section className="case-section" data-reveal data-case-step="03" aria-labelledby="stack-title">
            <SectionHeading eyebrow="VERIFIED STACK" title="Technology used in this project." />
            <ul id="stack-title" className="mt-8 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => <li className="tech-tag" key={technology}>{technology}</li>)}
            </ul>
          </section>
          <ProjectEvidence project={project} id="engineering-evidence" step="04" />
        </Container>
      </main>
    </AppShell>
  )
}
