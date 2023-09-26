// https://github.com/vitest-dev/vitest/blob/main/packages/expect/src/jest-extend.ts
import { ChaiEmailTo, type EmailTo } from './chai-email-to.js'
import { ChaiEmailFrom, EmailFrom } from './chai-email-from.js'
import { ChaiEmailSubject, EmailSubject } from './chai-email-subject.js'
import { ChaiEmailText, EmailText } from './chai-email-text.js'
import { ChaiPlugin } from './types.js'

declare global {
  namespace Chai {
    interface Assertion {
      from: EmailFrom
      to: EmailTo
      subject: EmailSubject
      text: EmailText
    }
  }
}

export const ChaiEmail: ChaiPlugin = function (chai, _utils) {
  chai.use(ChaiEmailTo)
  chai.use(ChaiEmailFrom)
  chai.use(ChaiEmailSubject)
  chai.use(ChaiEmailText)
}
