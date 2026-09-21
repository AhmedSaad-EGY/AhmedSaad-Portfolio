import { principles } from '../../content/principles'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function EngineeringPrinciples() {
  return (
    <section className="principles-section py-20 sm:py-24 lg:py-28" aria-labelledby="principles-title">
      <Container>
        <SectionHeading eyebrow="ENGINEERING PRINCIPLES" title="How I Approach Backend Engineering" />
        <div className="principles-grid mt-12">
          {principles.map(([number, title, description], index) => (
            <article className={`principle principle--${index + 1}`} key={number}>
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
