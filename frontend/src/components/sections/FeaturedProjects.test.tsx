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

  it('advances automatically only while the visitor is not interacting (7s timer)', () => {
    vi.useFakeTimers()
    renderProjects()

    act(() => vi.advanceTimersByTime(6999))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'EstateHub' }).closest('.project-card')).not.toHaveTextContent('FLAGSHIP CASE STUDY')

    const activeSlide = screen.getByRole('heading', { name: 'EstateHub' }).closest('.project-carousel__stage')!
    fireEvent.mouseEnter(activeSlide)
    act(() => vi.advanceTimersByTime(7000))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()

    fireEvent.mouseLeave(activeSlide)
    act(() => vi.advanceTimersByTime(7000))
    expect(screen.getByRole('heading', { name: 'Saiyad' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Pause automatic rotation' }))
    act(() => vi.advanceTimersByTime(7000))
    expect(screen.getByRole('heading', { name: 'Saiyad' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Resume automatic rotation' }))
    act(() => vi.advanceTimersByTime(7000))
    expect(screen.getByRole('heading', { name: 'Khidma' })).toBeInTheDocument()
  })

  it('navigates with swipe gestures and protects vertical scrolling', () => {
    renderProjects()
    const stage = document.querySelector('.project-carousel__stage')!
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // Swipe left (next): deltaX = -60, deltaY = 5 (clear horizontal gesture)
    fireEvent.touchStart(stage, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 140, clientY: 105 }] })
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
    const activeCard = screen.getByRole('heading', { name: 'EstateHub' }).closest('.project-card')!
    let receivedClick = false
    activeCard.addEventListener('click', () => { receivedClick = true })
    fireEvent.click(activeCard)
    expect(receivedClick).toBe(true)

    // Swipe right (previous): deltaX = 65, deltaY = 0
    fireEvent.touchStart(stage, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 165, clientY: 100 }] })
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // Vertical scroll gesture (deltaY > deltaX): should NOT swipe
    fireEvent.touchStart(stage, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 180, clientY: 200 }] })
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // Sub-threshold horizontal movement (< 48px): should NOT swipe
    fireEvent.touchStart(stage, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 170, clientY: 100 }] })
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
  })

  it('pauses the 7s autoplay timer during touch interaction and resumes after', () => {
    vi.useFakeTimers()
    renderProjects()
    const stage = document.querySelector('.project-carousel__stage')!

    act(() => vi.advanceTimersByTime(5000))
    // User places finger on stage (touch start)
    fireEvent.touchStart(stage, { touches: [{ clientX: 100, clientY: 100 }] })
    // While touching, 7 seconds pass - should NOT advance
    act(() => vi.advanceTimersByTime(7000))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // Touch cancels without a swipe
    fireEvent.touchCancel(stage)
    // Autoplay resumes with a fresh 7-second interval
    act(() => vi.advanceTimersByTime(6999))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
  })

  it('pauses autoplay during page scrolling and resumes with a fresh interval', () => {
    vi.useFakeTimers()
    renderProjects()

    act(() => vi.advanceTimersByTime(5000))
    // Scroll event fires
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    // While isScrolling is true (160ms settle window), timers are paused
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // Let the scroll settle timer (remaining 60ms) finish, which unpauses and starts a fresh 7000ms autoplay timer
    act(() => vi.advanceTimersByTime(60))
    // 6999ms into the fresh interval: still on Clinic Management Backend
    act(() => vi.advanceTimersByTime(6999))
    expect(screen.getByRole('heading', { name: 'Clinic Management Backend' })).toBeInTheDocument()

    // 1ms later (7000ms complete): advances to EstateHub
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByRole('heading', { name: 'EstateHub' })).toBeInTheDocument()
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
