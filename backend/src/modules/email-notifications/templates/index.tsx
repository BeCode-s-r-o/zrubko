import { ReactNode } from 'react'
import { MedusaError } from '@medusajs/framework/utils'
import { InviteUserEmail, INVITE_USER, isInviteUserData } from './invite-user'
import { OrderPlacedTemplate, ORDER_PLACED, isOrderPlacedTemplateData } from './order-placed'
import { ContactFormEmail, ContactFormEmailData } from './contact-form'

export const EmailTemplates = {
  INVITE_USER,
  ORDER_PLACED,
  CONTACT_FORM: 'contact-form'
} as const

export type EmailTemplateType = keyof typeof EmailTemplates

function isContactFormData(data: unknown): data is ContactFormEmailData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'email' in data &&
    'message' in data &&
    typeof (data as any).name === 'string' &&
    typeof (data as any).email === 'string' &&
    typeof (data as any).message === 'string'
  )
}

export function generateEmailTemplate(templateKey: string, data: unknown): ReactNode {
  switch (templateKey) {
    case EmailTemplates.INVITE_USER:
      if (!isInviteUserData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.INVITE_USER}"`
        )
      }
      return <InviteUserEmail {...data} />

    case EmailTemplates.ORDER_PLACED:
      if (!isOrderPlacedTemplateData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.ORDER_PLACED}"`
        )
      }
      return <OrderPlacedTemplate {...data} />

    case EmailTemplates.CONTACT_FORM:
      if (!isContactFormData(data)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Invalid data for template "${EmailTemplates.CONTACT_FORM}"`
        )
      }
      return <ContactFormEmail data={data} />

    default:
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Unknown template key: "${templateKey}"`
      )
  }
}

export { InviteUserEmail, OrderPlacedTemplate }
