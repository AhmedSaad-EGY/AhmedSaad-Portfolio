import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

describe('header navigation state', () => {
  it('marks Home as the active location at the top-level Home route', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Certificates' })).toHaveAttribute('href', '#certificates')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/AhmedSaad-EGY')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/ahmed-mohamed-saad-b57695356/')
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', 'https://drive.google.com/file/d/1SAC15_6P-STkrfgnyMSiBScNMmcF8xLz')
    expect(screen.getByText('Ahmed Mohammed Saad')).toHaveClass('brand-name--full')
    expect(screen.getByText('Ahmed M.Saad')).toHaveClass('brand-name--compact')
    vi.unstubAllGlobals()
  })

  it('marks Projects as the current page on project routes', () => {
    render(
      <MemoryRouter initialEntries={['/projects/clinic-management']}>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
  })
})
