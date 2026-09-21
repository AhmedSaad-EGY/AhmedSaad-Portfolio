import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { MobileNav } from './MobileNav'

describe('mobile navigation', () => {
  it('opens, locks scrolling, and closes with Escape', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)

    expect(screen.getByRole('dialog', { name: 'Main navigation' })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog', { name: 'Main navigation' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
