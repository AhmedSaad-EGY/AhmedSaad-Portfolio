import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Backend unavailable in frontend unit tests.')))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})
