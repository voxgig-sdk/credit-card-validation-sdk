# CreditCardValidation SDK utility: make_context

from projectname_sdk.core.context import CreditCardValidationContext


def make_context_util(ctxmap, basectx):
    return CreditCardValidationContext(ctxmap, basectx)
