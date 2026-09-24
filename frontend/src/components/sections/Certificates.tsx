import certificateImage from '../../assets/certificates/depi-certificate.webp'
import { site } from '../../app/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Certificates() {
  return (
    <section id="certificates" data-scroll-anchor data-reveal data-chapter="05" className="certificates-section chapter-section border-b border-border/80 py-16 sm:py-24 lg:py-28" aria-labelledby="certificates-title">
      <Container>
        <SectionHeading id="certificates-title" eyebrow="CERTIFICATES" title="Verified learning, applied in practice." />
        <div className="certificate-feature mt-12 grid overflow-hidden border border-border lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="certificate-feature__visual min-w-0" data-reveal-item data-reveal-order={0}>
            <img
              src={certificateImage}
              alt="DEPI Certificate of Achievement awarded to Ahmed Mohammed Saad Ahmed for the Full Stack .NET Web Developer track"
              width={1536}
              height={1024}
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="certificate-feature__content flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10" data-reveal-item data-reveal-order={1}>
            <p className="font-mono text-xs tracking-[0.15em] text-cyan">DEPI · CERTIFICATE OF ACHIEVEMENT</p>
            <h3 className="mt-5 text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">Digital Egypt Pioneers Initiative (DEPI)</h3>
            <p className="mt-5 text-base leading-7 text-text-secondary">Full Stack .NET Web Developer track</p>
            <p className="mt-2 font-mono text-sm text-text-muted">Nov 2025 – Jul 2026</p>
            <a
              className="button-primary focus-ring interactive-cta mt-8 w-fit gap-3"
              href={site.links.certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View certificate <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
