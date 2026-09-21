import { clinicCaseStudy } from '../../content/clinic-case-study'

export function CaseStudyToc() {
  return (
    <nav className="case-toc" aria-label="Clinic case study sections">
      <p className="section-eyebrow">ON THIS PAGE</p>
      <ol className="mt-5 space-y-1 text-sm">
        <li>
          <a className="focus-ring text-text-secondary hover:text-cyan" href="#architecture">
            <span>00</span> Clean Architecture & System Flow
          </a>
        </li>
        {clinicCaseStudy.sections.map((section, index) => (
          <li key={section.id}>
            <a className="focus-ring text-text-secondary hover:text-cyan" href={`#${section.id}`}>
              <span>0{index + 1}</span> {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
