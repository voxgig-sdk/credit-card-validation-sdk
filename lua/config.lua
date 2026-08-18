-- CreditCardValidation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CreditCardValidation",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cardType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "expirationValid",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "luhnCheck",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
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
                ["parts"] = {
                  "stripe.php",
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
