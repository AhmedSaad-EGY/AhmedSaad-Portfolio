import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ScrollProgress } from './ScrollProgress'

afterEach(() => {
  vi.restoreAllMocks()
  document.documentElement.removeAttribute('data-scrolled')
})

describe('scroll progress', () => {
  it.each(['/', '/projects', '/projects/clinic-management'])('renders on %s', (path) => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <ScrollProgress />
      </MemoryRouter>,
    )

    expect(container.querySelector('[data-scroll-progress]')).toBeInTheDocument()
  })

  it('does not render on an unknown route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/missing']}>
        <ScrollProgress />
      </MemoryRouter>,
    )

    expect(container.querySelector('[data-scroll-progress]')).not.toBeInTheDocument()
  })
})
