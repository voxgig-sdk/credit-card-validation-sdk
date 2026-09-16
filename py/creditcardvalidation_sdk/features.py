# CreditCardValidation SDK feature factory

from creditcardvalidation_sdk.feature.base_feature import CreditCardValidationBaseFeature
from creditcardvalidation_sdk.feature.ratelimit_feature import CreditCardValidationRatelimitFeature
from creditcardvalidation_sdk.feature.retry_feature import CreditCardValidationRetryFeature
from creditcardvalidation_sdk.feature.test_feature import CreditCardValidationTestFeature
from creditcardvalidation_sdk.feature.timeout_feature import CreditCardValidationTimeoutFeature


_FEATURES = {
    "base": lambda: CreditCardValidationBaseFeature(),
    "ratelimit": lambda: CreditCardValidationRatelimitFeature(),
    "retry": lambda: CreditCardValidationRetryFeature(),
    "test": lambda: CreditCardValidationTestFeature(),
    "timeout": lambda: CreditCardValidationTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
