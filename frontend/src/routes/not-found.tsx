import { Link } from 'react-router'

import { AppShell } from '../components/layout/AppShell'
import { Container } from '../components/ui/Container'
import { absoluteUrl, site } from '../app/site'

export function meta() {
  return [
    { title: `Page not found | ${site.name}` },
    { name: 'robots', content: 'noindex' },
    { tagName: 'link', rel: 'canonical', href: absoluteUrl('/') },
  ]
}

export default function NotFoundRoute() {
  return (
    <AppShell>
      <main id="main-content" className="grid min-h-[60vh] place-items-center" tabIndex={-1}>
        <Container className="max-w-2xl text-center">
          <p className="font-mono text-sm tracking-[0.16em] text-cyan">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-text-primary">This page does not exist.</h1>
          <p className="mt-5 text-text-secondary">Return to the portfolio home page or view the selected projects.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="focus-ring button-primary" to="/">
              Home
            </Link>
            <Link className="focus-ring button-secondary" to="/projects">
              Projects
            </Link>
          </div>
        </Container>
      </main>
    </AppShell>
  )
}
