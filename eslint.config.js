import eslint from '@eslint/js';
import globals from 'globals';

import * as stencilPlugin from '@stencil-community/eslint-plugin';
import typeScriptEsLintPlugin from '@typescript-eslint/eslint-plugin';
import typeScriptEsLintParser from '@typescript-eslint/parser';

import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  eslint.configs.recommended,
  // Global ignores
  {
    ignores: [
      '**/dist/**',
      //'loader',
      '**/storybook/cypress/**',
      '**/stencil/www/**',
      '**/node_modules/**',
      '**/storybook/storybook-static/**',
      //'examples',
      '**/stencil-generated/**',
    ],
  },
  // Typescript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typeScriptEsLintParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: true,
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typeScriptEsLintPlugin,
    },
    rules: {
      ...typeScriptEsLintPlugin.configs['eslint-recommended'].overrides?.[0]
        .rules,
      ...typeScriptEsLintPlugin.configs['recommended-requiring-type-checking']
        .rules,
      // Rules we like
      // TODO: resolve and set to error
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      // Rules we don't like
      '@typescript-eslint/require-await': 'off',
      // conflicts with the the smarter tsc version
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Import order and promise preferences
  {
    files: ['**/*.{cjs,mjs,js,jsx,ts,tsx}'],
    plugins: {
      eslintPluginImport,
      promise: eslintPluginPromise,
    },
    rules: {
      'promise/prefer-await-to-then': 'warn',
      'promise/prefer-await-to-callbacks': 'warn',
    },
  },
  // React
  {
    files: [
      '**/react/src/*.{cjs,mjs,ts,js,jsx,tsx}',
      '**/storybook/src/*.{cjs,mjs,ts,js,jsx,tsx}',
    ],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  // Jest
  {
    files: ['**/*.spec*'],
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      ...eslintPluginJest.configs['recommended'].rules,
      '@typescript-eslint/no-unsafe-call': 'off',
      'jest/prefer-expect-assertions': 'off',
    },
  },
  // Stencil
  {
    files: ['**/stencil/src/**/*.{cjs,mjs,js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typeScriptEsLintParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: true,
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      '@stencil-community': stencilPlugin,
      '@typescript-eslint': typeScriptEsLintPlugin,
    },
    rules: {
      ...stencilPlugin.configs['base'].rules,
      ...stencilPlugin.configs['recommended'].rules,
      // Ignore stencil JSX parser
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'h',
        },
      ],
      // TODO: enable these, they're important
      '@stencil-community/reserved-member-names': 'warn',
      '@stencil-community/decorators-style': 'warn',
      '@stencil-community/strict-mutable': 'warn',
      '@stencil-community/element-type': 'warn',
      '@stencil-community/own-methods-must-be-private': 'warn',
    },
  },
  // Global rule dissable overides
  {
    rules: {
      'no-extra-boolean-cast': 'off',
    },
  },
  // Prettier overrides must be last
  eslintConfigPrettier,
];
