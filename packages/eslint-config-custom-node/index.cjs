/** @type {import('eslint').Linter.Config} */
module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  extends: ['custom'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'class-methods-use-this': 'off',
    'dot-notation': 'off',
    'no-empty-function': 'off',
    'no-nested-ternary': 'off',
    'no-useless-constructor': 'off',
  },
  overrides: [
    {
      files: ['./*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['./*.*js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
