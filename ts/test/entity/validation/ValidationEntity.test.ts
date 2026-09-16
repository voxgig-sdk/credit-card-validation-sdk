

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CreditCardValidationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ValidationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CREDIT_CARD_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('CREDIT_CARD_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CreditCardValidationSDK.test()
    const ent = testsdk.Validation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CREDIT_CARD_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'validation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cardNumber","req":false,"short":"Masked credit card number","type":"`$STRING`","index$":0},{"active":true,"name":"cardType","req":false,"short":"Type of credit card (Visa, MasterCard, American Express, etc.)","type":"`$STRING`","index$":1},{"active":true,"name":"expirationValid","req":false,"short":"Indicates whether the expiration date is valid and not expired","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"luhnCheck","req":false,"short":"Result of Luhn algorithm validation","type":"`$BOOLEAN`","index$":3},{"active":true,"name":"message","req":false,"short":"Additional information or error message","type":"`$STRING`","index$":4},{"active":true,"name":"valid","req":false,"short":"Indicates whether the credit card is valid","type":"`$BOOLEAN`","index$":5}],"name":"validation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"4532015112830366","kind":"query","name":"cc","orig":"cc","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"123","kind":"query","name":"cvv","orig":"cvv","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"12/25","kind":"query","name":"exp","orig":"exp","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /stripe.php","json":"{\"operationId\":\"validateCreditCard\",\"parameters\":[{\"description\":\"Credit card number to validate\",\"in\":\"query\",\"name\":\"cc\",\"required\":true,\"schema\":{\"example\":\"4532015112830366\",\"pattern\":\"^[0-9]{13,19}$\",\"type\":\"string\"}},{\"description\":\"Expiration date in MM/YY or MM/YYYY format\",\"in\":\"query\",\"name\":\"exp\",\"required\":false,\"schema\":{\"example\":\"12/25\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2}|[0-9]{4})$\",\"type\":\"string\"}},{\"description\":\"Card verification value (CVV/CVC)\",\"in\":\"query\",\"name\":\"cvv\",\"required\":false,\"schema\":{\"example\":\"123\",\"pattern\":\"^[0-9]{3,4}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"invalidCard\":{\"summary\":\"Invalid credit card response\",\"value\":{\"cardNumber\":\"****-****-****-1234\",\"cardType\":\"Unknown\",\"expirationValid\":false,\"luhnCheck\":false,\"message\":\"Credit card validation failed\",\"valid\":false}},\"validCard\":{\"summary\":\"Valid credit card response\",\"value\":{\"cardNumber\":\"****-****-****-0366\",\"cardType\":\"Visa\",\"expirationValid\":true,\"luhnCheck\":true,\"message\":\"Credit card is valid\",\"valid\":true}}},\"schema\":{\"properties\":{\"cardNumber\":{\"description\":\"Masked credit card number\",\"example\":\"****-****-****-0366\",\"type\":\"string\"},\"cardType\":{\"description\":\"Type of credit card (Visa, MasterCard, American Express, etc.)\",\"example\":\"Visa\",\"type\":\"string\"},\"expirationValid\":{\"description\":\"Indicates whether the expiration date is valid and not expired\",\"type\":\"boolean\"},\"luhnCheck\":{\"description\":\"Result of Luhn algorithm validation\",\"type\":\"boolean\"},\"message\":{\"description\":\"Additional information or error message\",\"type\":\"string\"},\"valid\":{\"description\":\"Indicates whether the credit card is valid\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful validation response\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Bad Request\",\"message\":\"Credit card number is required\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing the issue\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid input parameters\"},\"422\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Validation Error\",\"message\":\"Invalid credit card number format\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed validation error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unprocessable Entity - Invalid credit card format\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal Server Error\",\"message\":\"An unexpected error occurred while processing the request\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/stripe.php","segments":[{"lit":"stripe.php"}],"select":{"exist":["cc","cvv","exp"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"validation","name__orig":"validation","Name":"Validation","name_":"validation","name-":"validation","NAME":"VALIDATION","index$":0}, {"active":true,"entity":"validation","key$":"BasicValidationFlow","kind":"basic","name":"BasicValidationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"validation_ref01","srcdatavar":"validation_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validation_ref01"}}],"index$":0}]}, 'Validation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let validation_ref01_data = Object.values(setup.data.existing.validation)[0] as any

    // LOAD
    const validation_ref01_ent = client.Validation()
    const validation_ref01_match_dt0: any = {}
    const validation_ref01_data_dt0 = (await validation_ref01_ent.load(validation_ref01_match_dt0)).data()
    assert(null != validation_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/validation/ValidationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CreditCardValidationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['validation01','validation02','validation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CREDIT_CARD_VALIDATION_TEST_VALIDATION_ENTID': idmap,
    'CREDIT_CARD_VALIDATION_TEST_LIVE': 'FALSE',
    'CREDIT_CARD_VALIDATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CREDIT_CARD_VALIDATION_TEST_VALIDATION_ENTID']

  const live = 'TRUE' === env.CREDIT_CARD_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CREDIT_CARD_VALIDATION_TEST_VALIDATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CreditCardValidationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CREDIT_CARD_VALIDATION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
