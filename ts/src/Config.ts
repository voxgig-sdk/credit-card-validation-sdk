
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CreditCardValidation',
        slug: "credit-card-validation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://arielservices.ct.ws",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        validation: {
        },
  
    }
  }


  entity = {
    "validation": {
      "fields": [
        {
          "name": "cardNumber",
          "title": "Card Number",
          "type": "`$STRING`",
          "short": "Masked credit card number"
        },
        {
          "name": "cardType",
          "title": "Card Type",
          "type": "`$STRING`",
          "short": "Type of credit card (Visa, MasterCard, American Express, etc.)"
        },
        {
          "name": "expirationValid",
          "title": "Expiration Valid",
          "type": "`$BOOLEAN`",
          "short": "Indicates whether the expiration date is valid and not expired"
        },
        {
          "name": "luhnCheck",
          "title": "Luhn Check",
          "type": "`$BOOLEAN`",
          "short": "Result of Luhn algorithm validation"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "short": "Additional information or error message"
        },
        {
          "name": "valid",
          "title": "Valid",
          "type": "`$BOOLEAN`",
          "short": "Indicates whether the credit card is valid"
        }
      ],
      "name": "validation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stripe.php",
              "segments": [
                {
                  "lit": "stripe.php"
                }
              ],
              "parts": [
                "stripe.php"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "cc",
                    "orig": "cc",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "4532015112830366"
                  },
                  {
                    "name": "cvv",
                    "orig": "cvv",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "123"
                  },
                  {
                    "name": "exp",
                    "orig": "exp",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "12/25"
                  }
                ]
              },
              "select": {
                "exist": [
                  "cc",
                  "cvv",
                  "exp"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

