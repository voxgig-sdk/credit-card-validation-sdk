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
            "slug": "credit-card-validation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Masked credit card number",
            "type": "`$STRING`",
          },
          {
            "name": "cardType",
            "short": "Type of credit card (Visa, MasterCard, American Express, etc.)",
            "type": "`$STRING`",
          },
          {
            "name": "expirationValid",
            "short": "Indicates whether the expiration date is valid and not expired",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "luhnCheck",
            "short": "Result of Luhn algorithm validation",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "short": "Additional information or error message",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "short": "Indicates whether the credit card is valid",
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
