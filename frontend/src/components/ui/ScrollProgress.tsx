import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const progressRoutes = new Set(['/', '/projects', '/projects/clinic-management'])

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isVisible = progressRoutes.has(location.pathname)

  useEffect(() => {
    const root = document.documentElement
    let animationFrame = 0

    function update() {
      animationFrame = 0
      const maximumScroll = Math.max(root.scrollHeight - root.clientHeight, 0)
      const progress = maximumScroll === 0 ? 0 : Math.min(Math.max(window.scrollY / maximumScroll, 0), 1)
      const parallaxOffset = Math.min(Math.max(window.scrollY, 0) * 0.025, 8)

      progressRef.current?.style.setProperty('--scroll-progress', String(progress))
      root.toggleAttribute('data-scrolled', window.scrollY > 24)
      root.style.setProperty('--hero-parallax', `${parallaxOffset}px`)
    }

    function scheduleUpdate() {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame)
      }
      root.removeAttribute('data-scrolled')
      root.style.removeProperty('--hero-parallax')
    }
  }, [location.pathname])

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      data-scroll-progress
      aria-hidden="true"
    />
  )
}
