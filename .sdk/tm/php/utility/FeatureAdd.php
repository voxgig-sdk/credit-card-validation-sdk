<?php
declare(strict_types=1);

// CreditCardValidation SDK utility: feature_add

class CreditCardValidationFeatureAdd
{
    public static function call(CreditCardValidationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
