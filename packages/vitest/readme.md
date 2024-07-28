```typescript
import { expect, test } from 'vitest'
import { setupSmtpServer } from '@fakes/email-vitest'
import * as nodemailer from 'nodemailer'
import * as Chai from 'chai'
import { ChaiEmail } from '@fakes/email-chai'

Chai.use(ChaiEmail)

const smtpServer = setupSmtpServer()

test('sender', async () => {
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: smtpServer.port,
  })
  await transporter.sendMail({
    from: 'sender@example.org',
    to: 'recipient@example.org',
    subject: 'Hello World!',
    text: 'How are you doing',
  })
  const email = smtpServer.inbox.singleEmail()
  expect(email).from('sender@example.org')
})
```
