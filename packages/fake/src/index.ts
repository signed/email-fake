import { ParsedMail } from 'mailparser'

export type Port = number
export type SmtpServerOptions = {
  port: Port
}

export { InMemorySmtpServer } from './in-memory-smtp-server.js'

export type Email = ParsedMail

export interface Inbox {
  readonly emails: Email[]

  singleEmail(): Email

  clear(): void
}

export type SmtpServer = {
  readonly port: number
  readonly inbox: Inbox
}

export { isEmail } from './is-email.js'
