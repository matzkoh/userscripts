module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    browser: true,
    greasemonkey: true,
    commonjs: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      globalReturn: true,
    },
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
