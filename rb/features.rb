# CreditCardValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CreditCardValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      CreditCardValidationBaseFeature.new
    when "test"
      CreditCardValidationTestFeature.new
    else
      CreditCardValidationBaseFeature.new
    end
  end
end
