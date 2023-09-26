import { AssertionError } from 'chai'
import { ensureEmail } from './shared.js'
import { ChaiPlugin } from './types.js'

export interface EmailFrom {
  (address: string, message?: string): Chai.Assertion
}

export const ChaiEmailFrom: ChaiPlugin = function (chai, utils) {
  const Assertion = chai.Assertion
  Assertion.addMethod('from', function (expectedFrom: string, message?: string) {
    const actual = this._obj
    const ssfi = utils.flag(this, 'ssfi')

    ensureEmail(this, utils, actual)

    const from = actual.from
    if (from === undefined) {
      throw new AssertionError('not implemented, to undefined')
    } else if (Array.isArray(from)) {
      throw new AssertionError('not implemented, to is an array')
    } else {
      const assertTo = new Assertion(from.text, message, ssfi, true)
      utils.transferFlags(this, assertTo, false)
      assertTo.eq(expectedFrom)
    }
  })
}
