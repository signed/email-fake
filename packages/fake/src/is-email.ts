import { Email } from './index.js'

export const isEmail = (email: any): email is Email => {
  const hasAttachments = 'attachments' in email && Array.isArray(email.attachments)
  const hasHeaders = 'headers' in email && email.headers instanceof Map
  const hasHeaderLines = 'headerLines' in email && Array.isArray(email.headerLines)
  return hasAttachments && hasHeaders && hasHeaderLines
}
