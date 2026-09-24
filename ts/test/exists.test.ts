
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CreditCardValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CreditCardValidationSDK.test()
    equal(testsdk instanceof CreditCardValidationSDK, true,
      'CreditCardValidationSDK.test() must return a client synchronously')
  })

})
