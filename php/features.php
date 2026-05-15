<?php
declare(strict_types=1);

// CreditCardValidation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CreditCardValidationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CreditCardValidationBaseFeature();
            case "test":
                return new CreditCardValidationTestFeature();
            default:
                return new CreditCardValidationBaseFeature();
        }
    }
}
