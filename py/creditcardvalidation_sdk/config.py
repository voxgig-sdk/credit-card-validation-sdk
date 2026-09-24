# CreditCardValidation SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Card Number",
            "type": "`$STRING`",
            "short": "Masked credit card number",
          },
          {
            "name": "cardType",
            "title": "Card Type",
            "type": "`$STRING`",
            "short": "Type of credit card (Visa, MasterCard, American Express, etc.)",
          },
          {
            "name": "expirationValid",
            "title": "Expiration Valid",
            "type": "`$BOOLEAN`",
            "short": "Indicates whether the expiration date is valid and not expired",
          },
          {
            "name": "luhnCheck",
            "title": "Luhn Check",
            "type": "`$BOOLEAN`",
            "short": "Result of Luhn algorithm validation",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "Additional information or error message",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
            "short": "Indicates whether the credit card is valid",
          },
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
                    "lit": "stripe.php",
                  },
                ],
                "parts": [
                  "stripe.php",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cc",
                      "orig": "cc",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "4532015112830366",
                    },
                    {
                      "name": "cvv",
                      "orig": "cvv",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "123",
                    },
                    {
                      "name": "exp",
                      "orig": "exp",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "12/25",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "cc",
                    "cvv",
                    "exp",
                  ],
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
