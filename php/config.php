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
              'active' => true,
              'name' => 'card_number',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'card_type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'expiration_valid',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'luhn_check',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'message',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'valid',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 5,
            ],
          ],
          'name' => 'validation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => '4532015112830366',
                        'kind' => 'query',
                        'name' => 'cc',
                        'orig' => 'cc',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '123',
                        'kind' => 'query',
                        'name' => 'cvv',
                        'orig' => 'cvv',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '12/25',
                        'kind' => 'query',
                        'name' => 'exp',
                        'orig' => 'exp',
                        'reqd' => false,
                        'type' => '`$STRING`',
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
                  'index$' => 0,
                ],
              ],
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
