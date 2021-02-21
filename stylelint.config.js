/** @type {import('stylelint').Configuration} */
module.exports = {
  extends: ['@wemake-services/stylelint-config-scss', 'stylelint-config-recess-order'],
  rules: {
    'color-format/format': null,
    'font-weight-notation': null,
    'max-line-length': 120,
    'plugin/no-low-performance-animation-properties': null,
    'scale-unlimited/declaration-strict-value': null,
  },
}
