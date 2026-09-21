const layers = [
  ['01', 'ASP.NET Core', 'REST API'],
  ['02', 'C#', 'Business rules'],
  ['03', 'EF Core', 'Data access'],
  ['04', 'SQL Server', 'Persistence'],
] as const

const safeguards = ['Security', 'Concurrency', 'Testing'] as const

export function HeroTechnicalVisual() {
  return (
    <div className="system-visual" aria-label="Backend request flow and engineering safeguards">
      <div className="system-visual__header">
        <div>
          <span className="section-eyebrow">REQUEST FLOW</span>
          <p className="mt-2 text-sm text-text-secondary">A focused view of the backend path.</p>
        </div>
        <span className="system-status"><span aria-hidden="true" /> SYSTEM</span>
      </div>
      <div className="system-request">
        <span>CLIENT REQUEST</span>
        <span className="system-request__line" aria-hidden="true" />
        <span>API RESPONSE</span>
      </div>
      <ol className="system-layers">
        {layers.map(([number, technology, responsibility]) => (
          <li className="system-layer" key={technology}>
            <span className="system-layer__number">{number}</span>
            <strong>{technology}</strong>
            <span>{responsibility}</span>
          </li>
        ))}
      </ol>
      <div className="system-safeguards">
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-text-muted">CROSS-CUTTING</span>
        <ul>
          {safeguards.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}
