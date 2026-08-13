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
# @!attribute [rw] cardNumber
#   @return [String, nil]
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] expirationValid
#   @return [Boolean, nil]
#
# @!attribute [rw] luhnCheck
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
Validation = Struct.new(
  :cardNumber,
  :cardType,
  :expirationValid,
  :luhnCheck,
  :message,
  :valid,
  keyword_init: true
)

# Request payload for Validation#load.
#
# @!attribute [rw] cardNumber
#   @return [String, nil]
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] expirationValid
#   @return [Boolean, nil]
#
# @!attribute [rw] luhnCheck
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
ValidationLoadMatch = Struct.new(
  :cardNumber,
  :cardType,
  :expirationValid,
  :luhnCheck,
  :message,
  :valid,
  keyword_init: true
)

