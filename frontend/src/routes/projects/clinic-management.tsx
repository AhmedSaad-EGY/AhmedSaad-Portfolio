import { Link } from 'react-router'

import { projectMetadata, projectStructuredData } from '../../app/seo'
import { ArchitectureDiagram } from '../../components/clinic/ArchitectureDiagram'
import { CaseStudyToc } from '../../components/clinic/CaseStudyToc'
import { AppShell } from '../../components/layout/AppShell'
import { ProjectEvidence } from '../../components/projects/ProjectEvidence'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { clinicCaseStudy } from '../../content/clinic-case-study'
import { clinicManagementProject } from '../../content/projects'

export function meta() {
  return projectMetadata(clinicManagementProject)
}

export default function ClinicManagementRoute() {
  return (
    <AppShell>
      <main id="main-content" tabIndex={-1}>
        <script type="application/ld+json">{JSON.stringify(projectStructuredData(clinicManagementProject))}</script>
        <section className="page-entry case-hero chapter-section border-b border-border/80 py-16 sm:py-20 lg:py-24" data-chapter="C0">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16">
            <div>
            <Link className="focus-ring text-sm text-cyan hover:text-text-primary" to="/projects">
              ← All projects
            </Link>
              <p className="section-eyebrow mt-9">CASE STUDY · BACKEND ENGINEERING</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-6xl">{clinicManagementProject.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">{clinicManagementProject.cardSummary}</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              {clinicManagementProject.links.map((link) => (
                <a className="focus-ring project-resource-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  {link.label} <span className="project-action__arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            </div>
            <div className="case-hero__summary">
              <span>TECHNICAL SUMMARY</span>
              <dl>
                <div><dt>Architecture</dt><dd>Clean Architecture</dd></div>
                <div><dt>Runtime</dt><dd>.NET 10</dd></div>
                <div><dt>Data</dt><dd>EF Core · SQL Server</dd></div>
                <div><dt>Testing</dt><dd>xUnit · Integration</dd></div>
              </dl>
            </div>
          </Container>
        </section>

        <Container className="grid gap-10 py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CaseStudyToc />
          </aside>
          <article className="case-article min-w-0 space-y-16">
            <section className="case-section case-section--intro" aria-labelledby="overview-title" data-reveal data-case-step="00">
              <SectionHeading id="overview-title" eyebrow="OVERVIEW" title="A focused backend case study." />
              <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary" data-reveal-copy>{clinicCaseStudy.overview}</p>
            </section>
            <section id="architecture" data-scroll-anchor className="case-section" aria-labelledby="architecture-title" data-reveal data-case-step="01">
              <SectionHeading id="architecture-title" eyebrow="ARCHITECTURE" title="Clean Architecture & System Flow" description={clinicCaseStudy.architecture.title} />
              <div className="mt-8">
                <ArchitectureDiagram />
              </div>
            </section>
            {clinicCaseStudy.sections.map((section, index) => (
              <section className="case-section" id={section.id} data-scroll-anchor key={section.id} aria-labelledby={`${section.id}-title`} data-reveal data-case-step={`0${index + 2}`}>
                <p className="section-eyebrow">0{index + 1} · SYSTEM CONCERN</p>
                <h2 id={`${section.id}-title`} className="mt-5 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-5 max-w-3xl text-[1.0625rem] leading-8 text-text-secondary" data-reveal-copy>{section.body}</p>
              </section>
            ))}
            <ProjectEvidence project={clinicManagementProject} id="engineering-evidence" step="08" />
          </article>
        </Container>
      </main>
    </AppShell>
  )
}
