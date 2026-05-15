<?php
declare(strict_types=1);

// CreditCardValidation SDK utility: result_body

class CreditCardValidationResultBody
{
    public static function call(CreditCardValidationContext $ctx): ?CreditCardValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
