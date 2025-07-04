import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa/dist/types/router"
import type { 
  NotificationService 
} from "@medusajs/medusa"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    res.status(400).json({
      message: 'Missing required fields',
    })
    return
  }

  const notificationService: NotificationService = req.scope.resolve(
    'notificationService'
  )

  try {
    await notificationService.send({
      to: process.env.ADMIN_EMAIL!, // Make sure to set this in your .env
      template: 'contact-form',
      data: {
        name,
        email,
        message,
      },
      emailOptions: {
        subject: `New Contact Form Submission from ${name}`,
        replyTo: email,
      },
    })

    res.status(200).json({
      message: 'Contact form submitted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to send contact form',
      error: error.message,
    })
  }
} 