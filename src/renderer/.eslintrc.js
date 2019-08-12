module.exports = {
  env: {
    browser: true,
  },

  rules: {
    'react/destructuring-assignment': 0,

    // Allow static propTypes and defaultProps in class components.
    'react/static-property-placement': 0,

    // Allow spreading props.
    'react/jsx-props-no-spreading': 0,

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
