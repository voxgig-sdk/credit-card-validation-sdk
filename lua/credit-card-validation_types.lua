-- Typed models for the CreditCardValidation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Validation
---@field cardNumber? string
---@field cardType? string
---@field expirationValid? boolean
---@field luhnCheck? boolean
---@field message? string
---@field valid? boolean

---@class ValidationLoadMatch
---@field cc string
---@field cvv? string
---@field exp? string

local M = {}

return M
