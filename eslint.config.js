import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        __APP_VERSION__: 'readonly',
        __BUILD_STORYBOOK__: 'readonly',
        __BUILD_DOCS__: 'readonly',
        __TEST_COVERAGE__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',

      // General rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      'dist/',
      'lib/',
      'node_modules/',
      '**/*.config.*',
      '**/*.d.ts',
      '**/stories/**',
    ],
  },
  {
    files: ['combine-files.js'],
    rules: {
      'no-console': 'off',
    },
  },
];
