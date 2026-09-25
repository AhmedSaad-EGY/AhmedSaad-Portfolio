import portraitUrl from '../../assets/images/ahmed_saad.webp'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const focusAreas = [
  ['API & Access', 'REST API Design · Authentication & Authorization', 'access'],
  ['Data Integrity', 'Database Design · Transactions', 'data'],
  ['Reliability', 'Concurrency · Testing', 'reliability'],
  ['System Design', 'Real-Time Systems · Clean Architecture', 'system'],
] as const

type FocusIconName = (typeof focusAreas)[number][2]

function FocusIcon({ name }: { name: FocusIconName }) {
  const paths = {
    access: <><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></>,
    data: <><ellipse cx="12" cy="5.5" rx="7" ry="3" /><path d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
    reliability: <><path d="M12 3 14.2 5.5l3.3-.2.8 3.2 2.8 1.8-1.4 3 1.4 3-2.8 1.8-.8 3.2-3.3-.2L12 21l-2.2-2.5-3.3.2-.8-3.2-2.8-1.8 1.4-3-1.4-3 2.8-1.8.8-3.2 3.3.2L12 3Z" /><path d="m9.5 12 1.6 1.6 3.6-3.6" /></>,
    system: <><path d="M5 19V9M12 19V5M19 19v-7" /><rect x="3.5" y="12" width="3" height="7" rx=".5" /><rect x="10.5" y="8" width="3" height="11" rx=".5" /><rect x="17.5" y="14" width="3" height="5" rx=".5" /></>,
  } as const

  return (
    <svg className="capability-list__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function About() {
  return (
    <section id="about" data-scroll-anchor data-reveal data-chapter="01" className="section-soft chapter-section py-16 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <SectionAtmosphere scene="about" />
      <Container>
        <div className="about-layout">
          <div className="about-heading">
            <SectionHeading id="about-title" eyebrow="ABOUT" title="Backend systems built for real business workflows." />
          </div>
          <div className="portrait-composition about-portrait w-full" data-reveal-portrait>
            <span className="portrait-structure" aria-hidden="true" />
            <div className="portrait-frame">
              <img src={portraitUrl} alt="Ahmed Mohammed Saad" width={720} height={900} className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="portrait-caption" aria-hidden="true">
              <span>BACKEND</span><span>.NET</span><span>CAIRO</span>
            </div>
          </div>
          <div className="about-intro text-[1.0625rem] leading-8 text-text-secondary" data-reveal-copy>
            <p>I build dependable backend workflows for complex business requirements—not generic CRUD.</p>
          </div>
          <div className="about-detail text-[1.0625rem] leading-8 text-text-secondary" data-reveal-copy>
            <p>My work spans resource-aware scheduling, traceable financial workflows, multi-tenant access control, and real-time auctions.</p>
          </div>
          <ul className="capability-list about-capabilities grid" aria-label="Engineering focus areas">
            {focusAreas.map(([name, details, icon], index) => (
              <li key={name} data-reveal-item data-reveal-order={index}>
                <FocusIcon name={icon} />
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
