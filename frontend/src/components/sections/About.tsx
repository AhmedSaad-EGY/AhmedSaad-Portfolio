import portraitUrl from '../../assets/images/ahmed_saad.webp'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const focusAreas = [
  ['API & Access', 'REST API Design · Authentication & Authorization'],
  ['Data Integrity', 'Database Design · Transactions'],
  ['Reliability', 'Concurrency · Testing'],
  ['System Design', 'Real-Time Systems · Clean Architecture'],
] as const

export function About() {
  return (
    <section id="about" data-scroll-anchor data-reveal data-chapter="01" className="section-soft chapter-section py-16 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <SectionAtmosphere scene="about" />
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(17rem,0.62fr)_minmax(0,1.38fr)] lg:gap-16">
        <div className="portrait-composition mx-auto w-full max-w-[21rem] lg:mx-0" data-reveal-portrait>
          <span className="portrait-structure" aria-hidden="true" />
          <div className="portrait-frame">
            <img src={portraitUrl} alt="Ahmed Mohammed Saad" width={720} height={900} className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="portrait-caption" aria-hidden="true">
            <span>BACKEND</span><span>.NET</span><span>CAIRO</span>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="ABOUT" title="Backend systems built for real business workflows." />
          <div className="mt-7 max-w-3xl space-y-4 text-[1.0625rem] leading-8 text-text-secondary" data-reveal-copy>
            <p>I turn complex requirements into dependable backend workflows, not generic CRUD applications.</p>
            <p>
              My project work includes appointment scheduling that protects constrained resources, financial workflows with traceability, multi-tenant access controlled by active memberships, and real-time auctions that handle competing updates.
            </p>
          </div>
          <ul className="capability-list mt-9 grid sm:grid-cols-2" aria-label="Engineering focus areas">
            {focusAreas.map(([name, details], index) => (
              <li key={name} data-reveal-item data-reveal-order={index}>
                <span className="font-mono text-[0.625rem] text-cyan">0{index + 1}</span>
                <h3>{name}</h3>
                <p>{details}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
