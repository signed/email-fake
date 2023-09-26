import { Email, Inbox } from './index.js'

export class InMemoryInbox implements Inbox {
  private readonly received: Email[] = []

  get emails() {
    return [...this.received]
  }

  singleEmail(): Email {
    if (this.received.length === 1) {
      return this.received[0]!
    }
    throw new Error(`there are ${this.received.length} received emails`)
  }

  clear(): void {
    this.received.length = 0
  }

  onReceive(email: Email) {
    this.received.push(email)
  }
}
