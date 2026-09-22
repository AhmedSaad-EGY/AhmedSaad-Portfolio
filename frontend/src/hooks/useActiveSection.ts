import { useEffect, useState } from 'react'

type ActiveSectionOptions = {
  enabled?: boolean
  rootMargin?: string
  activationRatio?: number
}

export type SectionSnapshot<T extends string = string> = {
  id: T
  top: number
  bottom: number
  isIntersecting: boolean
}

type ViewportSnapshot = {
  scrollY: number
  viewportHeight: number
  documentHeight: number
}

export function selectActiveSection<T extends string>(
  sectionIds: readonly T[],
  sections: readonly SectionSnapshot<T>[],
  viewport: ViewportSnapshot,
  activationRatio = 0.35,
) {
  const firstId = sectionIds[0] ?? null
  const lastId = sectionIds.at(-1) ?? null

  if (viewport.scrollY <= 1) {
    return firstId
  }

  if (viewport.scrollY + viewport.viewportHeight >= viewport.documentHeight - 2) {
    return lastId
  }

  const activationLine = viewport.viewportHeight * activationRatio
  const intersecting = sections.filter((section) => section.isIntersecting)
  const crossing = intersecting
    .filter((section) => section.top <= activationLine && section.bottom >= activationLine)
    .sort((left, right) => right.top - left.top)

  if (crossing[0]) {
    return crossing[0].id
  }

  return intersecting
    .toSorted((left, right) => {
      const distance = Math.abs(left.top - activationLine) - Math.abs(right.top - activationLine)
      return distance || sectionIds.indexOf(left.id) - sectionIds.indexOf(right.id)
    })[0]?.id ?? null
}

export function useActiveSection<T extends string>(
  sectionIds: readonly T[],
  { enabled = true, rootMargin = '-30% 0px -60% 0px', activationRatio = 0.35 }: ActiveSectionOptions = {},
) {
  const [activeSection, setActiveSection] = useState<T | null>(() => {
    if (!enabled) {
      return null
    }

    const hashId = typeof window === 'undefined' ? '' : window.location.hash.slice(1)
    return sectionIds.find((id) => id === hashId) ?? sectionIds[0] ?? null
  })
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    if (!enabled) {
      return
    }

    const ids = sectionKey.split('|').filter(Boolean) as T[]
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return
    }

    if (typeof window.IntersectionObserver !== 'function') {
      function updateFromHash() {
        const hashId = window.location.hash.slice(1) as T
        setActiveSection(ids.includes(hashId) ? hashId : ids[0] ?? null)
      }

      updateFromHash()
      window.addEventListener('hashchange', updateFromHash)
      return () => window.removeEventListener('hashchange', updateFromHash)
    }

    const intersectingIds = new Set<T>()
    let previous = ids[0] ?? null

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingIds.add(entry.target.id as T)
          } else {
            intersectingIds.delete(entry.target.id as T)
          }
        }

        const sections = elements.map((element) => {
          const bounds = element.getBoundingClientRect()
          return {
            id: element.id as T,
            top: bounds.top,
            bottom: bounds.bottom,
            isIntersecting: intersectingIds.has(element.id as T),
          }
        })
        const selected = selectActiveSection(
          ids,
          sections,
          {
            scrollY: window.scrollY,
            viewportHeight: window.innerHeight,
            documentHeight: document.documentElement.scrollHeight,
          },
          activationRatio,
        ) ?? previous

        if (selected !== previous) {
          previous = selected
          setActiveSection(selected)
        }
      },
      { rootMargin, threshold: [0, 0.01] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [activationRatio, enabled, rootMargin, sectionKey])

  return enabled ? activeSection : null
}
