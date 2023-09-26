import { describe, test, expect, beforeEach } from 'vitest'
import { AssertionError } from 'chai'
import * as Chai from 'chai'
import { ChaiEmail } from '@fakes/email-chai'
import { setupSmtpServer } from './vitest.js'
import * as nodemailer from 'nodemailer'
import type { SendMailOptions } from 'nodemailer'
import { type Email } from '@fakes/email'

Chai.use(ChaiEmail)

const smtpServer = setupSmtpServer()

describe('basic mail', () => {
  let email: Email
  beforeEach(async () => {
    await sendMessage({
      from: 'sender@example.org',
      to: 'recipient@example.org',
      subject: 'Hello World!',
      text: 'How are you doing',
    })
    email = smtpServer.inbox.singleEmail()
  })

  test('from', () => {
    expect(email).from('sender@example.org')
    expect(email).not.from('bogus@example.org')

    expect(() => expect({}).from('stand in')).throw(AssertionError)
    expect(() => expect({}).not.from('stand in')).throw(AssertionError)
  })

  test('to', () => {
    expect(email).to('recipient@example.org')
    expect(email).not.to('bogus@example.org')
  })

  test('subject', () => {
    expect(email).with.subject('Hello World!')
    expect(email).not.with.subject('Bogus Subject')
  })

  test('text', () => {
    expect(email).with.text('How are you doing\n')
    expect(email).not.with.text('Bogus Text')
  })
})

const sendMessage = async (options: SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: smtpServer.port,
  })

  await transporter.sendMail(options)
}
