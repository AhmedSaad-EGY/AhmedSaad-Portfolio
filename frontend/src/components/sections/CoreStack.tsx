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
    <section id="skills" className="stack-section scroll-mt-20 border-y border-border/80 py-20 sm:py-24 lg:py-28" aria-labelledby="stack-title">
      <Container>
        <SectionHeading eyebrow="CORE STACK" title="Tools and practices used across backend work." />
        <div className="stack-grid mt-12">
          {groups.map(([name, items], index) => (
            <article className={`stack-group stack-group--${index + 1}`} key={name}>
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
        <div className="stack-tools">
          <span>WORKFLOW</span>
          <ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
      </Container>
    </section>
  )
}
