module.exports = {
  parser: '@typescript-eslint/parser',
  // settings: {
  //   'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx'],
  //   },
  // },
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    // extraFileExtensions: ['.cjs'],
    ecmaVersion: 10,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  root: true,
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'comma-dangle': 'off',
    // 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    // 'sort-imports': [
    //   'warn',
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: true,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //     allowSeparatedGroups: false,
    //   },
    // ],
  },
};
