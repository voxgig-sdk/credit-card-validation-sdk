<?php
declare(strict_types=1);

// CreditCardValidation SDK utility: result_headers

class CreditCardValidationResultHeaders
{
    public static function call(CreditCardValidationContext $ctx): ?CreditCardValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
