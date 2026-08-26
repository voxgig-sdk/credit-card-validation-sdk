
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "parts": [
                "stripe.php"
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
  config
}

