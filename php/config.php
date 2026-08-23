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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'Masked credit card number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cardType',
              'short' => 'Type of credit card (Visa, MasterCard, American Express, etc.)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expirationValid',
              'short' => 'Indicates whether the expiration date is valid and not expired',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'luhnCheck',
              'short' => 'Result of Luhn algorithm validation',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'message',
              'short' => 'Additional information or error message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'short' => 'Indicates whether the credit card is valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'validation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '4532015112830366',
                        'kind' => 'query',
                        'name' => 'cc',
                        'orig' => 'cc',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '123',
                        'kind' => 'query',
                        'name' => 'cvv',
                        'orig' => 'cvv',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '12/25',
                        'kind' => 'query',
                        'name' => 'exp',
                        'orig' => 'exp',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stripe.php',
                  'parts' => [
                    'stripe.php',
                  ],
                  'select' => [
                    'exist' => [
                      'cc',
                      'cvv',
                      'exp',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
