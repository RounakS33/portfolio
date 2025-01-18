import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactFormData } from '@/types/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data: ContactFormData = await req.json()
    
    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email
    await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'singhrounak927@gmail.com',
      reply_to: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

