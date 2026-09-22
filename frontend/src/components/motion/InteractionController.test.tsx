import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { InteractionController } from './InteractionController'

function mockPointerPreference(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches,
    media: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  document.documentElement.removeAttribute('data-pointer-active')
  document.documentElement.style.removeProperty('--pointer-x')
  document.documentElement.style.removeProperty('--pointer-y')
})

describe('interaction controller', () => {
  it('does not enable pointer effects when the fine-pointer motion query is unavailable', () => {
    mockPointerPreference(false)
    render(<InteractionController />)

    fireEvent.pointerMove(window, { clientX: 40, clientY: 60 })

    expect(document.documentElement).not.toHaveAttribute('data-pointer-active')
  })

  it('updates shared and local CSS variables without React state', () => {
    mockPointerPreference(true)
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
      callback(0)
      return 1
    }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const { getByTestId, unmount } = render(
      <>
        <InteractionController />
        <article data-testid="surface" data-pointer-surface>
          <button data-testid="button" data-magnetic type="button">Action</button>
        </article>
      </>,
    )
    const surface = getByTestId('surface')
    const button = getByTestId('button')
    vi.spyOn(surface, 'getBoundingClientRect').mockReturnValue({
      x: 0, y: 0, top: 0, right: 200, bottom: 100, left: 0, width: 200, height: 100, toJSON: () => ({}),
    })
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      x: 50, y: 10, top: 10, right: 150, bottom: 50, left: 50, width: 100, height: 40, toJSON: () => ({}),
    })

    fireEvent.pointerMove(button, { clientX: 75, clientY: 25 })

    expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe('75px')
    expect(surface.style.getPropertyValue('--card-x')).toBe('37.5%')
    expect(button.style.getPropertyValue('--magnetic-x')).toBe('-2px')

    unmount()
    expect(removeEventListener).toHaveBeenCalledWith('pointermove', expect.any(Function))
    expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe('')
  })
})
