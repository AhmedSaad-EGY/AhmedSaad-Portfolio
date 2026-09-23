import { describe, expect, it } from 'vitest'

import { projects } from './projects'

describe('portfolio project content', () => {
  it('keeps the approved project order and routes every project to its supported detail level', () => {
    expect(projects.map((project) => project.slug)).toEqual(['clinic-management', 'estatehub', 'saiyad', 'khidma'])
    expect(projects.map((project) => project.caseStudyPath)).toEqual([
      '/projects/clinic-management',
      '/projects/estatehub',
      '/projects/saiyad',
      '/projects/khidma',
    ])
  })

  it('keeps source-backed Khidma counts and presentation levels', () => {
    const khidma = projects.find((project) => project.slug === 'khidma')
    expect(khidma?.cardSummary).toContain('64 stored procedures and 28 reporting views')
    expect(khidma?.highlights).toContain('Makes reporting query-ready — 28 views for revenue, booking, rating, and dashboard reads.')
    expect(khidma?.presentation.label).toBe('Technical breakdown')
    expect(projects.filter((project) => project.presentation.label === 'Full case study').map((project) => project.slug)).toEqual(['estatehub', 'saiyad'])
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

  it('maps each project to a distinct labeled visual concept', () => {
    expect(projects.map((project) => project.visual.src.split('/').at(-1))).toEqual([
      'clinic.webp', 'estatehub.webp', 'saiyad.webp', 'khidma.webp',
    ])
    expect(new Set(projects.map((project) => project.visual.src)).size).toBe(projects.length)
    for (const project of projects) {
      expect(project.visual.alt).toContain('Project visual concept')
      expect(project.visual.width).toBeGreaterThan(0)
      expect(project.visual.height).toBeGreaterThan(0)
    }
    expect(projects.find((project) => project.slug === 'saiyad')?.visual.fit).toBe('contain')
  })

  it('does not include unsupported claims', () => {
    const content = JSON.stringify(projects).toLowerCase()
    const forbiddenTerms = ['senior', 'polly', 'netarchtest', 'mediatr', 'redis', 'postgresql', 'docker', 'indexed views', 'concurrency-safe']

    forbiddenTerms.forEach((term) => expect(content).not.toContain(term))

    const estateHubContent = JSON.stringify(projects.find((project) => project.slug === 'estatehub')).toLowerCase()
    const saiyadContent = JSON.stringify(projects.find((project) => project.slug === 'saiyad')).toLowerCase()
    expect(estateHubContent).not.toContain('automated tests')
    expect(saiyadContent).not.toContain('clean architecture')
  })
})
