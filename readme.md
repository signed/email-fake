# email-fake

Want to test your email sending code down to the wire?
Don't want to rely on hard coded email accounts?
With [email-fake](./packages/fake) you can spin up a local smtp server in your tests to receive your emails.
Email-fake builds on top of [smtp-server](https://github.com/nodemailer/smtp-server) and [mailparser](https://github.com/nodemailer/mailparser) to process incoming email.
The technical details are hidden behind an [Inbox](./packages/fake/src/index.ts) abstraction.
To further ease testing and improve the readability of your tests there are some [chai assertions](./packages/chai) for common email properties.
With the [vitest integration](./packages/vitest) running a smtp server boils down to those few lines:

```typescript
import { test } from 'vitest'
import { setupSmtpServer } from '@fakes/email-vitest'

const smtpServer = setupSmtpServer()

test('send email', () => {
  // execute your mail sending code
  sendMail(smtpServer.port)
  const email = smtpServer.inbox.singleEmail()
  //assert the properties you care about
})
```
