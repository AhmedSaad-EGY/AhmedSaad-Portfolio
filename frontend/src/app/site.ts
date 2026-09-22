import logoUrl from '../assets/brand/Logo.png'

declare const __SITE_URL__: string

const configuredSiteUrl = __SITE_URL__.trim() || 'http://localhost:5173'

export const site = {
  name: 'Ahmed Mohammed Saad',
  role: 'Backend .NET Developer',
  url: configuredSiteUrl.replace(/\/$/, ''),
  email: 'ahmedmohammedsaad01@gmail.com',
  links: {
    github: 'https://github.com/AhmedSaad-EGY',
    linkedin: 'https://www.linkedin.com/in/ahmed-mohamed-saad-b57695356/',
    resume: 'https://drive.google.com/file/d/1SAC15_6P-STkrfgnyMSiBScNMmcF8xLz',
    whatsapp: 'https://wa.me/201026162117',
  },
} as const

export function absoluteUrl(path = '/') {
  return new URL(path, `${site.url}/`).toString()
}

export const socialLinks = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'Email', href: `mailto:${site.email}` },
] as const

export const socialImageUrl = new URL(logoUrl, `${site.url}/`).toString()
