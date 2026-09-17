
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


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
          "short": "Masked credit card number",
          "type": "`$STRING`"
        },
        {
          "name": "cardType",
          "short": "Type of credit card (Visa, MasterCard, American Express, etc.)",
          "type": "`$STRING`"
        },
        {
          "name": "expirationValid",
          "short": "Indicates whether the expiration date is valid and not expired",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "luhnCheck",
          "short": "Result of Luhn algorithm validation",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "message",
          "short": "Additional information or error message",
          "type": "`$STRING`"
        },
        {
          "name": "valid",
          "short": "Indicates whether the credit card is valid",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "validation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "4532015112830366",
                    "kind": "query",
                    "name": "cc",
                    "orig": "cc",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "123",
                    "kind": "query",
                    "name": "cvv",
                    "orig": "cvv",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "12/25",
                    "kind": "query",
                    "name": "exp",
                    "orig": "exp",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/stripe.php",
              "segments": [
                {
                  "lit": "stripe.php"
                }
              ],
              "select": {
                "exist": [
                  "cc",
                  "cvv",
                  "exp"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "stripe.php"
              ]
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

