# CreditCardValidation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "cardNumber",
            "type": "`$STRING`",
          },
          {
            "name": "cardType",
            "type": "`$STRING`",
          },
          {
            "name": "expirationValid",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "luhnCheck",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "type": "`$BOOLEAN`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "123",
                      "kind": "query",
                      "name": "cvv",
                      "orig": "cvv",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "12/25",
                      "kind": "query",
                      "name": "exp",
                      "orig": "exp",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
