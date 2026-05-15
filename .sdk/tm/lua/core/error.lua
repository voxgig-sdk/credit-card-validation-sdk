-- CreditCardValidation SDK error

local CreditCardValidationError = {}
CreditCardValidationError.__index = CreditCardValidationError


function CreditCardValidationError.new(code, msg, ctx)
  local self = setmetatable({}, CreditCardValidationError)
  self.is_sdk_error = true
  self.sdk = "CreditCardValidation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CreditCardValidationError:error()
  return self.msg
end


function CreditCardValidationError:__tostring()
  return self.msg
end


return CreditCardValidationError
