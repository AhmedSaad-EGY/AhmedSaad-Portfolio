import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import NotFoundRoute from './not-found'

describe('not-found route', () => {
  it('renders an accessible recovery path', () => {
    render(
      <MemoryRouter>
        <NotFoundRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'This page does not exist.' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Home' }).find((link) => link.getAttribute('href') === '/')).toBeDefined()
  })
})
