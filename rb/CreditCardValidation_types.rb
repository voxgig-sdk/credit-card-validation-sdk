# frozen_string_literal: true

# Typed models for the CreditCardValidation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Validation entity data model.
#
# @!attribute [rw] card_number
#   @return [String, nil]
#
# @!attribute [rw] card_type
#   @return [String, nil]
#
# @!attribute [rw] expiration_valid
#   @return [Boolean, nil]
#
# @!attribute [rw] luhn_check
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
Validation = Struct.new(
  :card_number,
  :card_type,
  :expiration_valid,
  :luhn_check,
  :message,
  :valid,
  keyword_init: true
)

# Match filter for Validation#load (any subset of Validation fields).
#
# @!attribute [rw] card_number
#   @return [String, nil]
#
# @!attribute [rw] card_type
#   @return [String, nil]
#
# @!attribute [rw] expiration_valid
#   @return [Boolean, nil]
#
# @!attribute [rw] luhn_check
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
ValidationLoadMatch = Struct.new(
  :card_number,
  :card_type,
  :expiration_valid,
  :luhn_check,
  :message,
  :valid,
  keyword_init: true
)

