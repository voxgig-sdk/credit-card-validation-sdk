
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CreditCardValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CreditCardValidationSDK.test()
    equal(null !== testsdk, true)
  })

})
