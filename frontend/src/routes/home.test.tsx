import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import HomeRoute from './home'

describe('home route', () => {
  it('renders the approved identity and keeps contact submission unavailable', () => {
    render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Ahmed Mohammed Saad' })).toBeInTheDocument()
    expect(screen.getAllByText('Backend .NET Developer')).not.toHaveLength(0)
    expect(screen.getByRole('heading', { name: 'Let’s Build Something Reliable.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled()
    expect(screen.queryByText('View Resume')).not.toBeInTheDocument()
  })
})
