import { Base } from './base'

export interface ContactFormEmailData {
  name: string
  email: string
  message: string
}

export const ContactFormEmail = ({
  data,
}: {
  data: ContactFormEmailData
}) => {
  return (
    <Base preview="New Contact Form Submission">
      <h2>New Contact Form Submission</h2>
      <div style={{ marginTop: '24px' }}>
        <p><strong>From:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p style={{ marginTop: '24px' }}><strong>Message:</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.message}</p>
      </div>
    </Base>
  )
} 