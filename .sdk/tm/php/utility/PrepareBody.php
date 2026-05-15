<?php
declare(strict_types=1);

// CreditCardValidation SDK utility: prepare_body

class CreditCardValidationPrepareBody
{
    public static function call(CreditCardValidationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
