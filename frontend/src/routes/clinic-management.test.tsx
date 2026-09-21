import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import ClinicManagementRoute from './projects/clinic-management'

describe('Clinic Management case study route', () => {
  it('renders factual architecture and health information without unsupported claims', () => {
    render(
      <MemoryRouter>
        <ClinicManagementRoute />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Clinic Management Backend' })).toBeInTheDocument()
    expect(screen.getByText('Modular monolith with Clean Architecture boundaries')).toBeInTheDocument()
    expect(screen.queryByText(/Polly/i)).not.toBeInTheDocument()
  })
})
