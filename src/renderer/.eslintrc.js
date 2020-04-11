module.exports = {
  env: {
    browser: true,
  },

  rules: {
    // This rule just makes the code more verbose and less readable.
    'react/destructuring-assignment': 'off',

    // Allow static propTypes and defaultProps in class components.
    'react/static-property-placement': 'off',

    // Allow spreading props.
    'react/jsx-props-no-spreading': 'off',

    // Allow initializing state as class property.
    'react/state-in-constructor': 'off',

    // Does not work well with inline text.
    'react/jsx-one-expression-per-line': 'off',

    // Renderer dependencies are devDependencies because electron packager bundles dependencies.
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.mjs',
          '.js',
          '.jsx',
        ],

        moduleDirectory: [
          './',
          '../../node_modules/',
        ],
      }
    },
  },
};
