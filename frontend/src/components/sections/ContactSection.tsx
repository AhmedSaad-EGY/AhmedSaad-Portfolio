import { site } from '../../app/site'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const contactLinks = [
  ['Email', site.email, `mailto:${site.email}`],
  ['LinkedIn', 'Professional profile', site.links.linkedin],
  ['GitHub', 'AhmedSaad-EGY', site.links.github],
  ['WhatsApp', 'Direct message', site.links.whatsapp],
] as const

export function ContactSection() {
  return (
    <section id="contact" className="contact-section scroll-mt-20 border-t border-border/80 py-20 sm:py-24 lg:py-28" aria-labelledby="contact-title">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(26rem,1fr)] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="CONTACT"
            title="Let’s Build Something Reliable."
            description="Open to Backend .NET Developer opportunities, software engineering collaborations, and backend-focused projects."
          />
          <ul className="contact-links mt-10">
            {contactLinks.map(([label, value, href]) => (
              <li key={label}>
                <a className="focus-ring" href={href}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form className="contact-form" aria-describedby="contact-unavailable-note">
          <div className="contact-form__header">
            <span>PROJECT ENQUIRY</span>
            <span>FORM OFFLINE</span>
          </div>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Name
              <input className="field" type="text" name="name" autoComplete="name" disabled />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Email
              <input className="field" type="email" name="email" autoComplete="email" disabled />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Subject
              <input className="field" type="text" name="subject" disabled />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Message
              <textarea className="field min-h-32 resize-y" name="message" disabled />
            </label>
            <button className="button-disabled" type="button" disabled>
              Send Message
            </button>
            <p id="contact-unavailable-note" className="text-sm leading-6 text-text-muted">
              Form delivery will be enabled after backend integration. Please use one of the direct contact methods above.
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
