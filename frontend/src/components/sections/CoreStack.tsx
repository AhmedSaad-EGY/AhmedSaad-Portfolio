import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const groups = [
  ['Backend', ['C#', '.NET', 'ASP.NET Core', 'ASP.NET Web APIs', 'Entity Framework Core', 'LINQ', 'REST APIs']],
  ['Data', ['SQL Server', 'T-SQL', 'Database Design', 'Stored Procedures', 'Views']],
  ['Security', ['ASP.NET Core Identity', 'JWT', 'RBAC', 'Policy-Based Authorization', 'CSRF Protection']],
  ['Testing', ['xUnit', 'Unit Testing', 'Integration Testing', 'Architecture Testing', 'WebApplicationFactory']],
  ['Engineering', ['Clean Architecture', 'SOLID Principles', 'OOP', 'REST API Design', 'SignalR', 'Background Services', 'Health Checks', 'Serilog']],
] as const

const tools = ['Git', 'GitHub', 'Swagger / OpenAPI', 'Postman', 'Visual Studio'] as const

export function CoreStack() {
  return (
    <section id="skills" data-scroll-anchor data-reveal data-chapter="03" className="stack-section chapter-section border-y border-border/80 py-16 sm:py-24 lg:py-28" aria-labelledby="stack-title">
      <SectionAtmosphere scene="stack" />
      <Container>
        <SectionHeading eyebrow="CORE STACK" title="Tools and practices used across backend work." />
        <div className="stack-grid mt-12">
          {groups.map(([name, items], index) => (
            <article className={`stack-group stack-group--${index + 1}`} key={name} data-reveal-item data-reveal-order={index} data-stack-node>
              <div className="stack-group__heading">
                <span>0{index + 1}</span>
                <h3>{name}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li className="tech-tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="stack-tools" data-reveal-item data-reveal-order={groups.length}>
          <span>WORKFLOW</span>
          <ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
      </Container>
    </section>
  )
}
