-- ProjectName SDK exists test

local sdk = require("credit-card-validation_sdk")

describe("CreditCardValidationSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
