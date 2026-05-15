<?php
declare(strict_types=1);

// CreditCardValidation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CreditCardValidationMakeContext
{
    public static function call(array $ctxmap, ?CreditCardValidationContext $basectx): CreditCardValidationContext
    {
        return new CreditCardValidationContext($ctxmap, $basectx);
    }
}
