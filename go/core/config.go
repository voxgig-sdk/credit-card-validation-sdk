package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CreditCardValidation",
			"slug": "credit-card-validation",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://arielservices.ct.ws",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"validation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"validation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardNumber",
						"short": "Masked credit card number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardType",
						"short": "Type of credit card (Visa, MasterCard, American Express, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expirationValid",
						"short": "Indicates whether the expiration date is valid and not expired",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "luhnCheck",
						"short": "Result of Luhn algorithm validation",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"short": "Additional information or error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"short": "Indicates whether the credit card is valid",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "validation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "4532015112830366",
											"kind": "query",
											"name": "cc",
											"orig": "cc",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "123",
											"kind": "query",
											"name": "cvv",
											"orig": "cvv",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "12/25",
											"kind": "query",
											"name": "exp",
											"orig": "exp",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/stripe.php",
								"parts": []any{
									"stripe.php",
								},
								"select": map[string]any{
									"exist": []any{
										"cc",
										"cvv",
										"exp",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
