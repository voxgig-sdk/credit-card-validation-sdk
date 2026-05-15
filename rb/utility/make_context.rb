# CreditCardValidation SDK utility: make_context
require_relative '../core/context'
module CreditCardValidationUtilities
  MakeContext = ->(ctxmap, basectx) {
    CreditCardValidationContext.new(ctxmap, basectx)
  }
end
