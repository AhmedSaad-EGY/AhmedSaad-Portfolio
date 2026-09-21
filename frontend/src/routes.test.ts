import { describe, expect, it } from 'vitest'

import routes from './routes'

describe('route foundation', () => {
  it('defines the approved public routes and a catch-all', () => {
    expect(routes).toHaveLength(4)
    expect(routes.map((route) => route.file)).toEqual([
      './routes/home.tsx',
      './routes/projects.tsx',
      './routes/projects/clinic-management.tsx',
      './routes/not-found.tsx',
    ])
  })
})
