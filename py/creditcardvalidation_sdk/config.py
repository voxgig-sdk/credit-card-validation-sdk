# CreditCardValidation SDK configuration


def make_config():
    return {
        "main": {
            "name": "CreditCardValidation",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://arielservices.ct.ws",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "validation": {},
            },
        },
        "entity": {
      "validation": {
        "fields": [
          {
            "active": True,
            "name": "cardNumber",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "cardType",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "expirationValid",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "luhnCheck",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "message",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "valid",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 5,
          },
        ],
        "name": "validation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "4532015112830366",
                      "kind": "query",
                      "name": "cc",
                      "orig": "cc",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "123",
                      "kind": "query",
                      "name": "cvv",
                      "orig": "cvv",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "12/25",
                      "kind": "query",
                      "name": "exp",
                      "orig": "exp",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/stripe.php",
                "parts": [
                  "stripe.php",
                ],
                "select": {
                  "exist": [
                    "cc",
                    "cvv",
                    "exp",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
