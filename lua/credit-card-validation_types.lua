-- Typed models for the CreditCardValidation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Validation
---@field card_number? string
---@field card_type? string
---@field expiration_valid? boolean
---@field luhn_check? boolean
---@field message? string
---@field valid? boolean

---@class ValidationLoadMatch
---@field card_number? string
---@field card_type? string
---@field expiration_valid? boolean
---@field luhn_check? boolean
---@field message? string
---@field valid? boolean

local M = {}

return M
