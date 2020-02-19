module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 'tab'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
};
