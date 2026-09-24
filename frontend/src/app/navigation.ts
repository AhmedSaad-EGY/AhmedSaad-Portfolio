export const primaryNavigation = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Certificates', href: '#certificates', sectionId: 'certificates' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
] as const

export type HomeSectionId = (typeof primaryNavigation)[number]['sectionId']

export const homeSectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'certificates', 'contact'] as const satisfies readonly HomeSectionId[]
