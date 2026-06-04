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
            "name": "card_number",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "card_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "expiration_valid",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "luhn_check",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "message",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "valid",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "validation",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "123",
                      "kind": "query",
                      "name": "cvv",
                      "orig": "cvv",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "12/25",
                      "kind": "query",
                      "name": "exp",
                      "orig": "exp",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
