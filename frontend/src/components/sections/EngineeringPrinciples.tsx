import { principles } from '../../content/principles'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function EngineeringPrinciples() {
  return (
    <section data-reveal data-chapter="06" className="principles-section chapter-section py-16 sm:py-24 lg:py-28" aria-labelledby="principles-title">
      <SectionAtmosphere scene="principles" />
      <Container>
        <SectionHeading id="principles-title" eyebrow="ENGINEERING PRINCIPLES" title="How I Approach Backend Engineering" />
        <div className="principles-grid mt-12">
          {principles.map(([number, title, description], index) => (
            <article className={`principle principle--${index + 1}`} key={number} data-reveal-item data-reveal-order={index}>
              <p className="principle__number">{number}</p>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
