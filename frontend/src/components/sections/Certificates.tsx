import { useEffect, useRef, useState, type TouchEvent } from 'react'

import graduateImage from '../../assets/certificates/depi-certificate.webp'
import leaderImage from '../../assets/certificates/team-leader-certificate.webp'
import { site } from '../../app/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const certificates = [
  {
    id: 'graduate', accent: 'blue', image: graduateImage, width: 1536, height: 1024,
    alt: 'DEPI Certificate of Achievement awarded to Ahmed Mohammed Saad Ahmed for the Full Stack .NET Web Developer track',
    label: 'DEPI · CERTIFICATE OF ACHIEVEMENT', title: 'Digital Egypt Pioneers Initiative (DEPI)',
    description: 'Full Stack .NET Web Developer track', href: site.links.certificate,
    selector: 'DEPI graduate certificate',
  },
  {
    id: 'leader', accent: 'green', image: leaderImage, width: 700, height: 490,
    alt: 'DEPI Team Leader certificate awarded to Ahmed Mohammed Saad for outstanding leadership and contributions',
    label: 'DEPI · TEAM LEADER RECOGNITION', title: 'Team Leader Certificate',
    description: 'Awarded for outstanding leadership and exceptional contributions as a Team Leader in the Digital Egypt Pioneers Program.',
    href: site.links.teamLeaderCertificate, selector: 'DEPI Team Leader certificate',
  },
] as const

const rotationDelay = 7_000
const swipeThresholdPx = 48
const swipeAxisRatio = 1.5

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTouching, setIsTouching] = useState(false)
  const [timerVersion, setTimerVersion] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const touchOriginRef = useRef<{ x: number; y: number } | null>(null)

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
      if (media?.matches) setPreviousIndex(null)
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

  const paused = !isVisible || isHovered || hasFocus || !pageVisible || reducedMotion || !isPlaying || isTouching
  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => {
      setDirection('next')
      setPreviousIndex(activeIndex)
      setActiveIndex((activeIndex + 1) % certificates.length)
    }, rotationDelay)
    return () => window.clearTimeout(timer)
  }, [activeIndex, paused, timerVersion])

  function showCertificate(nextIndex: number, nextDirection: 'next' | 'previous') {
    setTimerVersion((version) => version + 1)
    if (nextIndex === activeIndex) return
    setDirection(nextDirection)
    setPreviousIndex(reducedMotion ? null : activeIndex)
    setActiveIndex(nextIndex)
    setAnnouncement(`${certificates[nextIndex].selector}, ${nextIndex + 1} of ${certificates.length}`)
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    if (!touch) return
    touchOriginRef.current = { x: touch.clientX, y: touch.clientY }
    setIsTouching(true)
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const origin = touchOriginRef.current
    const touch = event.changedTouches[0]
    touchOriginRef.current = null
    setIsTouching(false)
    if (!origin || !touch) return

    const deltaX = touch.clientX - origin.x
    const deltaY = touch.clientY - origin.y
    if (Math.abs(deltaX) < swipeThresholdPx || Math.abs(deltaX) < Math.abs(deltaY) * swipeAxisRatio) return

    event.preventDefault()
    showCertificate(
      deltaX < 0 ? (activeIndex + 1) % certificates.length : (activeIndex - 1 + certificates.length) % certificates.length,
      deltaX < 0 ? 'next' : 'previous',
    )
  }

  function handleTouchCancel() {
    touchOriginRef.current = null
    setIsTouching(false)
  }

  return (
    <section ref={sectionRef} id="certificates" data-scroll-anchor data-reveal data-chapter="05" data-certificate-index={activeIndex} className="certificates-section chapter-section border-b border-border/80 py-16 sm:py-24 lg:py-28" aria-labelledby="certificates-title">
      <Container>
        <SectionHeading id="certificates-title" eyebrow="CERTIFICATES" title="Verified learning, applied in practice." />
        <div className="certificate-carousel mt-12" data-accent={certificates[activeIndex].accent} role="region" aria-roledescription="carousel" aria-label="Certificates"
          onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false) }}
        >
          <div className="certificate-carousel__toolbar">
            <p className="certificate-carousel__position">CERTIFICATE <span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(certificates.length).padStart(2, '0')}</p>
            {!reducedMotion && <button className="certificate-carousel__toggle focus-ring" type="button" onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pause certificate rotation' : 'Play certificate rotation'}>{isPlaying ? 'Pause' : 'Play'}</button>}
          </div>
          <p className="sr-only" role="status">{announcement}</p>
          <div className="certificate-carousel__layout">
            <button className="certificate-carousel__arrow certificate-carousel__arrow--previous focus-ring" type="button" aria-label="Previous certificate" onClick={() => showCertificate((activeIndex - 1 + certificates.length) % certificates.length, 'previous')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button>
            <div className="certificate-carousel__frame">
              <div className="certificate-carousel__stage" aria-live="off" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchCancel}>
                {certificates.map((certificate, index) => {
                  const state = index === activeIndex ? (previousIndex === null ? 'active' : 'incoming') : index === previousIndex ? 'outgoing' : 'hidden'
                  return (
                    <div className="certificate-carousel__panel" data-state={state} data-direction={direction} data-accent={certificate.accent} aria-hidden={index !== activeIndex} inert={index !== activeIndex} key={certificate.id}
                      onAnimationEnd={(event) => { if (event.target === event.currentTarget && state === 'incoming') setPreviousIndex(null) }}
                    >
                      <div className="certificate-feature grid overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                        <div className="certificate-feature__visual min-w-0">
                          <img src={certificate.image} alt={certificate.alt} width={certificate.width} height={certificate.height} className="block h-full w-full object-contain" loading="lazy" decoding="async" />
                        </div>
                        <div className="certificate-feature__content flex min-w-0 flex-col p-6 sm:p-8 lg:p-7">
                          <div className="certificate-feature__copy">
                            <p className="certificate-feature__label font-mono text-xs tracking-[0.15em]">{certificate.label}</p>
                            <h3 className="certificate-feature__title mt-5 text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">{certificate.title}</h3>
                            <p className="mt-5 text-base leading-7 text-text-secondary">{certificate.description}</p>
                            <p className="mt-2 font-mono text-sm text-text-muted">Nov 2025 – Jul 2026</p>
                          </div>
                          <a className="certificate-feature__action focus-ring interactive-cta mt-8 w-fit gap-3 self-end" href={certificate.href} target="_blank" rel="noopener noreferrer">View certificate <span aria-hidden="true">↗</span></a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button className="certificate-carousel__arrow certificate-carousel__arrow--next focus-ring" type="button" aria-label="Next certificate" onClick={() => showCertificate((activeIndex + 1) % certificates.length, 'next')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button>
            <div className="certificate-carousel__selectors" role="group" aria-label="Choose a certificate">
              {certificates.map((certificate, index) => <button className="certificate-carousel__selector focus-ring" type="button" key={certificate.id} aria-label={`Show ${certificate.selector}`} aria-pressed={activeIndex === index} onClick={() => showCertificate(index, index > activeIndex ? 'next' : 'previous')}><span aria-hidden="true" /></button>)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
