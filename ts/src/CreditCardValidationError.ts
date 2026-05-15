
import { Context } from './Context'


class CreditCardValidationError extends Error {

  isCreditCardValidationError = true

  sdk = 'CreditCardValidation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CreditCardValidationError
}

