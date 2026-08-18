
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


  main = {
    name: 'CreditCardValidation',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "cardType",
          "type": "`$STRING`"
        },
        {
          "name": "expirationValid",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "luhnCheck",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "message",
          "type": "`$STRING`"
        },
        {
          "name": "valid",
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

