import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CaseStudyToc } from './CaseStudyToc'

afterEach(() => {
  window.location.hash = ''
  vi.unstubAllGlobals()
})

describe('Clinic case study table of contents', () => {
  it('exposes a compact native mobile navigator and an active location', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const user = userEvent.setup()
    render(<CaseStudyToc />)

    const mobileNavigator = screen.getByText('ON THIS PAGE', { selector: 'summary span' }).closest('details')
    expect(mobileNavigator).not.toHaveAttribute('open')

    await user.click(screen.getByText('ON THIS PAGE', { selector: 'summary span' }))

    expect(mobileNavigator).toHaveAttribute('open')
    for (const link of screen.getAllByRole('link', { name: /Clean Architecture & System Flow/ })) {
      expect(link).toHaveAttribute('aria-current', 'location')
    }
  })
})
