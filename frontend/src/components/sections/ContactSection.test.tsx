import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ContactSection } from './ContactSection'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('contact section', () => {
  it('accepts input and submits the approved contact payload', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201 })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByLabelText('Name'), 'Ahmed Visitor')
    await user.type(screen.getByLabelText('Email'), 'visitor@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Project enquiry')
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a backend project with you.')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    await screen.findByText('Message saved successfully. Thank you — I’ll get back to you soon.')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const request = fetchMock.mock.calls[0][1] as RequestInit
    expect(JSON.parse(request.body as string)).toEqual({
      name: 'Ahmed Visitor',
      email: 'visitor@example.com',
      subject: 'Project enquiry',
      message: 'I would like to discuss a backend project with you.',
      website: '',
    })
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('keeps the entered message and reports an API failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByLabelText('Name'), 'Ahmed Visitor')
    await user.type(screen.getByLabelText('Email'), 'visitor@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Project enquiry')
    await user.type(screen.getByLabelText('Message'), 'I would like to discuss a backend project with you.')
    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    await waitFor(() => expect(screen.getByText(/could not be sent right now/i)).toBeInTheDocument())
    expect(screen.getByLabelText('Message')).toHaveValue('I would like to discuss a backend project with you.')
  })
})
