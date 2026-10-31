import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/', '.astro/', '.hallmark/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Includes the jsx-a11y accessibility rules for .astro templates.
  ...astro.configs['jsx-a11y-recommended'],
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
