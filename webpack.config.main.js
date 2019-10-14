const path = require('path');

const chalk = require('chalk');
const webpackNodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const {
  babelRule,
  eslintRule,
} = require('./.webpack/rules');

module.exports = (
  args,
  {
    mode = 'development',
  } = {},
) => {
  // eslint-disable-next-line no-console
  console.log(chalk`Building for {cyan.bold ${mode}}`);

  return {
    mode,

    devtool: 'source-map',

    // Target electron main process.
    target: 'electron-main',

    // Only show errors.
    stats: 'minimal',

    // Entry point.
    entry: './src/main/index.js',

    // Create the bundle at ./.dev/server.min.js
    output: mode === 'development' ? {
      path: path.join(__dirname, './.dev/main/'),
      filename: 'app.min.js',
      // Point sourcemap entries to original disk location (format as URL on Windows).
      devtoolModuleFilenameTemplate: info => path
        .relative(path.join(__dirname, './.dev'), info.absoluteResourcePath)
        .replace(/\\/g, '/'),
    } : {
      path: path.join(__dirname, './.dist/main'),
      filename: 'app.min.js',
      devtoolModuleFilenameTemplate: info => path
        .relative(path.join(__dirname, './.dist'), info.absoluteResourcePath)
        .replace(/\\/g, '/'),
    },

    module: {
      rules: [
        babelRule,
        eslintRule,
      ],
    },

    resolve: {
      // Resolve absolute imports using these paths (in this order).
      modules: [
        './src/main/',
        './node_modules/',
      ],

      // Add alias for shared folders.
      alias: {
        shared: path.resolve(__dirname, 'src/shared'),
        modules: path.resolve(__dirname, 'src/modules'),
      },
    },

    plugins: [
      new CopyPlugin([
        { from: path.resolve(__dirname, 'src/main/preload.js'), to: 'preload.js' },
      ]),
    ],

    // Don't bundle node modules, except @babel/polyfill.
    externals: [
      webpackNodeExternals({
        whitelist: [
          'core-js',
          'regenerator-runtime',
        ],
      }),
    ],
  };
};
