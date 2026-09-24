import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HomeRoute from './home'

describe('home route', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('renders the approved identity, section order, and interactive contact form', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 0, liked: false }),
    }))

    const { container } = render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Ahmed Mohammed Saad' })).toBeInTheDocument()
    expect(container.querySelector('.hero-name--compact')).toHaveTextContent('Ahmed M.Saad')
    expect(screen.getAllByText('Backend .NET Developer')).not.toHaveLength(0)
    expect(screen.getByRole('heading', { name: 'Let’s Build Something Reliable.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled()
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', 'https://drive.google.com/file/d/1SAC15_6P-STkrfgnyMSiBScNMmcF8xLz')
    expect(document.querySelector('[data-scroll-progress]')).toBeInTheDocument()
    expect(document.querySelectorAll('.section-atmosphere')).toHaveLength(6)
    expect(document.querySelectorAll('.section-atmosphere__field')).toHaveLength(6)
    expect(document.querySelectorAll('.ambient-backdrop > *')).toHaveLength(1)
    const orderedSections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((id) => document.getElementById(id))
    for (const section of orderedSections) {
      expect(section).toHaveAttribute('data-scroll-anchor')
    }
    for (let index = 1; index < orderedSections.length; index += 1) {
      const previousSection = orderedSections[index - 1]
      const currentSection = orderedSections[index]
      expect(previousSection).not.toBeNull()
      expect(currentSection).not.toBeNull()
      if (!previousSection || !currentSection) {
        throw new Error('Expected every ordered home section to exist.')
      }
      expect(previousSection.compareDocumentPosition(currentSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    }
    for (const id of ['home', 'about', 'projects', 'skills', 'experience', 'contact']) {
      expect(document.getElementById(id)).toHaveAttribute('data-scroll-anchor')
    }
    for (const section of container.querySelectorAll('[aria-labelledby]')) {
      const heading = document.getElementById(section.getAttribute('aria-labelledby') ?? '')
      expect(heading?.tagName).toMatch(/^H[1-6]$/)
    }
  })
})
