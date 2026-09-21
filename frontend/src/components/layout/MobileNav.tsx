import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'

const items = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Projects', '/projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
] as const

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const trigger = buttonRef.current
    document.body.style.overflow = 'hidden'
    menuRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      trigger?.focus()
    }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        className="focus-ring grid size-11 place-items-center border border-border text-text-primary"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Open navigation menu</span>
        <span aria-hidden="true" className="grid gap-1.5">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-bg px-5 pt-5">
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="mx-auto max-w-7xl outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="font-mono text-sm text-text-secondary">Navigation</span>
              <button
                className="focus-ring grid size-11 place-items-center border border-border text-text-primary"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close navigation menu</span>
                <span aria-hidden="true" className="text-2xl leading-none">×</span>
              </button>
            </div>
            <nav className="mt-10" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {items.map(([label, destination]) => {
                  const href = destination.startsWith('#') && !isHome ? `/${destination}` : destination
                  const isCurrent = destination === '/projects' && location.pathname.startsWith('/projects')

                  return (
                    <li key={label}>
                      {href === '/projects' ? (
                        <Link
                          className="focus-ring block border-b border-border py-4 text-2xl font-medium text-text-primary"
                          to={href}
                          aria-current={isCurrent ? 'page' : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          className="focus-ring block border-b border-border py-4 text-2xl font-medium text-text-primary"
                          href={href}
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  )
}
