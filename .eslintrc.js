module.exports = {
  root: true,
  extends: ['plugin:promise/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'promise'],
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // Rules we don't like
        '@typescript-eslint/require-await': 'off',
        // Rules we like
        // TODO: resolve and set to error
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
      },
    },
  ],
  rules: {
    'promise/prefer-await-to-then': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',
  },
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: [
    'dist',
    'loader',
    'cypress',
    'www',
    'node_modules',
    'storybook-static',
    'examples',
    'stencil-generated',
  ],
};
