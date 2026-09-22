const layers = [
  ['01', 'ASP.NET Core', 'REST API'],
  ['02', 'C#', 'Business rules'],
  ['03', 'EF Core', 'Data access'],
  ['04', 'SQL Server', 'Persistence'],
] as const

const safeguards = ['Security', 'Concurrency', 'Testing'] as const

export function HeroTechnicalVisual() {
  return (
    <div className="hero-visual-parallax">
      <div className="system-visual" aria-label="Backend request flow and engineering safeguards" data-hero-step="7" data-pointer-surface>
      <span className="system-visual__spotlight" aria-hidden="true" />
      <div className="system-visual__header">
        <div>
          <span className="section-eyebrow">REQUEST FLOW</span>
          <p className="mt-2 text-sm text-text-secondary">A focused view of the backend path.</p>
        </div>
        <span className="system-status"><span aria-hidden="true" /> SYSTEM</span>
      </div>
      <div className="system-request">
        <span>CLIENT REQUEST</span>
        <span className="system-request__line" aria-hidden="true"><span className="system-request__pulse" /></span>
        <span>API RESPONSE</span>
      </div>
      <ol className="system-layers">
        {layers.map(([number, technology, responsibility], index) => (
          <li className="system-layer" key={technology} data-flow-stage={index + 1}>
            <span className="system-layer__number">{number}</span>
            <strong>{technology}</strong>
            <span className="system-layer__responsibility">{responsibility}</span>
            <span className="system-layer__signal" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="system-safeguards">
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-text-muted">CROSS-CUTTING</span>
        <ul>
          {safeguards.map((item, index) => <li key={item} data-safeguard={index + 1}><span aria-hidden="true" />{item}</li>)}
        </ul>
      </div>
      </div>
    </div>
  )
}
