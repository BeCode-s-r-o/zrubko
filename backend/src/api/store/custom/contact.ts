import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework"
import { INotificationModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as any
  const { name, email, message } = body

  if (!name || !email || !message) {
    res.status(400).json({
      message: 'Missing required fields',
    })
    return
  }

  const notificationModuleService: INotificationModuleService = req.scope.resolve(
    Modules.NOTIFICATION
  )

  try {
    await notificationModuleService.createNotifications({
      to: process.env.ADMIN_EMAIL!, // Make sure to set this in your .env
      channel: 'email',
      template: 'contact-form',
      data: {
        emailOptions: {
          subject: `New Contact Form Submission from ${name}`,
          replyTo: email,
        },
        name,
        email,
        message,
      }
    })

    res.status(200).json({
      message: 'Contact form submitted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to send contact form',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
} 