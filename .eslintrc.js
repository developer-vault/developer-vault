/**
 * This eslint configuration contains the shared rules between renderer and main processes.
 */
module.exports = {
  root: true,

  env: {
    es6: true,
    // Define jest globals in .spec.js and .test.js files.
    jest: true,
  },

  extends: [
    'airbnb',
    // Allows to import electron and install it as devDependency.
    'plugin:import/electron',
  ],

  plugins: ['jsdoc'],

  parser: 'babel-eslint',

  rules: {
    // Allow named export without default export.
    'import/prefer-default-export': 0,

    // On linebreak, enforce operator on the new line, except for the '?' of a ternary expression.
    'operator-linebreak': [
      'error',
      'before',
    ],

    // Prevent multiple empty lines. Allow 1 at EOF, 0 at BOF.
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],

    // Allow ++ operator.
    'no-plusplus': 0,

    // Enforce single quotes except for strings with single quotes in body.
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],

    // Allow assigning in argument if object.
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    // JSDoc specific rules.
    // Set most rules as warnings instead of errors.
    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/check-alignment': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/no-undefined-types': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns-check': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1,
    'jsdoc/valid-types': 1,

    // Disable these rules.
    'jsdoc/require-description': 0,
    'jsdoc/require-example': 0,
  },

  settings: {
    jsdoc: {
      additionalTagNames: {
        customTags: [
          'todo',
          'assignee',
        ],
      },
    },
  },

  overrides: [
    {
      files: ['webpack.config.*.js', 'scripts/**/*.{js,jsx}'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
