import { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { selectActiveSection, useActiveSection, type SectionSnapshot } from './useActiveSection'

const ids = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const

function section(id: (typeof ids)[number], top: number, bottom: number, isIntersecting = true): SectionSnapshot<(typeof ids)[number]> {
  return { id, top, bottom, isIntersecting }
}

describe('active section selection', () => {
  it('hydrates a hash URL with the same initial section as prerendered HTML', async () => {
    function CurrentSection() {
      return <span>{useActiveSection(ids)}</span>
    }

    const previousHash = window.location.hash
    vi.stubGlobal('window', undefined)
    const serverHtml = renderToString(<CurrentSection />)
    vi.unstubAllGlobals()
    window.location.hash = '#skills'

    const container = document.createElement('div')
    container.innerHTML = serverHtml
    document.body.append(container)
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot> | undefined

    try {
      await act(async () => {
        root = hydrateRoot(container, <CurrentSection />, { onRecoverableError })
      })
      expect(serverHtml).toContain('home')
      expect(onRecoverableError).not.toHaveBeenCalled()
    } finally {
      await act(async () => root?.unmount())
      container.remove()
      window.location.hash = previousHash
    }
  })

  it('always selects Home at the top', () => {
    const selected = selectActiveSection(ids, [section('home', -20, 700), section('about', 690, 1300)], {
      scrollY: 0,
      viewportHeight: 800,
      documentHeight: 5000,
    })

    expect(selected).toBe('home')
  })

  it('selects the section crossing the activation line when boundaries overlap', () => {
    const selected = selectActiveSection(ids, [section('skills', -300, 260), section('projects', 260, 1000)], {
      scrollY: 1500,
      viewportHeight: 800,
      documentHeight: 5000,
    })

    expect(selected).toBe('projects')
  })

  it('supports the earlier activation line used by compact case-study sections', () => {
    const caseStudyIds = ['architecture', 'scheduling', 'concurrency'] as const
    const selected = selectActiveSection(
      caseStudyIds,
      [
        { id: 'scheduling', top: -120, bottom: 130, isIntersecting: true },
        { id: 'concurrency', top: 130, bottom: 480, isIntersecting: true },
      ],
      { scrollY: 1200, viewportHeight: 800, documentHeight: 5000 },
      0.18,
    )

    expect(selected).toBe('concurrency')
  })

  it('always selects Contact at the bottom', () => {
    const selected = selectActiveSection(ids, [section('experience', -200, 200), section('contact', 180, 900)], {
      scrollY: 4200,
      viewportHeight: 800,
      documentHeight: 5000,
    })

    expect(selected).toBe('contact')
  })
})
