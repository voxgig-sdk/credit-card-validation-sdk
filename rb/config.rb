# CreditCardValidation SDK configuration

module CreditCardValidationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CreditCardValidation",
        "slug" => "credit-card-validation",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://arielservices.ct.ws",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "validation" => {},
        },
      },
      "entity" => {
        "validation" => {
          "fields" => [
            {
              "name" => "cardNumber",
              "short" => "Masked credit card number",
              "type" => "`$STRING`",
            },
            {
              "name" => "cardType",
              "short" => "Type of credit card (Visa, MasterCard, American Express, etc.)",
              "type" => "`$STRING`",
            },
            {
              "name" => "expirationValid",
              "short" => "Indicates whether the expiration date is valid and not expired",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "luhnCheck",
              "short" => "Result of Luhn algorithm validation",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "message",
              "short" => "Additional information or error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "valid",
              "short" => "Indicates whether the credit card is valid",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "validation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "4532015112830366",
                        "kind" => "query",
                        "name" => "cc",
                        "orig" => "cc",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "123",
                        "kind" => "query",
                        "name" => "cvv",
                        "orig" => "cvv",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "12/25",
                        "kind" => "query",
                        "name" => "exp",
                        "orig" => "exp",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stripe.php",
                  "segments" => [
                    {
                      "lit" => "stripe.php",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cc",
                      "cvv",
                      "exp",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "stripe.php",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CreditCardValidationFeatures.make_feature(name)
  end
end
