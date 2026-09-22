import { act, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MotionController } from './MotionController'

function mockMotionPreference(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('motion controller', () => {
  it('keeps content immediately visible without IntersectionObserver support', () => {
    mockMotionPreference(false)
    vi.stubGlobal('IntersectionObserver', undefined)

    const { container } = render(
      <MemoryRouter>
        <MotionController />
        <section data-reveal>Content</section>
      </MemoryRouter>,
    )

    expect(container.querySelector('[data-reveal]')).toHaveAttribute('data-reveal-state', 'immediate')
  })

  it('keeps content immediately visible when reduced motion is requested', () => {
    mockMotionPreference(true)
    const observe = vi.fn()
    vi.stubGlobal('IntersectionObserver', vi.fn(() => ({ observe, unobserve: vi.fn(), disconnect: vi.fn() })))

    const { container } = render(
      <MemoryRouter>
        <MotionController />
        <section data-reveal>Content</section>
      </MemoryRouter>,
    )

    expect(container.querySelector('[data-reveal]')).toHaveAttribute('data-reveal-state', 'immediate')
    expect(observe).not.toHaveBeenCalled()
  })

  it('reveals an observed below-fold target once', () => {
    mockMotionPreference(false)
    let callback: IntersectionObserverCallback | undefined
    const observe = vi.fn()
    const unobserve = vi.fn()
    class MockIntersectionObserver {
      observe = observe
      unobserve = unobserve
      disconnect = vi.fn()

      constructor(nextCallback: IntersectionObserverCallback) {
        callback = nextCallback
      }
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 1200,
      top: 1200,
      right: 100,
      bottom: 1300,
      left: 0,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    })

    const { container } = render(
      <MemoryRouter>
        <MotionController />
        <section data-reveal>Content</section>
      </MemoryRouter>,
    )
    const target = container.querySelector<HTMLElement>('[data-reveal]')

    expect(target).toHaveAttribute('data-reveal-state', 'pending')
    expect(observe).toHaveBeenCalledWith(target)

    act(() => {
      callback?.([{ isIntersecting: true, target } as unknown as IntersectionObserverEntry], {} as IntersectionObserver)
    })

    expect(target).toHaveAttribute('data-reveal-state', 'visible')
    expect(unobserve).toHaveBeenCalledTimes(1)
  })
})
