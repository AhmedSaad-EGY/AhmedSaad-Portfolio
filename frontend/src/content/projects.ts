import clinicVisual from '../assets/projects/clinic.webp'
import estatehubVisual from '../assets/projects/estatehub.webp'
import khidmaVisual from '../assets/projects/khidma.webp'
import saiyadVisual from '../assets/projects/saiyad.webp'

export type ProjectLink = { label: string; href: string }
export type Project = {
  slug: 'clinic-management' | 'estatehub' | 'saiyad' | 'khidma'
  name: string
  subtitle: string
  cardSummary: string
  overview: string
  engineeringSignals: readonly string[]
  challenges: readonly { challenge: string; solution: string }[]
  technologies: readonly string[]
  highlights: readonly string[]
  links: readonly ProjectLink[]
  featured: boolean
  presentation: {
    label: 'Flagship case study' | 'Full case study' | 'Technical breakdown'
    actionLabel: 'Case study' | 'Technical breakdown'
    technicalSummary: readonly { label: string; value: string }[]
  }
  visual: { src: string; alt: string; width: number; height: number; fit: 'cover' | 'contain' }
  caseStudyPath: '/projects/clinic-management' | '/projects/estatehub' | '/projects/saiyad' | '/projects/khidma'
}

export const clinicManagementProject: Project = {
  slug: 'clinic-management',
  name: 'Clinic Management Backend',
  subtitle: 'Production-oriented backend',
  cardSummary: 'Clinic management backend that protects appointment resources, keeps financial actions traceable, and handles competing staff updates without silent data loss.',
  overview: 'A modular-monolith clinic management backend built around scheduling, financial workflows, secure access, and automated testing.',
  engineeringSignals: ['Doctor, room, and medical-device scheduling conflict protection.', 'SQL Server rowversion for controlled concurrent updates.', 'Cashier, payment, cancellation-approval, and refund workflows.', 'Domain, application, architecture, and API integration tests.'],
  challenges: [
    { challenge: 'Protect constrained appointment resources.', solution: 'Revalidate scheduling rules and reserve related resources transactionally where required.' },
    { challenge: 'Handle conflicting changes to mutable business records.', solution: 'Use rowversion and explicit conflict responses instead of silently overwriting state.' },
    { challenge: 'Keep financial actions traceable.', solution: 'Model shifts, allocations, approvals, refunds, and audit history as connected workflows.' },
  ],
  technologies: ['.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server', 'ASP.NET Core Identity', 'xUnit', 'Clean Architecture'],
  highlights: ['Protects constrained appointment resources — transactionally revalidating doctor, room, and medical-device rules.', 'Keeps financial actions traceable — connected shifts, allocations, approvals, refunds, and audit history.', 'Avoids silent data loss during conflicting edits — SQL Server rowversion with explicit conflict responses.'],
  links: [{ label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Clinic_Backend' }, { label: 'API Docs', href: 'https://uneraclinic.runasp.net/swagger/index.html' }],
  featured: true,
  presentation: { label: 'Flagship case study', actionLabel: 'Case study', technicalSummary: [{ label: 'Architecture', value: 'Clean Architecture' }, { label: 'Runtime', value: '.NET 10' }, { label: 'Data', value: 'EF Core · SQL Server' }, { label: 'Testing', value: 'xUnit · Integration' }] },
  visual: { src: clinicVisual, alt: 'Project visual concept for Clinic Management Backend, showing a clinic dashboard design.', width: 1440, height: 810, fit: 'cover' },
  caseStudyPath: '/projects/clinic-management',
}

export const projects: readonly Project[] = [
  clinicManagementProject,
  {
    slug: 'estatehub', name: 'EstateHub', subtitle: 'Multi-tenant real-estate platform backend',
    cardSummary: 'Multi-tenant real-estate backend that keeps company data scoped to authenticated memberships while supporting property, lead, and viewing workflows.',
    overview: 'EstateHub is a .NET 10 multi-tenant real-estate backend for public discovery, company operations, and platform administration. Company scope and fine-grained permissions are derived from active database memberships rather than tenant identifiers supplied by the client. The platform covers projects, units, listings, leads, viewing bookings, subscriptions, and billing workflows.',
    engineeringSignals: ['Company scope and permissions derived from active database memberships.', 'Persisted refresh sessions with SHA-256 token hashes and transactional rotation.', 'SQL Server rowversion conflict handling for concurrent updates.', 'Purpose-specific fixed-window rate limits for sensitive authentication actions.', 'Signature-validated file storage with path-safety checks.'],
    challenges: [{ challenge: 'Prevent cross-company access.', solution: 'Resolve company scope from authenticated membership and persisted permissions.' }, { challenge: 'Rotate refresh sessions safely.', solution: 'Use a transactional consume-and-replace refresh-session lifecycle.' }, { challenge: 'Protect conflicting business edits.', solution: 'Use rowversion with explicit conflict handling in services.' }],
    technologies: ['.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server', 'ASP.NET Core Identity', 'JWT', 'RBAC'],
    highlights: ['Keeps company operations within the right tenant — active database memberships determine scope and permissions.', 'Reduces refresh-session misuse — SHA-256 stored sessions with transactional rotation and revocation.', 'Protects uploaded content — signature validation and path-safety checks before storage.'],
    links: [{ label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/EStateHub' }, { label: 'Live', href: 'https://e-statehub.vercel.app' }, { label: 'API', href: 'https://estatehub.runasp.net' }],
    featured: true,
    presentation: { label: 'Full case study', actionLabel: 'Case study', technicalSummary: [{ label: 'Architecture', value: 'Clean Architecture-inspired layers' }, { label: 'Runtime', value: '.NET 10' }, { label: 'Data', value: 'EF Core · SQL Server' }, { label: 'Core concern', value: 'Tenant authorization' }] },
    visual: { src: estatehubVisual, alt: 'Project visual concept for EstateHub, showing a real estate search page design.', width: 1440, height: 688, fit: 'cover' },
    caseStudyPath: '/projects/estatehub',
  },
  {
    slug: 'saiyad', name: 'Saiyad', subtitle: 'Marketplace & Real-Time Auction Platform',
    cardSummary: 'Real-time marketplace and auction backend that keeps participants updated, resolves competing bids, and processes time-based marketplace states.',
    overview: 'Saiyad is a .NET 10 marketplace and auction backend centered on real-time auction workflows. SignalR groups broadcast bid and auction events, while SQL Server rowversion and retry logic address competing bid updates. The system also covers max auto-bids, wallet balance and held-fund transitions, refresh-token replay handling, and time-based background work.',
    engineeringSignals: ['Authenticated SignalR auction rooms and event broadcasting.', 'SQL Server rowversion plus retry handling around bidding.', 'Auto-bid resolution with competing maximum bids.', 'SHA-256 refresh-token storage and replay handling.', 'Hosted workers for auction, wallet-freeze, and return expirations.'],
    challenges: [{ challenge: 'Handle competing auction updates.', solution: 'Combine rowversion with retry handling around bid placement.' }, { challenge: 'Keep auction participants updated.', solution: 'Broadcast bid and auction events to authenticated SignalR groups.' }, { challenge: 'Process time-based marketplace states.', solution: 'Run hosted workers for auction, wallet-freeze, and return expirations.' }],
    technologies: ['C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'SQL Server', 'SignalR', 'JWT', 'xUnit'],
    highlights: ['Keeps auction participants synchronized — authenticated SignalR groups broadcast bid and auction events.', 'Handles competing bids — SQL Server rowversion and retry handling around bid placement.', 'Moves time-bound states forward — hosted workers process auction, wallet-freeze, and return expirations.'],
    links: [{ label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Saiyad' }, { label: 'Live', href: 'https://saiyad-eg.vercel.app' }],
    featured: true,
    presentation: { label: 'Full case study', actionLabel: 'Case study', technicalSummary: [{ label: 'Architecture', value: 'API · Manager · Repository' }, { label: 'Runtime', value: '.NET 10' }, { label: 'Data', value: 'EF Core · SQL Server' }, { label: 'Core concern', value: 'Real-time auctions' }] },
    visual: { src: saiyadVisual, alt: 'Project visual concept for Saiyad, showing its illustrated logo and Arabic name.', width: 900, height: 949, fit: 'contain' },
    caseStudyPath: '/projects/saiyad',
  },
  {
    slug: 'khidma', name: 'Khidma', subtitle: 'Service Marketplace Database',
    cardSummary: 'SQL Server marketplace database that models booking, payment, and rating workflows with 64 stored procedures and 28 reporting views.',
    overview: 'Khidma is a SQL Server database project for a service marketplace connecting clients, workers, and categorized services. Its relational model covers user profiles, bookings, payments, reviews, and two-way ratings. Database-side operations expose booking, worker-availability, payment, rating, verification, and reporting workflows through stored procedures and views.',
    engineeringSignals: ['10 relational tables for the marketplace model.', '64 stored procedures for database-side workflows.', '28 reporting and query views.', 'Explicit client, worker, service, booking, and payment relationships.', 'Two-way rating and dashboard reporting projections.'],
    challenges: [{ challenge: 'Model multi-role service interactions.', solution: 'Separate the base user, worker, and client records within a relational schema.' }, { challenge: 'Centralize database operations.', solution: 'Encapsulate bookings, payments, ratings, and administration in stored procedures.' }, { challenge: 'Expose reporting-ready reads.', solution: 'Provide dedicated revenue, booking, rating, and dashboard views.' }],
    technologies: ['SQL Server', 'T-SQL', 'Relational Modeling', 'Stored Procedures', 'SQL Views', 'Data Integrity'],
    highlights: ['Centralizes marketplace workflows — 64 stored procedures for booking, availability, payment, rating, verification, and reporting.', 'Makes reporting query-ready — 28 views for revenue, booking, rating, and dashboard reads.', 'Protects relational consistency — a 10-table model with explicit foreign keys and constraints.'],
    links: [{ label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Khidma' }],
    featured: true,
    presentation: { label: 'Technical breakdown', actionLabel: 'Technical breakdown', technicalSummary: [{ label: 'Project type', value: 'Database project' }, { label: 'Data', value: 'SQL Server · T-SQL' }, { label: 'Schema', value: '10 tables' }, { label: 'Database surface', value: '64 procedures · 28 views' }] },
    visual: { src: khidmaVisual, alt: 'Project visual concept for Khidma, showing a home services marketplace design.', width: 1440, height: 810, fit: 'cover' },
    caseStudyPath: '/projects/khidma',
  },
]

export function getProject(slug: Project['slug']) {
  const project = projects.find((candidate) => candidate.slug === slug)

  if (!project) throw new Error(`Unknown portfolio project: ${slug}`)

  return project
}
