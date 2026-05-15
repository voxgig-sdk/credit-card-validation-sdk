package core

type CreditCardValidationError struct {
	IsCreditCardValidationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCreditCardValidationError(code string, msg string, ctx *Context) *CreditCardValidationError {
	return &CreditCardValidationError{
		IsCreditCardValidationError: true,
		Sdk:              "CreditCardValidation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CreditCardValidationError) Error() string {
	return e.Msg
}
