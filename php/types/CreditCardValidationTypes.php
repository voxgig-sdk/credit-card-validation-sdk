<?php
declare(strict_types=1);

// Typed models for the CreditCardValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Validation entity data model. */
class Validation
{
    public ?string $card_number = null;
    public ?string $card_type = null;
    public ?bool $expiration_valid = null;
    public ?bool $luhn_check = null;
    public ?string $message = null;
    public ?bool $valid = null;
}

/** Match filter for Validation#load (any subset of Validation fields). */
class ValidationLoadMatch
{
    public ?string $card_number = null;
    public ?string $card_type = null;
    public ?bool $expiration_valid = null;
    public ?bool $luhn_check = null;
    public ?string $message = null;
    public ?bool $valid = null;
}

