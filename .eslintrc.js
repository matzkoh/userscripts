module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    browser: true,
    greasemonkey: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
    GM_unregisterMenuCommand: false,
  },
  rules: {
    curly: ['error', 'all'],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
  },
}
