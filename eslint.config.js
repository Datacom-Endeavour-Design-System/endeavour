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
    // Stencil has it's own typescript config below
    ignores: ['**/packages/stencil/**'],
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
      // conflicts with the the smarter tsc version
      '@typescript-eslint/no-unused-vars': 'off',
      // Rules we don't like
      '@typescript-eslint/require-await': 'off',
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
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  // Stencil
  {
    files: ['**/stencil/src/**/*.{cjs,mjs,js,jsx,ts,tsx}'],
    plugins: {
      react: eslintPluginReact,
      '@stencil-community': stencilPlugin,
      '@typescript-eslint': typeScriptEsLintPlugin,
    },
    languageOptions: {
      parser: typeScriptEsLintParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...typeScriptEsLintPlugin.configs['eslint-recommended'].overrides?.[0]
        .rules,
      ...stencilPlugin.configs['base'].overrides[0].rules,
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
  // Jest
  {
    files: ['**/*.spec*'],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...eslintPluginJest.configs['recommended'].rules,
      '@typescript-eslint/no-unsafe-call': 'off',
      'jest/prefer-expect-assertions': 'off',
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
