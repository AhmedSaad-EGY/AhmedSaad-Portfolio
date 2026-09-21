export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: 'clinic-management' | 'estatehub' | 'saiyad' | 'khidma'
  name: string
  subtitle: string
  description: string
  technologies: readonly string[]
  highlights: readonly string[]
  links: readonly ProjectLink[]
  featured: boolean
  caseStudyPath?: '/projects/clinic-management'
}

export const clinicManagementProject: Project = {
  slug: 'clinic-management',
  name: 'Clinic Management Backend',
  subtitle: 'Production-oriented backend',
  description:
    'Production-oriented clinic management backend covering scheduling, financial workflows, concurrency control, security, and automated testing.',
  technologies: [
    '.NET 10',
    'ASP.NET Core',
    'EF Core',
    'SQL Server',
    'ASP.NET Core Identity',
    'xUnit',
    'Clean Architecture',
  ],
  highlights: [
    'Doctor, room, and medical-device scheduling conflict protection.',
    'Optimistic concurrency using SQL Server rowversion.',
    'Patient treatment history, prescriptions, and follow-up workflows.',
    'Cashier shifts, collections, cancellation approvals, and refunds.',
    'Secure authentication/authorization, CSRF protection, ProblemDetails, and health/readiness checks.',
    'Domain, application, architecture, and API integration tests.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Clinic_Backend' },
    { label: 'API Docs', href: 'https://uneraclinic.runasp.net/swagger/index.html' },
  ],
  featured: true,
  caseStudyPath: '/projects/clinic-management',
}

export const projects: readonly Project[] = [
  clinicManagementProject,
  {
    slug: 'estatehub',
    name: 'EstateHub',
    subtitle: 'Multi-tenant real-estate platform backend',
    description:
      'Multi-tenant real-estate platform backend supporting companies, employees, customers, listings, projects, units, leads, bookings, subscriptions, and billing workflows.',
    technologies: ['ASP.NET Core', 'EF Core', 'SQL Server', 'JWT', 'REST APIs', 'RBAC'],
    highlights: [
      'Company-level access isolation and database-backed permissions.',
      'Fine-grained company RBAC and separate platform-admin authorization.',
      'Persisted refresh-token sessions, token rotation/revocation, and authentication rate limiting.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/EStateHub' },
      { label: 'Live', href: 'https://e-statehub.vercel.app' },
      { label: 'API', href: 'https://estatehub.runasp.net' },
    ],
    featured: true,
  },
  {
    slug: 'saiyad',
    name: 'Saiyad',
    subtitle: 'Marketplace & Real-Time Auction Platform',
    description:
      'Real-time marketplace and auction backend featuring SignalR, concurrency-safe bidding, auto-bid logic, JWT authentication, refresh-token rotation, background processing, wallets, subscriptions, logging, and health monitoring.',
    technologies: ['ASP.NET Core', 'EF Core', 'SQL Server', 'SignalR', 'JWT', 'Serilog'],
    highlights: [
      'Real-time auctions, concurrency-safe bidding, and auto-bid.',
      'Rotating refresh tokens with SHA256 refresh-token storage.',
      'Background services, wallets/subscriptions, rate limiting, and health checks.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Saiyad' },
      { label: 'Live', href: 'https://saiyad-eg.vercel.app' },
    ],
    featured: true,
  },
  {
    slug: 'khidma',
    name: 'Khidma',
    subtitle: 'Service Marketplace Database',
    description:
      'SQL Server database designed for a multi-role service marketplace with normalized relational modeling and database-side business operations.',
    technologies: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Views'],
    highlights: [
      '63 Stored Procedures and 26 Views.',
      'Normalized relational schema with referential integrity, foreign keys, and constraints.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/AhmedSaad-EGY/Khidma' }],
    featured: true,
  },
]
