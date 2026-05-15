<?php
declare(strict_types=1);

// CreditCardValidation SDK configuration

class CreditCardValidationConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CreditCardValidation",
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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'name' => 'card_number',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'card_type',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'expiration_valid',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'luhn_check',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'message',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'valid',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'validation',
          'op' => [
            'load' => [
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
                        'active' => true,
                      ],
                      [
                        'example' => '123',
                        'kind' => 'query',
                        'name' => 'cvv',
                        'orig' => 'cvv',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '12/25',
                        'kind' => 'query',
                        'name' => 'exp',
                        'orig' => 'exp',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
