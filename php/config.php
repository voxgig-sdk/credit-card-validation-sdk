<?php
declare(strict_types=1);

// CreditCardValidation SDK configuration

class CreditCardValidationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CreditCardValidation",
                "slug" => "credit-card-validation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://arielservices.ct.ws",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "validation" => [],
                ],
            ],
            "entity" => [
        'validation' => [
          'fields' => [
            [
              'name' => 'cardNumber',
              'title' => 'Card Number',
              'type' => '`$STRING`',
              'short' => 'Masked credit card number',
            ],
            [
              'name' => 'cardType',
              'title' => 'Card Type',
              'type' => '`$STRING`',
              'short' => 'Type of credit card (Visa, MasterCard, American Express, etc.)',
            ],
            [
              'name' => 'expirationValid',
              'title' => 'Expiration Valid',
              'type' => '`$BOOLEAN`',
              'short' => 'Indicates whether the expiration date is valid and not expired',
            ],
            [
              'name' => 'luhnCheck',
              'title' => 'Luhn Check',
              'type' => '`$BOOLEAN`',
              'short' => 'Result of Luhn algorithm validation',
            ],
            [
              'name' => 'message',
              'title' => 'Message',
              'type' => '`$STRING`',
              'short' => 'Additional information or error message',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
              'short' => 'Indicates whether the credit card is valid',
            ],
          ],
          'name' => 'validation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stripe.php',
                  'segments' => [
                    [
                      'lit' => 'stripe.php',
                    ],
                  ],
                  'parts' => [
                    'stripe.php',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'cc',
                        'orig' => 'cc',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '4532015112830366',
                      ],
                      [
                        'name' => 'cvv',
                        'orig' => 'cvv',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '123',
                      ],
                      [
                        'name' => 'exp',
                        'orig' => 'exp',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '12/25',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'cc',
                      'cvv',
                      'exp',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CreditCardValidationFeatures::make_feature($name);
    }
}
