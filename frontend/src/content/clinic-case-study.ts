export const clinicCaseStudy = {
  overview:
    'A modular-monolith clinic management backend built around scheduling, financial workflows, secure access, and automated testing.',
  architecture: {
    title: 'Modular monolith with Clean Architecture boundaries',
    flow: ['API', 'Application', 'Domain', 'Infrastructure'],
    rules: [
      'Domain has no project or framework dependency.',
      'Application knows Domain and defines application/use-case boundaries.',
      'Infrastructure implements Application boundaries using EF Core and SQL Server.',
      'API composes the system and exposes HTTP contracts.',
    ],
  },
  sections: [
    {
      id: 'scheduling',
      title: 'Scheduling Conflict Protection',
      body: 'Doctor eligibility, service/device/department validation, and room, doctor, and device conflict protection support controlled business conflict responses and transactional booking behavior where required.',
    },
    {
      id: 'concurrency',
      title: 'Optimistic Concurrency & Conflict Handling',
      body: 'SQL Server rowversion and DbUpdateConcurrencyException handling are used where conflicting writes can affect business state.',
    },
    {
      id: 'financial-workflows',
      title: 'Financial Workflows',
      body: 'Cashier drawers, shifts, collections, payments, cancellation approvals, refunds, cash withdrawals, expected cash calculations, and audit logging are part of the financial workflow scope.',
    },
    {
      id: 'security',
      title: 'Authentication & Authorization',
      body: 'The project uses ASP.NET Core Identity, a secure authentication cookie, antiforgery/CSRF protection, policy-based authorization, security response headers, API no-store cache behavior, ProblemDetails, and global exception handling.',
    },
    {
      id: 'testing',
      title: 'Automated Testing',
      body: 'Testing covers Domain Unit Tests, Application Unit Tests, Architecture Tests, API Integration Tests, and WebApplicationFactory.',
    },
    {
      id: 'lessons',
      title: 'Key Architectural Lessons',
      body: 'Business rules, controlled conflict responses, explicit concurrency handling, and clear application boundaries keep backend workflows understandable and maintainable.',
    },
  ],
} as const
