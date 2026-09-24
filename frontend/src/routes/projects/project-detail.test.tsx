import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import EstateHubRoute from './estatehub'
import KhidmaRoute from './khidma'
import SaiyadRoute from './saiyad'

describe('project detail routes', () => {
  it.each([
    ['EstateHub', EstateHubRoute, 'Tenant authorization'],
    ['Saiyad', SaiyadRoute, 'Real-time auctions'],
    ['Khidma', KhidmaRoute, '64 procedures · 28 views'],
  ])('renders the source-backed %s detail page', (name, Route, summary) => {
    const { container } = render(<MemoryRouter><Route /></MemoryRouter>)

    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument()
    expect(screen.getByText(summary)).toBeInTheDocument()
    expect(screen.getByText('What the source demonstrates.')).toBeInTheDocument()
    expect(within(screen.getByRole('main')).getByRole('link', { name: 'GitHub' })).toHaveClass('project-resource-link')
    for (const section of container.querySelectorAll('[aria-labelledby]')) {
      const heading = document.getElementById(section.getAttribute('aria-labelledby') ?? '')
      expect(heading?.tagName).toMatch(/^H[1-6]$/)
    }
  })
})
