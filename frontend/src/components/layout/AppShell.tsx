import type { PropsWithChildren } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-text-primary">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
