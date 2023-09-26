import { ensureEmail } from './shared.js'
import { ChaiPlugin } from './types.js'

export interface EmailSubject extends Chai.Assertion {
  (text: string, message?: string): Chai.Assertion
}

export const ChaiEmailSubject: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion

  function assertTo(this: Chai.AssertionStatic, expectedTo: string, message?: string) {
    const actual = this._obj
    ensureEmail(this, utils, actual)

    const ssfi = utils.flag(this, 'ssfi')
    const subject = actual.subject
    const assertTo = new Assertion(subject, message, ssfi, true)
    utils.transferFlags(this, assertTo, false)
    assertTo.eq(expectedTo)
  }
  Assertion.addChainableMethod('subject', assertTo)
}
