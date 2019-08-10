module.exports = {
  env: {
    browser: true,
  },

  rules: {
    'react/destructuring-assignment': 0,

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
