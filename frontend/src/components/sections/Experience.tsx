import { experience } from '../../content/experience'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" data-scroll-anchor data-reveal data-chapter="04" className="experience-section chapter-section border-y border-border/80 py-16 sm:py-24 lg:py-28" aria-labelledby="experience-title">
      <SectionAtmosphere scene="experience" />
      <Container>
        <SectionHeading eyebrow="EXPERIENCE" title="Professional and training experience." />
        <div className="timeline mt-12">
          {experience.map((item, index) => (
            <article className="timeline-entry" key={`${item.company}-${item.role}`} data-reveal-item data-reveal-order={index}>
              <span className="timeline-node" aria-hidden="true"><span /></span>
              <span className="timeline-connector" aria-hidden="true" />
              <div className="timeline-entry__index">0{index + 1}</div>
              <div className="timeline-entry__content">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-text-primary sm:text-2xl">{item.role}</h3>
                    <p className="mt-2 text-text-secondary">{item.company}</p>
                </div>
                  <p className="shrink-0 font-mono text-xs leading-6 text-cyan">
                  {item.period}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
              </div>
                <ul className="mt-7 space-y-3 text-sm leading-6 text-text-secondary">
                {item.bullets.map((bullet) => (
                    <li className="flex gap-3" key={bullet}>
                      <span className="mt-2 h-px w-3 shrink-0 bg-cyan" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
