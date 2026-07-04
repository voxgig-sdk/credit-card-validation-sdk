// Typed models for the CreditCardValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Validation {
  card_number?: string
  card_type?: string
  expiration_valid?: boolean
  luhn_check?: boolean
  message?: string
  valid?: boolean
}

export type ValidationLoadMatch = Partial<Validation>

