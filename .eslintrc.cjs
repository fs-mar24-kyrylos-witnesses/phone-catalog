module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/jsx-uses-react': 'off', // No need to use React in scope with React 17+
    'react/react-in-jsx-scope': 'off', // No need to use React in scope with React 17+
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        tabWidth: 2,
        useTabs: false, // Use spaces instead of tabs
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
