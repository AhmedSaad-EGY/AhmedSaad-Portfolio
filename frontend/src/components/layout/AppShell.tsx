import type { PropsWithChildren } from 'react'

import { EngagementLike } from '../engagement/EngagementLike'
import { AmbientBackdrop } from '../motion/AmbientBackdrop'
import { InteractionController } from '../motion/InteractionController'
import { MotionController } from '../motion/MotionController'
import { ScrollProgress } from '../ui/ScrollProgress'
import { Footer } from './Footer'
import { Header } from './Header'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell min-h-screen overflow-x-clip bg-bg text-text-primary">
      <a className="skip-link focus-ring" href="#main-content">
        Skip to content
      </a>
      <AmbientBackdrop />
      <InteractionController />
      <MotionController />
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
      <EngagementLike />
    </div>
  )
}
