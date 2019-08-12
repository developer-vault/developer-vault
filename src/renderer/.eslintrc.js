module.exports = {
  env: {
    browser: true,
  },

  rules: {
    'react/destructuring-assignment': 'off',

    // Allow static propTypes and defaultProps in class components.
    'react/static-property-placement': 'off',

    // Allow spreading props.
    'react/jsx-props-no-spreading': 'off',

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
