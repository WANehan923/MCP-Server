module.exports = {
  extends: ['next'],
  rules: {
    // Disable all rules
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  ignorePatterns: ['**/*'],
};