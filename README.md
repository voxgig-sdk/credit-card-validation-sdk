# CreditCardValidation SDK

Check basic credit card details (number format and expiry) against client-side style validation rules

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Credit Card Validation API

The Credit Card Validation API is a small public endpoint hosted at [arielservices.ct.ws](https://arielservices.ct.ws) and catalogued on [freepublicapis.com](https://freepublicapis.com/credit-card-validation-api). It exposes a single validation operation intended to confirm that submitted card details are well-formed.

What the API checks:

- The card number format (length and digit pattern, typically a Luhn-style check).
- The expiration date.
- Other surface-level fields supplied with the card details.

This is a structural validation service. It does not contact card networks or issuing banks, so a successful response means the supplied details look syntactically valid, not that the card is active, in good standing, or authorised for a payment.

The public catalogue page reports low reliability for this endpoint (around a third of requests succeeding at the time of listing). No authentication, rate limit, or CORS policy is documented; expect the service to behave as a best-effort, unmetered public endpoint.

## Try it

**TypeScript**
```bash
npm install credit-card-validation
```

**Python**
```bash
pip install credit-card-validation-sdk
```

**PHP**
```bash
composer require voxgig/credit-card-validation-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/credit-card-validation-sdk/go
```

**Ruby**
```bash
gem install credit-card-validation-sdk
```

**Lua**
```bash
luarocks install credit-card-validation-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CreditCardValidationSDK } from 'credit-card-validation'

const client = new CreditCardValidationSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o credit-card-validation-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "credit-card-validation": {
      "command": "/abs/path/to/credit-card-validation-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Validation** | Credit card format and expiry checks performed by the single endpoint exposed at the API server root. | `/stripe.php` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from creditcardvalidation_sdk import CreditCardValidationSDK

client = CreditCardValidationSDK({})


# Load a specific validation
validation, err = client.Validation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'creditcardvalidation_sdk.php';

$client = new CreditCardValidationSDK([]);


// Load a specific validation
[$validation, $err] = $client->Validation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/credit-card-validation-sdk/go"

client := sdk.NewCreditCardValidationSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "CreditCardValidation_sdk"

client = CreditCardValidationSDK.new({})


# Load a specific validation
validation, err = client.Validation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("credit-card-validation_sdk")

local client = sdk.new({})


-- Load a specific validation
local validation, err = client:Validation(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CreditCardValidationSDK.test()
const result = await client.Validation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CreditCardValidationSDK.test(None, None)
result, err = client.Validation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CreditCardValidationSDK::test(null, null);
[$result, $err] = $client->Validation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Validation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CreditCardValidationSDK.test(nil, nil)
result, err = client.Validation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Validation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Credit Card Validation API

- Upstream: [https://arielservices.ct.ws](https://arielservices.ct.ws)

- No licence or terms of use are published for this API.
- The service is listed on freepublicapis.com without attribution or usage requirements.
- Treat results as format and sanity checks only, not as authoritative authorisation from a card network or issuer.

---

Generated from the Credit Card Validation API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
