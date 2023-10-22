import type * as Chai from 'chai'
import type { use as chaiUse } from 'chai'

export type FirstFunctionArgument<T> = T extends (arg: infer A) => unknown ? A : never
export type ChaiPlugin = FirstFunctionArgument<typeof chaiUse>
export type ChaiUtils = (typeof Chai)['util']

declare global {
  module Chai {
    interface ChaiUtils {
      transferFlags(assertion: AssertionStatic, obj: object, includeAll?: boolean): void
    }
  }
}
