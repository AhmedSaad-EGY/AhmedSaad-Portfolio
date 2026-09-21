export const principles = [
  ['01', 'Contract-First API Design', 'Clear HTTP contracts, predictable validation, consistent errors, and maintainable endpoints.'],
  ['02', 'Zero-Trust Auth & Claims', 'Authentication and authorization boundaries using Identity, JWT where appropriate, RBAC, policies, and secure access control.'],
  ['03', 'Deliberate Database Schemas', 'Relational modeling, integrity constraints, indexing, transactions, and query-aware EF Core design.'],
  ['04', 'Concurrency by Design', 'Concurrency is handled explicitly where conflicting writes can affect business state.'],
  ['05', 'Meaningful Test Automation', 'Unit, integration, and architecture tests focused on critical business behavior and boundaries.'],
  ['06', 'Production Readiness', 'Structured logging, health/readiness checks, security headers, rate limiting where applicable, and maintainable configuration.'],
] as const
