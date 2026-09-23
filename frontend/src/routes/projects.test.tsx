import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import ProjectsRoute from './projects'

describe('projects route', () => {
  it('renders every approved project and its source-supported detail link', () => {
    render(
      <MemoryRouter>
        <ProjectsRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Backend projects with real business workflows.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Case study' }).map((link) => link.getAttribute('href'))).toEqual([
      '/projects/clinic-management',
      '/projects/estatehub',
      '/projects/saiyad',
    ])
    expect(screen.getByRole('link', { name: 'Technical breakdown' })).toHaveAttribute('href', '/projects/khidma')
    expect(document.querySelector('[data-scroll-progress]')).toBeInTheDocument()
  })
})
