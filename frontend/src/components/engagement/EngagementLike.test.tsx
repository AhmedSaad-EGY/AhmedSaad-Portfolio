import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EngagementLike } from './EngagementLike'

afterEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  vi.unstubAllGlobals()
  vi.useRealTimers()
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

    const rail = screen.getByRole('complementary', { name: 'Portfolio appreciation' })
    const button = within(rail).getByRole('button', { name: /like this portfolio/i })
    await waitFor(() => expect(button).toBeEnabled())
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(within(rail).getByText('Like')).toBeInTheDocument()
    expect(within(rail).getByText('8')).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))
    expect(within(rail).getByText('Liked')).toBeInTheDocument()
    expect(button).toHaveAttribute('data-celebrate', 'true')
    expect(JSON.parse((fetchMock.mock.calls[1][1] as RequestInit).body as string)).toEqual({
      visitorId: '11111111-1111-4111-8111-111111111111',
      liked: true,
    })
    expect(window.sessionStorage.getItem('portfolio-like-prompt-shown')).toBe('true')

    await user.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
    expect(button).toHaveAttribute('data-celebrate', 'false')
    expect(window.localStorage.getItem('portfolio-visitor-id')).toBe('11111111-1111-4111-8111-111111111111')
  })

  it('reports the backend-dependent state without inventing a count', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<EngagementLike />)

    await act(async () => {})
    const rail = screen.getByRole('complementary', { name: 'Portfolio appreciation' })
    const button = within(rail).getByRole('button', { name: /count unavailable/i })
    expect(button).toBeDisabled()
    expect(within(rail).getByText('OFFLINE')).toBeInTheDocument()
    expect(within(rail).getByText('—')).toBeInTheDocument()
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(within(rail).queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()
  })

  it('shows one non-blocking prompt after ten visible seconds, then dismisses it', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 8, liked: false }) }))
    render(<EngagementLike />)
    const rail = screen.getByRole('complementary', { name: 'Portfolio appreciation' })

    await act(async () => {})
    await act(async () => { await vi.advanceTimersByTimeAsync(9_999) })
    expect(within(rail).queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()

    await act(async () => { await vi.advanceTimersByTimeAsync(1) })
    expect(within(rail).getByText('Enjoying the portfolio? Leave a like.')).toBeInTheDocument()
    expect(window.sessionStorage.getItem('portfolio-like-prompt-shown')).toBe('true')

    await act(async () => { await vi.advanceTimersByTimeAsync(5_000) })
    expect(within(rail).queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()
  })

  it('does not show the prompt for an already-liked portfolio or an earlier session prompt', async () => {
    vi.useFakeTimers()
    window.sessionStorage.setItem('portfolio-like-prompt-shown', 'true')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 8, liked: false }) }))
    const { unmount } = render(<EngagementLike />)

    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(screen.queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()
    unmount()

    window.sessionStorage.clear()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 8, liked: true }) }))
    render(<EngagementLike />)
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(screen.queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()
  })

  it('does not consume the prompt while a text field hides the mobile dock', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 8, liked: false }) }))
    render(<><EngagementLike /><input aria-label="Your name" /></>)
    const field = screen.getByRole('textbox', { name: 'Your name' })
    const dock = screen.getByRole('navigation', { name: 'Portfolio quick actions' })

    await act(async () => {})
    await act(async () => { await vi.advanceTimersByTimeAsync(5_000) })
    act(() => field.focus())
    expect(dock).toHaveAttribute('data-input-focused', 'true')
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(window.sessionStorage.getItem('portfolio-like-prompt-shown')).toBeNull()

    act(() => field.blur())
    await act(async () => { await vi.advanceTimersByTimeAsync(0) })
    await act(async () => { await vi.advanceTimersByTimeAsync(4_999) })
    expect(within(dock).queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()
    await act(async () => { await vi.advanceTimersByTimeAsync(1) })
    expect(within(dock).getByText('Enjoying the portfolio? Leave a like.')).toBeInTheDocument()
  })

  it('counts only time while the page is visible', async () => {
    vi.useFakeTimers()
    const visibilityDescriptor = Object.getOwnPropertyDescriptor(document, 'visibilityState')
    let visibilityState: DocumentVisibilityState = 'hidden'
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibilityState })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 8, liked: false }) }))
    render(<EngagementLike />)
    const rail = screen.getByRole('complementary', { name: 'Portfolio appreciation' })

    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(within(rail).queryByText('Enjoying the portfolio? Leave a like.')).not.toBeInTheDocument()

    visibilityState = 'visible'
    await act(async () => { document.dispatchEvent(new Event('visibilitychange')) })
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000) })
    expect(within(rail).getByText('Enjoying the portfolio? Leave a like.')).toBeInTheDocument()

    if (visibilityDescriptor) {
      Object.defineProperty(document, 'visibilityState', visibilityDescriptor)
    } else {
      Reflect.deleteProperty(document, 'visibilityState')
    }
  })
})
