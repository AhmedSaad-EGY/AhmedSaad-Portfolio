import { clinicCaseStudy } from '../../content/clinic-case-study'

export function ArchitectureDiagram() {
  return (
    <div className="architecture-diagram" data-pointer-surface>
      <span className="architecture-diagram__spotlight" aria-hidden="true" />
      <div className="architecture-diagram__heading">
        <p className="section-eyebrow">DEPENDENCY DIRECTION</p>
        <p>Framework and delivery details point toward the application and domain boundaries.</p>
      </div>
      <div className="architecture-map" role="group" aria-label="Clinic Clean Architecture dependency direction">
        <div className="architecture-node architecture-node--api" data-architecture-node="api"><span>01</span><strong>API</strong><small>HTTP contracts</small></div>
        <span className="architecture-arrow architecture-arrow--right" data-architecture-arrow="api-application" aria-hidden="true">→</span>
        <div className="architecture-node architecture-node--application" data-architecture-node="application"><span>02</span><strong>Application</strong><small>Use-case boundaries</small></div>
        <span className="architecture-arrow architecture-arrow--left" data-architecture-arrow="infrastructure-application" aria-hidden="true">←</span>
        <div className="architecture-node architecture-node--infrastructure" data-architecture-node="infrastructure"><span>04</span><strong>Infrastructure</strong><small>EF Core · SQL Server</small></div>
        <span className="architecture-arrow architecture-arrow--down" data-architecture-arrow="application-domain" aria-hidden="true">↓</span>
        <div className="architecture-node architecture-node--domain" data-architecture-node="domain"><span>03</span><strong>Domain</strong><small>Business rules</small></div>
      </div>
      <ul className="architecture-rules">
        {clinicCaseStudy.architecture.rules.map((rule, index) => (
          <li key={rule} data-reveal-item data-reveal-order={index}><span>0{index + 1}</span><p>{rule}</p></li>
        ))}
      </ul>
    </div>
  )
}
