import { clinicCaseStudy } from '../../content/clinic-case-study'
import { useActiveSection } from '../../hooks/useActiveSection'

const tocItems = [
  { id: 'architecture', number: '00', label: 'Clean Architecture & System Flow' },
  ...clinicCaseStudy.sections.map((section, index) => ({
    id: section.id,
    number: `0${index + 1}`,
    label: section.title,
  })),
]

const tocSectionIds = tocItems.map((item) => item.id)

type TocLinksProps = {
  activeId: string | null
}

function TocLinks({ activeId }: TocLinksProps) {
  return (
    <ol className="case-toc__list mt-5 space-y-1 text-sm">
      {tocItems.map((item) => (
        <li key={item.id}>
          <a
            className="focus-ring text-text-secondary hover:text-cyan"
            href={`#${item.id}`}
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            <span>{item.number}</span> {item.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

export function CaseStudyToc() {
  const activeId = useActiveSection(tocSectionIds, {
    rootMargin: '-14% 0px -76% 0px',
    activationRatio: 0.18,
  })
  const activeLabel = tocItems.find((item) => item.id === activeId)?.label ?? tocItems[0].label

  return (
    <>
      <nav className="case-toc case-toc--desktop hidden lg:block" aria-label="Clinic case study sections">
        <p className="section-eyebrow">ON THIS PAGE</p>
        <TocLinks activeId={activeId} />
      </nav>
      <details className="case-toc case-toc--mobile lg:hidden">
        <summary className="focus-ring case-toc__summary">
          <span>ON THIS PAGE</span>
          <strong>{activeLabel}</strong>
        </summary>
        <nav aria-label="Clinic case study sections">
          <TocLinks activeId={activeId} />
        </nav>
      </details>
    </>
  )
}
