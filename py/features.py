# CreditCardValidation SDK feature factory

from feature.base_feature import CreditCardValidationBaseFeature
from feature.test_feature import CreditCardValidationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CreditCardValidationBaseFeature(),
        "test": lambda: CreditCardValidationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
