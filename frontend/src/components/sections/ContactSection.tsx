import { useState, type FormEvent } from 'react'

import { apiUrl } from '../../app/api'
import { site } from '../../app/site'
import { SectionAtmosphere } from '../motion/SectionAtmosphere'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const contactLinks = [
  ['Email', site.email, `mailto:${site.email}`],
  ['LinkedIn', 'Let’s connect', site.links.linkedin],
  ['GitHub', 'AhmedSaad-EGY', site.links.github],
  ['WhatsApp', 'Direct message', site.links.whatsapp],
] as const

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) {
      return
    }

    const fields = new FormData(form)
    setStatus('sending')

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/problem+json, application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          subject: fields.get('subject'),
          message: fields.get('message'),
          website: fields.get('website'),
        }),
      })

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`)
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" data-scroll-anchor data-reveal data-chapter="06" className="contact-section chapter-section border-t border-border/80 py-16 sm:py-24 lg:py-28" aria-labelledby="contact-title">
      <SectionAtmosphere scene="contact" />
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(26rem,1fr)] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="CONTACT"
            title="Let’s Build Something Reliable."
            description="Open to Backend .NET Developer opportunities, software engineering collaborations, and backend-focused projects."
          />
          <ul className="contact-links mt-10">
            {contactLinks.map(([label, value, href], index) => (
              <li key={label} data-reveal-item data-reveal-order={index}>
                <a className="focus-ring" href={href}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="contact-form"
          aria-describedby="contact-form-status"
          data-reveal-item
          data-reveal-order={2}
          data-pointer-surface
          onChange={() => status !== 'sending' && setStatus('idle')}
          onSubmit={handleSubmit}
        >
          <div className="contact-form__header">
            <span>PROJECT ENQUIRY</span>
            <span>{status === 'sending' ? 'SENDING' : 'READY FOR INPUT'}</span>
          </div>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Name
              <input className="field" type="text" name="name" autoComplete="name" maxLength={120} required disabled={status === 'sending'} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Email
              <input className="field" type="email" name="email" autoComplete="email" maxLength={254} required disabled={status === 'sending'} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Subject
              <input className="field" type="text" name="subject" maxLength={160} required disabled={status === 'sending'} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-text-primary">
              Message
              <textarea className="field min-h-32 resize-y" name="message" minLength={20} maxLength={4000} required disabled={status === 'sending'} />
            </label>
            <label className="sr-only">
              Website
              <input type="text" name="website" autoComplete="off" tabIndex={-1} />
            </label>
            <button className="button-primary interactive-cta" data-magnetic type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            <p id="contact-form-status" className="contact-form__status text-sm leading-6 text-text-muted" aria-live="polite" data-status={status}>
              {status === 'success' && 'Message saved successfully. Thank you — I’ll get back to you soon.'}
              {status === 'error' && 'The message could not be sent right now. Please try again or use one of the direct contact methods.'}
              {status === 'idle' && 'Share your project details and I’ll get back to you soon.'}
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
