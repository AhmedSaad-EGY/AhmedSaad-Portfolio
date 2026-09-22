import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'

import { primaryNavigation, type HomeSectionId } from '../../app/navigation'
import { site } from '../../app/site'

type MobileNavProps = {
  activeSection: HomeSectionId | null
}

export function MobileNav({ activeSection }: MobileNavProps) {
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
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) {
        return
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      )
      const first = focusable[0]
      const last = focusable.at(-1)

      if (!first || !last) {
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
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
    <div className="xl:hidden">
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

      {isOpen && typeof document !== 'undefined' ? createPortal(
        <div className="mobile-nav-overlay fixed inset-0 z-[100] min-h-dvh overflow-y-auto px-5 pb-8 pt-5">
          <span className="mobile-nav-orbit mobile-nav-orbit--one" aria-hidden="true" />
          <span className="mobile-nav-orbit mobile-nav-orbit--two" aria-hidden="true" />
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-nav-panel relative z-10 mx-auto grid min-h-[calc(100dvh-3.25rem)] max-w-7xl grid-rows-[auto_1fr_auto] outline-none"
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
            <nav className="flex items-center py-7" aria-label="Mobile navigation">
              <ul className="w-full space-y-1">
                {primaryNavigation.map((item) => {
                  const href = item.sectionId === 'projects' && isHome
                    ? '#projects'
                    : item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href
                  const isProjectRoute = item.href === '/projects' && location.pathname.startsWith('/projects')
                  const currentState = isProjectRoute ? 'page' : isHome && activeSection === item.sectionId ? 'location' : undefined

                  return (
                    <li key={item.label}>
                      {href === '/projects' ? (
                        <Link
                          className="mobile-nav-link focus-ring block border-b border-border py-3 text-xl font-medium text-text-primary sm:py-4 sm:text-2xl"
                          to={href}
                          aria-current={currentState}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          className="mobile-nav-link focus-ring block border-b border-border py-3 text-xl font-medium text-text-primary sm:py-4 sm:text-2xl"
                          href={href}
                          aria-current={currentState}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="mobile-resource-grid grid gap-3 border-t border-border pt-5 sm:grid-cols-3" aria-label="Professional resources">
              {[
                ['GitHub', site.links.github],
                ['LinkedIn', site.links.linkedin],
                ['Resume', site.links.resume],
              ].map(([label, href]) => (
                <a className="focus-ring button-secondary" href={href} target="_blank" rel="noreferrer" key={label}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </div>
  )
}
