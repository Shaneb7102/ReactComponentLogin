module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
      tsconfigRootDir: __dirname,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // You can add more rules that align with your noUnusedLocals and other strict settings
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignorePatterns: ['dist', 'node_modules', '**/*.config.js', '**/*.config.ts'],
  };