import type { Server } from 'node:net'
import { SMTPServer, type SMTPServerOptions } from 'smtp-server'
import { SmtpServerOptions } from './index.js'
import { InMemoryInbox } from './in-memory-inbox.js'
import { simpleParser } from 'mailparser'

export class InMemorySmtpServer {
  private readonly server: SMTPServer
  private readonly options: SmtpServerOptions
  private delegate: Server | 'not started' = 'not started'
  public readonly inbox = new InMemoryInbox()

  constructor(overrides: Partial<SmtpServerOptions>) {
    const inbox = this.inbox
    const port = overrides.port ?? 0
    this.options = {
      port,
    }

    const libraryOptions: SMTPServerOptions = {
      // disable STARTTLS to allow authentication in clear text mode
      logger: false,
      disabledCommands: ['STARTTLS', 'AUTH'],

      async onData(stream, _session, callback) {
        try {
          inbox.onReceive(await simpleParser(stream))
          callback()
        } catch (e) {
          if (e instanceof Error) {
            callback(e)
          } else {
            callback(new Error('unknown error'))
          }
        }
      },
    }
    this.server = new SMTPServer(libraryOptions)
    this.server.on('error', (err) => {
      console.log('Error %s', err.message)
    })
  }

  start() {
    this.delegate = this.server.listen(this.options.port)
  }

  port() {
    if (this.delegate === 'not started') {
      throw new Error('You have to server.start() first')
    }
    const address = this.delegate.address()
    if (address === null || typeof address === 'string') {
      throw new Error('no port information')
    }
    return address.port
  }

  stop() {
    this.server.close()
  }
}
