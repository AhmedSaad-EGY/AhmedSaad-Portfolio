import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { projects } from '../../content/projects'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

type SlideDirection = 'next' | 'previous'
type SlideTransition = { previousIndex: number; direction: SlideDirection }

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [announcement, setAnnouncement] = useState('')
  const [transition, setTransition] = useState<SlideTransition | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver !== 'function') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const updateMotion = () => {
      setReducedMotion(Boolean(media?.matches))
      if (media?.matches) setTransition(null)
    }
    const updateVisibility = () => setPageVisible(!document.hidden)

    updateMotion()
    updateVisibility()
    media?.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media?.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!isVisible || isHovered || hasFocus || !pageVisible || reducedMotion || !isPlaying || projects.length < 2) return
    const timer = window.setTimeout(() => {
      setTransition({ previousIndex: activeIndex, direction: 'next' })
      setActiveIndex((activeIndex + 1) % projects.length)
    }, 5000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isVisible, isHovered, hasFocus, pageVisible, reducedMotion, isPlaying])

  function showProject(nextIndex: number, direction: SlideDirection) {
    if (nextIndex === activeIndex) return
    setTransition(reducedMotion ? null : { previousIndex: activeIndex, direction })
    setActiveIndex(nextIndex)
    setAnnouncement(`${projects[nextIndex].name}, project ${nextIndex + 1} of ${projects.length}`)
  }

  return (
    <section ref={sectionRef} id="projects" data-scroll-anchor data-reveal data-chapter="02" data-project-index={activeIndex} className="projects-section chapter-section py-16 sm:py-24 lg:py-28" aria-labelledby="featured-projects-title">
      <SectionAtmosphere scene="projects" />
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="FEATURED PROJECTS" title="Backend work grounded in real workflows." />
          <Link className="focus-ring shrink-0 whitespace-nowrap text-sm font-semibold text-cyan hover:text-text-primary" data-magnetic to="/projects" data-reveal-item data-reveal-order={0}>
            View all projects →
          </Link>
        </div>
        <div
          className="project-carousel mt-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
        >
          <div className="project-carousel__controls">
            <p className="project-carousel__position" aria-live="off">
              PROJECT <span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
            </p>
            {!reducedMotion && (
              <button className="project-carousel__toggle focus-ring" type="button" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pause automatic rotation' : 'Resume automatic rotation'}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            )}
          </div>
          <p className="sr-only" role="status">{announcement}</p>
          <div className="project-carousel__layout">
            <button
              className="project-carousel__arrow project-carousel__arrow--previous focus-ring"
              type="button"
              aria-label="Previous project"
              onClick={() => showProject((activeIndex - 1 + projects.length) % projects.length, 'previous')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
            </button>
            <div
              className="project-carousel__stage"
              aria-live="off"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocusCapture={() => setHasFocus(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
              }}
            >
              {projects.map((project, index) => {
                const state = index === activeIndex ? (transition ? 'incoming' : 'active') : index === transition?.previousIndex ? 'outgoing' : 'hidden'
                return (
                  <div
                    className="project-carousel__panel"
                    data-state={state}
                    data-direction={transition?.direction}
                    aria-hidden={index !== activeIndex}
                    inert={index !== activeIndex}
                    key={project.slug}
                    onAnimationEnd={(event) => {
                      if (event.target === event.currentTarget && state === 'incoming') setTransition(null)
                    }}
                  >
                    <ProjectCard featured sequence={String(index + 1).padStart(2, '0')} revealOrder={0} project={project} showVisual={state !== 'hidden'} imageLoading="eager" />
                  </div>
                )
              })}
            </div>
            <button
              className="project-carousel__arrow project-carousel__arrow--next focus-ring"
              type="button"
              aria-label="Next project"
              onClick={() => showProject((activeIndex + 1) % projects.length, 'next')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
            </button>
            <div className="project-carousel__dots" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button
                  className="project-carousel__dot focus-ring"
                  type="button"
                  aria-label={`Show project ${index + 1}: ${project.name}`}
                  aria-pressed={activeIndex === index}
                  key={project.slug}
                  onClick={() => showProject(index, index > activeIndex ? 'next' : 'previous')}
                ><span aria-hidden="true" /></button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
