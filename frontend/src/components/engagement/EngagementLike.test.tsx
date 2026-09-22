import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EngagementLike } from './EngagementLike'

afterEach(() => {
  window.localStorage.clear()
  vi.unstubAllGlobals()
})

describe('portfolio appreciation', () => {
  it('uses one browser id and only celebrates when a like is added', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ count: 8, liked: false }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ count: 9, liked: true }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ count: 8, liked: false }) })
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(window.crypto, 'randomUUID').mockReturnValue('11111111-1111-4111-8111-111111111111')
    const user = userEvent.setup()
    render(<EngagementLike />)

    const button = screen.getByRole('button', { name: /like this portfolio/i })
    await waitFor(() => expect(button).toBeEnabled())
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))
    expect(button).toHaveAttribute('data-celebrate', 'true')
    expect(JSON.parse((fetchMock.mock.calls[1][1] as RequestInit).body as string)).toEqual({
      visitorId: '11111111-1111-4111-8111-111111111111',
      liked: true,
    })

    await user.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
    expect(button).toHaveAttribute('data-celebrate', 'false')
    expect(window.localStorage.getItem('portfolio-visitor-id')).toBe('11111111-1111-4111-8111-111111111111')
  })

  it('reports the backend-dependent state without inventing a count', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<EngagementLike />)

    const button = screen.getByRole('button', { name: /count unavailable/i })
    await waitFor(() => expect(button).toBeDisabled())
    expect(screen.getByText('OFFLINE')).toBeInTheDocument()
    expect(screen.getByText('—')).toBeInTheDocument()
  })
})
