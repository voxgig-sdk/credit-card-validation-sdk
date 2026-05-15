<?php
declare(strict_types=1);

// CreditCardValidation SDK base feature

class CreditCardValidationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CreditCardValidationContext $ctx, array $options): void {}
    public function PostConstruct(CreditCardValidationContext $ctx): void {}
    public function PostConstructEntity(CreditCardValidationContext $ctx): void {}
    public function SetData(CreditCardValidationContext $ctx): void {}
    public function GetData(CreditCardValidationContext $ctx): void {}
    public function GetMatch(CreditCardValidationContext $ctx): void {}
    public function SetMatch(CreditCardValidationContext $ctx): void {}
    public function PrePoint(CreditCardValidationContext $ctx): void {}
    public function PreSpec(CreditCardValidationContext $ctx): void {}
    public function PreRequest(CreditCardValidationContext $ctx): void {}
    public function PreResponse(CreditCardValidationContext $ctx): void {}
    public function PreResult(CreditCardValidationContext $ctx): void {}
    public function PreDone(CreditCardValidationContext $ctx): void {}
    public function PreUnexpected(CreditCardValidationContext $ctx): void {}
}
