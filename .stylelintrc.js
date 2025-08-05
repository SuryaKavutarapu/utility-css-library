module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss'
  ],
  rules: {
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$|^u-[a-z0-9-]+$',
      {
        message: 'Expected class selector to follow BEM naming convention or utility pattern'
      }
    ],
    'scss/at-import-partial-extension': null,
    'scss/load-no-partial-leading-underscore': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null
  },
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*'
  ]
};
