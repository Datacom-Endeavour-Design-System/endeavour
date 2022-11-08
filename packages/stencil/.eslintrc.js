module.exports = {
  extends: ['plugin:@stencil/recommended'],
  overrides: [
    {
      files: ['*.spec*'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { '@typescript-eslint/no-unsafe-call': 'off', 'jest/prefer-expect-assertions': 'off' },
    },
  ],
  rules: {
    /* Broken rules because it's poorly maintained, see:
     * https://github.com/ionic-team/stencil-eslint/issues/4
     * https://github.com/ionic-team/stencil-eslint/issues/69 */
    '@stencil/decorators-context': 'off',
    '@stencil/own-methods-must-be-private': 'off',
    // Ignore stencil JSX parser
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'h',
      },
    ],
  },
};
