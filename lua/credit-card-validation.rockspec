package = "voxgig-sdk-credit-card-validation"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/credit-card-validation-sdk.git"
}
description = {
  summary = "CreditCardValidation SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["credit-card-validation_sdk"] = "credit-card-validation_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
