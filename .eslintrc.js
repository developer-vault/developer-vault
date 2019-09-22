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
    'import/prefer-default-export': 'off',
    // Allow ++ operator.
    'no-plusplus': 'off',

    // On linebreak, enforce operator on the new line.
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

    // Omit parenthesis for arrow functions parameters with one parameter and no body.
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],

    // JSDoc specific rules.
    // Set most rules as warnings instead of errors.
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': ['warn', { definedTags: ['async', 'assignee'] }],
    'jsdoc/check-types': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/match-description': 'warn',
    'jsdoc/newline-after-description': 'warn',
    'jsdoc/no-undefined-types': 'warn',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/valid-types': 'warn',

    // Disable these rules.
    'jsdoc/require-description': 'off',
    'jsdoc/require-example': 'off',

    'jsdoc/require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: true,
        },
      },
    ],
  },

  overrides: [
    {
      files: [
        'webpack.config.*.js',
        'scripts/**/*.{js,jsx}',
        '.{jest,storybook,webpack}/**/*.{js,jsx}',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],

        'react/jsx-filename-extension': 'off',
      },
    },
  ],
};
