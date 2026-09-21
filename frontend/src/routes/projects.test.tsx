import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import ProjectsRoute from './projects'

describe('projects route', () => {
  it('renders every approved project and the Clinic case-study link', () => {
    render(
      <MemoryRouter>
        <ProjectsRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Backend projects with real business workflows.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Case study →' })).toHaveAttribute('href', '/projects/clinic-management')
  })
})
