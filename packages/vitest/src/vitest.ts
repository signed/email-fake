import { afterEach, beforeEach } from 'vitest'
import { type Inbox, type SmtpServer, type SmtpServerOptions, InMemorySmtpServer } from '@fakes/email'

export const setupSmtpServer = (options: Partial<SmtpServerOptions> = {}): SmtpServer => {
  let smtpServer: InMemorySmtpServer | 'not started' = 'not started'

  beforeEach(() => {
    smtpServer = new InMemorySmtpServer(options)
    smtpServer.start()
  })

  afterEach(() => {
    if (smtpServer === 'not started') {
      return
    }
    smtpServer.stop()
    smtpServer = 'not started'
  })

  return new (class implements SmtpServer {
    get inbox(): Inbox {
      if (smtpServer === 'not started') {
        throw new Error('smtp server not started yet')
      }
      return smtpServer.inbox
    }

    get port() {
      if (smtpServer === 'not started') {
        throw new Error('smtp server not started yet')
      }
      return smtpServer.port()
    }
  })()
}
