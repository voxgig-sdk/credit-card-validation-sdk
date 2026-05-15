# CreditCardValidation SDK exists test

require "minitest/autorun"
require_relative "../CreditCardValidation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CreditCardValidationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
