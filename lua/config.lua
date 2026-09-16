-- CreditCardValidation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CreditCardValidation",
      slug = "credit-card-validation",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://arielservices.ct.ws",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["validation"] = {},
      },
    },
    entity = {
      ["validation"] = {
        ["fields"] = {
          {
            ["name"] = "cardNumber",
            ["short"] = "Masked credit card number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cardType",
            ["short"] = "Type of credit card (Visa, MasterCard, American Express, etc.)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "expirationValid",
            ["short"] = "Indicates whether the expiration date is valid and not expired",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "luhnCheck",
            ["short"] = "Result of Luhn algorithm validation",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["short"] = "Additional information or error message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
            ["short"] = "Indicates whether the credit card is valid",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "validation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "4532015112830366",
                      ["kind"] = "query",
                      ["name"] = "cc",
                      ["orig"] = "cc",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "123",
                      ["kind"] = "query",
                      ["name"] = "cvv",
                      ["orig"] = "cvv",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "12/25",
                      ["kind"] = "query",
                      ["name"] = "exp",
                      ["orig"] = "exp",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/stripe.php",
                ["segments"] = {
                  {
                    ["lit"] = "stripe.php",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "cc",
                    "cvv",
                    "exp",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "stripe.php",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
