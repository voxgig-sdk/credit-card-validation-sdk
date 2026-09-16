# CreditCardValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CreditCardValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      CreditCardValidationBaseFeature.new
    when "ratelimit"
      CreditCardValidationRatelimitFeature.new
    when "retry"
      CreditCardValidationRetryFeature.new
    when "test"
      CreditCardValidationTestFeature.new
    when "timeout"
      CreditCardValidationTimeoutFeature.new
    else
      CreditCardValidationBaseFeature.new
    end
  end
end
