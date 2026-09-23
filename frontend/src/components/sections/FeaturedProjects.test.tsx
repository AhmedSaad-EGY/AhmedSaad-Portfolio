import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { FeaturedProjects } from './FeaturedProjects'

afterEach(() => vi.useRealTimers())

function renderProjects(reducedMotion = false) {
  vi.stubGlobal('IntersectionObserver', undefined)
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: reducedMotion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })))
  render(<MemoryRouter><FeaturedProjects /></MemoryRouter>)
}

describe('featured projects carousel', () => {
  it('shows one project and wraps with the arrow buttons', () => {
    renderProjects()

    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    expect(document.getElementById('projects')).toHaveAttribute('data-project-index', '0')
    expect(screen.queryByRole('heading', { name: 'EstateHub' })).not.toBeInTheDocument()
    expect(document.querySelectorAll('.project-carousel__stage img')).toHaveLength(1)
    expect(screen.getByRole('img', { name: /Project visual concept for Clinic Management Backend/ })).toHaveAttribute('loading', 'eager')

    fireEvent.click(screen.getByRole('button', { name: 'Previous project' }))
    expect(screen.getByRole('heading', { name: 'Khidma' })).toBeInTheDocument()
    expect(document.getElementById('projects')).toHaveAttribute('data-project-index', '3')
    expect(document.querySelectorAll('.project-carousel__stage img')).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('Khidma, project 4 of 4')
    expect(screen.getByRole('button', { name: 'Show project 4: Khidma' })).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector(".project-carousel__panel[data-state='outgoing']")).toHaveAttribute('data-direction', 'previous')
    expect(document.querySelector(".project-carousel__panel[data-state='incoming']")).toHaveAttribute('data-direction', 'previous')

    fireEvent.click(screen.getByRole('button', { name: 'Next project' }))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    expect(document.querySelector(".project-carousel__panel[data-state='incoming']")).toHaveAttribute('data-direction', 'next')

    fireEvent.click(screen.getByRole('button', { name: 'Show project 3: Saiyad' }))
    expect(screen.getByRole('heading', { name: 'Saiyad' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Project visual concept for Saiyad/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show project 3: Saiyad' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('advances automatically only while the visitor is not interacting', () => {
    vi.useFakeTimers()
    renderProjects()

    act(() => vi.advanceTimersByTime(4999))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'EstateHub' }).closest('.project-card')).not.toHaveTextContent('FLAGSHIP CASE STUDY')

    const activeSlide = screen.getByRole('heading', { name: 'EstateHub' }).closest('.project-carousel__stage')!
    fireEvent.mouseEnter(activeSlide)
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()

    fireEvent.mouseLeave(activeSlide)
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('heading', { name: 'Saiyad' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Pause automatic rotation' }))
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('heading', { name: 'Saiyad' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Resume automatic rotation' }))
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByRole('heading', { name: 'Khidma' })).toBeInTheDocument()
  })

  it('keeps manual navigation but disables autoplay for reduced motion', () => {
    vi.useFakeTimers()
    renderProjects(true)

    act(() => vi.advanceTimersByTime(15000))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next project' }))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
  })
})
