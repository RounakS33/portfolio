import { NextRequest, NextResponse } from 'next/server'
import { ContactFormData, ContactResponse } from '@/types/contact'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message }: ContactFormData = await req.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: 'Please fill in all fields'
      } as ContactResponse, { status: 400 })
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'singhrounak927@gmail.com', // Your email address
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    } as ContactResponse)

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    } as ContactResponse, { status: 500 })
  }
}

