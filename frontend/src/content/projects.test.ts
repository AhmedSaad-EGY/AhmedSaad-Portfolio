import { describe, expect, it } from 'vitest'

import { projects } from './projects'

describe('portfolio project content', () => {
  it('keeps the approved project order and only the Clinic internal route', () => {
    expect(projects.map((project) => project.slug)).toEqual(['clinic-management', 'estatehub', 'saiyad', 'khidma'])
    expect(projects.filter((project) => project.caseStudyPath)).toHaveLength(1)
    expect(projects[0].caseStudyPath).toBe('/projects/clinic-management')
  })

  it('uses verified external project URLs', () => {
    expect(projects.flatMap((project) => project.links.map((link) => link.href))).toEqual([
      'https://github.com/AhmedSaad-EGY/Clinic_Backend',
      'https://uneraclinic.runasp.net/swagger/index.html',
      'https://github.com/AhmedSaad-EGY/EStateHub',
      'https://e-statehub.vercel.app',
      'https://estatehub.runasp.net',
      'https://github.com/AhmedSaad-EGY/Saiyad',
      'https://saiyad-eg.vercel.app',
      'https://github.com/AhmedSaad-EGY/Khidma',
    ])
  })

  it('does not include unsupported claims', () => {
    const content = JSON.stringify(projects).toLowerCase()
    const forbiddenTerms = ['senior', 'polly', 'netarchtest', 'mediatr', 'redis', 'postgresql', 'docker', 'indexed views']

    forbiddenTerms.forEach((term) => expect(content).not.toContain(term))
  })
})
