import { useEffect } from 'react'

const pointerQuery = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function clearSurface(element: HTMLElement | null) {
  if (!element) {
    return
  }

  delete element.dataset.pointerActive
  for (const property of ['--card-x', '--card-y', '--card-rotate-x', '--card-rotate-y']) {
    element.style.removeProperty(property)
  }
}

function clearMagnetic(element: HTMLElement | null) {
  if (!element) {
    return
  }

  element.style.removeProperty('--magnetic-x')
  element.style.removeProperty('--magnetic-y')
}

export function InteractionController() {
  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = typeof window.matchMedia === 'function' ? window.matchMedia(pointerQuery) : null
    let animationFrame = 0
    let latestEvent: PointerEvent | null = null
    let activeSurface: HTMLElement | null = null
    let activeMagnetic: HTMLElement | null = null
    let listening = false

    function reset() {
      clearSurface(activeSurface)
      clearMagnetic(activeMagnetic)
      activeSurface = null
      activeMagnetic = null
      latestEvent = null
      root.removeAttribute('data-pointer-active')
      root.style.removeProperty('--pointer-x')
      root.style.removeProperty('--pointer-y')
    }

    function update() {
      animationFrame = 0
      const event = latestEvent
      if (!event) {
        return
      }

      root.dataset.pointerActive = 'true'
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)

      const target = event.target instanceof Element ? event.target : null
      const surface = target?.closest<HTMLElement>('[data-pointer-surface]') ?? null
      const magnetic = target?.closest<HTMLElement>('[data-magnetic]') ?? null

      if (surface !== activeSurface) {
        clearSurface(activeSurface)
        activeSurface = surface
      }

      if (surface) {
        const bounds = surface.getBoundingClientRect()
        const x = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width)
        const y = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height)
        const xRatio = bounds.width === 0 ? 0.5 : x / bounds.width
        const yRatio = bounds.height === 0 ? 0.5 : y / bounds.height
        surface.dataset.pointerActive = 'true'
        surface.style.setProperty('--card-x', `${xRatio * 100}%`)
        surface.style.setProperty('--card-y', `${yRatio * 100}%`)
        surface.style.setProperty('--card-rotate-x', `${(0.5 - yRatio) * 2.4}deg`)
        surface.style.setProperty('--card-rotate-y', `${(xRatio - 0.5) * 2.4}deg`)
      }

      if (magnetic !== activeMagnetic) {
        clearMagnetic(activeMagnetic)
        activeMagnetic = magnetic
      }

      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect()
        const offsetX = Math.max(-4, Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * 0.08))
        const offsetY = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.08))
        magnetic.style.setProperty('--magnetic-x', `${offsetX}px`)
        magnetic.style.setProperty('--magnetic-y', `${offsetY}px`)
      }
    }

    function handlePointerMove(event: PointerEvent) {
      latestEvent = event
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(update)
      }
    }

    function start() {
      if (listening) {
        return
      }

      listening = true
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', reset)
      window.addEventListener('blur', reset)
    }

    function stop() {
      if (listening) {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerleave', reset)
        window.removeEventListener('blur', reset)
        listening = false
      }

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
      reset()
    }

    function configure() {
      if (mediaQuery?.matches) {
        start()
      } else {
        stop()
      }
    }

    configure()
    mediaQuery?.addEventListener('change', configure)

    return () => {
      mediaQuery?.removeEventListener('change', configure)
      stop()
    }
  }, [])

  return null
}
