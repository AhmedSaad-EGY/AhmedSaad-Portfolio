import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'

import { primaryNavigation, type HomeSectionId } from '../../app/navigation'
import { site } from '../../app/site'

type MobileNavProps = {
  activeSection: HomeSectionId | null
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    buttonRef.current?.focus()
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const trigger = buttonRef.current
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [isMounted])

  useEffect(() => {
    if (!isMounted || !isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
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
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, isMounted, isOpen])

  useEffect(() => {
    if (!isMounted || isOpen) return

    const timeout = window.setTimeout(() => setIsMounted(false), 260)
    return () => window.clearTimeout(timeout)
  }, [isMounted, isOpen])

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        className="focus-ring grid size-11 place-items-center border border-border text-text-primary"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => {
          setIsMounted(true)
          setIsOpen(true)
        }}
      >
        <span className="sr-only">Open navigation menu</span>
        <span aria-hidden="true" className="grid gap-1.5">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </button>

      {isMounted && typeof document !== 'undefined' ? createPortal(
        <div className="mobile-nav-overlay fixed inset-0 z-[100]" data-state={isOpen ? 'open' : 'closed'} onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}>
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-nav-panel absolute right-3 top-[5rem] flex w-[min(20rem,calc(100vw-3rem))] max-h-[min(38rem,calc(100dvh-7rem))] flex-col overflow-y-auto border border-border bg-bg p-5 shadow-2xl outline-none sm:right-7 sm:top-[5.5rem]"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            aria-hidden={!isOpen}
            inert={!isOpen}
            tabIndex={-1}
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-sm text-text-secondary">Navigation</span>
              <button
                className="focus-ring grid size-11 place-items-center border border-border text-text-primary"
                type="button"
                onClick={closeMenu}
              >
                <span className="sr-only">Close navigation menu</span>
                <span aria-hidden="true" className="text-2xl leading-none">×</span>
              </button>
            </div>
            <nav className="py-4" aria-label="Mobile navigation">
              <ul className="w-full">
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
                          className="mobile-nav-link focus-ring block border-b border-border py-2.5 text-base font-medium text-text-primary"
                          to={href}
                          aria-current={currentState}
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          className="mobile-nav-link focus-ring block border-b border-border py-2.5 text-base font-medium text-text-primary"
                          href={href}
                          aria-current={currentState}
                          onClick={closeMenu}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="mobile-resource-grid grid grid-cols-3 gap-2 border-t border-border pt-4" aria-label="Professional resources">
              {[
                ['GitHub', site.links.github],
                ['LinkedIn', site.links.linkedin],
                ['Resume', site.links.resume],
              ].map(([label, href]) => (
                <a className="focus-ring button-secondary px-1 text-xs" href={href} target="_blank" rel="noreferrer" key={label} onClick={closeMenu}>
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
