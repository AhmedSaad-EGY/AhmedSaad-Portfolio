import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EngagementLike } from './EngagementLike'

afterEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('mobile bottom dock', () => {
  it('renders five approved dock items in order with accessible touch targets', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 12, liked: false }),
    }))
    render(<MemoryRouter><EngagementLike /></MemoryRouter>)

    const dock = screen.getByRole('navigation', { name: 'Portfolio quick actions' })
    expect(dock).toBeInTheDocument()

    const dockItems = dock.querySelectorAll('.mobile-dock__item, .mobile-dock__like')
    expect(dockItems).toHaveLength(5)

    // Expected order: GitHub, LinkedIn, Like, WhatsApp, CV
    const labels = Array.from(dockItems).map((item) => {
      const label = item.querySelector('.mobile-dock__label')
      return label?.textContent?.trim()
    })
    expect(labels).toEqual(['GitHub', 'LinkedIn', 'Like', 'WhatsApp', 'CV'])

    // Check URLs
    const githubLink = screen.getByRole('link', { name: 'Ahmed Saad GitHub profile' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AhmedSaad-EGY')

    const linkedinLink = screen.getByRole('link', { name: 'Ahmed Saad LinkedIn profile' })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ahmed-mohamed-saad-b57695356/')

    const whatsappLink = screen.getByRole('link', { name: 'Ahmed Saad WhatsApp' })
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/201026162117')

    const cvLink = screen.getByRole('link', { name: 'Ahmed Saad Curriculum Vitae' })
    expect(cvLink).toHaveAttribute('href', 'https://drive.google.com/file/d/1SAC15_6P-STkrfgnyMSiBScNMmcF8xLz')

    // Central Like button shows count and has aria-pressed
    const likeBtn = within(dock).getByRole('button', { name: /like this portfolio/i })
    await act(async () => {})
    expect(likeBtn).toHaveAttribute('aria-pressed', 'false')
    expect(likeBtn.querySelector('.engagement-like__count')).toHaveTextContent('12')
  })

  it('hides the mobile dock when a text entry input or textarea receives focus, and restores it on blur', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 5, liked: false }),
    }))
    const { container } = render(
      <MemoryRouter>
        <div>
          <EngagementLike />
          <form>
            <input type="text" aria-label="Test text input" id="test-input" />
            <textarea aria-label="Test textarea" id="test-textarea" />
          </form>
        </div>
      </MemoryRouter>,
    )

    const dock = container.querySelector('.mobile-dock')
    expect(dock).toHaveAttribute('data-input-focused', 'false')

    const input = screen.getByLabelText('Test text input')
    fireEvent.focusIn(input)
    expect(dock).toHaveAttribute('data-input-focused', 'true')

    fireEvent.focusOut(input)
    await act(async () => { await new Promise((r) => setTimeout(r, 10)) })
    expect(dock).toHaveAttribute('data-input-focused', 'false')

    const textarea = screen.getByLabelText('Test textarea')
    fireEvent.focusIn(textarea)
    expect(dock).toHaveAttribute('data-input-focused', 'true')

    fireEvent.focusOut(textarea)
    await act(async () => { await new Promise((r) => setTimeout(r, 10)) })
    expect(dock).toHaveAttribute('data-input-focused', 'false')
  })

  it('renders both layouts for CSS to select without a hydration-time swap', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 7, liked: false }),
    }))
    render(<MemoryRouter><EngagementLike /></MemoryRouter>)

    expect(screen.getByRole('navigation', { name: 'Portfolio quick actions' })).toBeInTheDocument()
    const desktopRail = screen.getByRole('complementary', { name: 'Portfolio appreciation' })
    expect(desktopRail).toBeInTheDocument()
    expect(desktopRail.querySelector('.engagement-like__label')).toHaveTextContent('APPRECIATE')
  })
})
