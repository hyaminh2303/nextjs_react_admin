module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  extends: [
    'prettier',
    'plugin:react/recommended', // Uses the recommended rules from 'eslint-plugin-react'
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from '@typescript-eslint/eslint-plugin'
    'plugin:prettier/recommended', // Enables 'eslint-plugin-prettier' and displays prettier errors as ESLint errors
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows parsing of JSX
    },
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
  },
  rules: {
    // Place your custom rules here
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable this rule if you prefer not to enforce typing for all exported functions
  },
};
