# ProjectName SDK exists test

import pytest
from creditcardvalidation_sdk import CreditCardValidationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CreditCardValidationSDK.test(None, None)
        assert testsdk is not None
