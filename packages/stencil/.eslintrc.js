module.exports = {
  extends: ['plugin:@stencil-community/recommended'],
  overrides: [
    {
      files: ['*.spec*'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { '@typescript-eslint/no-unsafe-call': 'off', 'jest/prefer-expect-assertions': 'off' },
    },
  ],
  rules: {
    /*
      TODO: enable these, they're important
    */
    '@stencil-community/reserved-member-names': 'warn',
    '@stencil-community/decorators-style': 'warn',
    '@stencil-community/strict-mutable': 'warn',
    '@stencil-community/element-type': 'warn',
    // Ignore stencil JSX parser
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'h',
      },
    ],
  },
};
