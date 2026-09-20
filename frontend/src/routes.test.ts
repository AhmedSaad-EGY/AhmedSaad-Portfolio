import { describe, expect, it } from 'vitest'

import routes from './routes'

describe('route foundation', () => {
  it('defines only the Phase 0 index route', () => {
    expect(routes).toHaveLength(1)
  })
})
