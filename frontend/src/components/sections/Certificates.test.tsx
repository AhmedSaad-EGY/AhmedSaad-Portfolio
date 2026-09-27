import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Certificates } from './Certificates'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function renderCertificates(reducedMotion = false) {
  vi.stubGlobal('IntersectionObserver', undefined)
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: reducedMotion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })))
  render(<Certificates />)
}

describe('certificate showcase', () => {
  it('maps each preview, accent, and link to the correct certificate', () => {
    renderCertificates()
    const carousel = screen.getByRole('region', { name: 'Certificates' })
    expect(carousel).toHaveAttribute('data-accent', 'blue')
    expect(screen.getByRole('img', { name: /DEPI Certificate of Achievement/ })).toHaveAttribute('width', '1536')
    expect(screen.getByRole('link', { name: 'View certificate' })).toHaveAttribute('href', 'https://drive.google.com/file/d/1hOIl_BS22vTCCjCWqvnO5eV2-T-rIAn2/view?usp=sharing')

    fireEvent.click(screen.getByRole('button', { name: 'Next certificate' }))
    expect(carousel).toHaveAttribute('data-accent', 'green')
    expect(screen.getByRole('heading', { name: 'Team Leader Certificate' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /DEPI Team Leader certificate/ })).toHaveAttribute('width', '700')
    expect(screen.getByRole('link', { name: 'View certificate' })).toHaveAttribute('href', 'https://drive.google.com/file/d/1gbiZfCV-TUsYJFfNRiyKvu03VveY08uB/view?usp=sharing')
    expect(document.querySelector(".certificate-carousel__panel[data-state='outgoing']")).toHaveAttribute('inert')
    expect(screen.getByRole('button', { name: 'Show DEPI Team Leader certificate' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Previous certificate' }))
    expect(carousel).toHaveAttribute('data-accent', 'blue')
  })

  it('rotates after 4s and waits 10s after manual navigation', () => {
    vi.useFakeTimers()
    renderCertificates()
    const carousel = screen.getByRole('region', { name: 'Certificates' })
    act(() => vi.advanceTimersByTime(3999))
    expect(carousel).toHaveAttribute('data-accent', 'blue')
    act(() => vi.advanceTimersByTime(1))
    expect(carousel).toHaveAttribute('data-accent', 'green')

    fireEvent.mouseEnter(carousel)
    act(() => vi.advanceTimersByTime(4000))
    expect(carousel).toHaveAttribute('data-accent', 'green')
    fireEvent.mouseLeave(carousel)
    fireEvent.click(screen.getByRole('button', { name: 'Pause certificate rotation' }))
    act(() => vi.advanceTimersByTime(4000))
    expect(carousel).toHaveAttribute('data-accent', 'green')
    fireEvent.click(screen.getByRole('button', { name: 'Play certificate rotation' }))
    act(() => vi.advanceTimersByTime(4000))
    expect(carousel).toHaveAttribute('data-accent', 'blue')

    fireEvent.click(screen.getByRole('button', { name: 'Next certificate' }))
    act(() => vi.advanceTimersByTime(9999))
    expect(carousel).toHaveAttribute('data-accent', 'green')
    act(() => vi.advanceTimersByTime(1))
    expect(carousel).toHaveAttribute('data-accent', 'blue')
  })

  it('does not autoplay or slide when reduced motion is requested', () => {
    vi.useFakeTimers()
    renderCertificates(true)
    const carousel = screen.getByRole('region', { name: 'Certificates' })
    act(() => vi.advanceTimersByTime(14000))
    expect(carousel).toHaveAttribute('data-accent', 'blue')
    expect(screen.queryByRole('button', { name: 'Pause certificate rotation' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Show DEPI Team Leader certificate' }))
    expect(carousel).toHaveAttribute('data-accent', 'green')
    expect(document.querySelector(".certificate-carousel__panel[data-state='incoming']")).not.toBeInTheDocument()
  })
})
