import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { MobileNav } from './MobileNav'

describe('mobile navigation', () => {
  it('opens, locks scrolling, and closes with Escape', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <MobileNav activeSection="home" />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)

    expect(screen.getByRole('dialog', { name: 'Main navigation' })).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Main navigation' })).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('closes when the backdrop or a navigation item is selected', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <MobileNav activeSection="home" />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)
    const backdrop = document.querySelector('.mobile-nav-overlay')
    expect(backdrop).not.toBeNull()
    await user.click(backdrop as HTMLElement)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Main navigation' })).not.toBeInTheDocument())

    await user.click(trigger)
    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps keyboard focus inside the open navigation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <MobileNav activeSection="home" />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    const closeButton = screen.getByRole('button', { name: 'Close navigation menu' })
    const resumeLink = screen.getByRole('link', { name: 'Resume' })

    resumeLink.focus()
    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.tab({ shift: true })
    expect(resumeLink).toHaveFocus()
  })
})
