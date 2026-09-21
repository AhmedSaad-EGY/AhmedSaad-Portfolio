import portraitUrl from '../../assets/images/ahmed_saad.png'
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
    <section id="about" className="section-soft scroll-mt-20 py-20 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="portrait-composition mx-auto w-full max-w-[21rem] lg:mx-0">
          <div className="portrait-frame">
            <img src={portraitUrl} alt="Ahmed Mohammed Saad" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </div>
          <div className="portrait-caption" aria-hidden="true">
            <span>BACKEND</span><span>.NET</span><span>CAIRO</span>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="ABOUT" title="Backend systems built around real business rules." />
          <div className="mt-7 max-w-3xl space-y-4 text-[1.0625rem] leading-8 text-text-secondary">
            <p>I’m a Backend .NET Developer focused on building backend systems around real business rules instead of simple CRUD applications.</p>
            <p>
              I work primarily with C#, ASP.NET Core, Entity Framework Core, and SQL Server, with hands-on project experience in authentication, authorization, transactional workflows, concurrency, real-time systems, and automated testing.
            </p>
          </div>
          <ul className="capability-list mt-9 grid sm:grid-cols-2" aria-label="Engineering focus areas">
            {focusAreas.map(([name, details], index) => (
              <li key={name}>
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
