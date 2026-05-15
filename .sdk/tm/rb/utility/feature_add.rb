# CreditCardValidation SDK utility: feature_add
module CreditCardValidationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
