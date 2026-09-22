import { useEffect } from 'react'
import { useLocation } from 'react-router'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function MotionController() {
  const location = useLocation()

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const mediaQuery = typeof window.matchMedia === 'function' ? window.matchMedia(reducedMotionQuery) : null
    let observer: IntersectionObserver | null = null

    function showImmediately() {
      observer?.disconnect()
      observer = null
      targets.forEach((target) => {
        target.dataset.revealState = 'immediate'
      })
    }

    function configure() {
      observer?.disconnect()

      if (mediaQuery?.matches || typeof window.IntersectionObserver !== 'function') {
        showImmediately()
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue
            }

            const target = entry.target as HTMLElement
            target.dataset.revealState = 'visible'
            observer?.unobserve(target)
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      )

      const immediateBoundary = window.innerHeight * 0.88
      targets.forEach((target) => {
        if (target.dataset.revealState === 'visible') {
          return
        }

        if (target.getBoundingClientRect().top < immediateBoundary) {
          target.dataset.revealState = 'immediate'
        } else {
          target.dataset.revealState = 'pending'
          observer?.observe(target)
        }
      })
    }

    configure()
    mediaQuery?.addEventListener('change', configure)

    return () => {
      observer?.disconnect()
      mediaQuery?.removeEventListener('change', configure)
    }
  }, [location.pathname])

  return null
}
