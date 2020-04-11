const path = require('path');

const { pickBy, transform } = require('lodash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const chalk = require('chalk');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');

const {
  babelRule,
  eslintRule,
  makeCssRule,
  makeCssModulesRule,
  makeSassRule,
  makeSassModulesRule,
  sassVariablesRule,
  assetsRule,
  svgReactRule,
  poRule,
} = require('./.webpack/rules');

const {
  ignoreMomentLocales,
} = require('./.webpack/plugins');

/**
 * Get all environment variables whose name starts with the ENV_PREFIX (case insensitive).
 *
 * @returns {object} Filtered process.env.
 */
function getAppEnvironment() {
  const prefix = (process.env.ENV_PREFIX || '').toLowerCase();
  return pickBy(process.env, (value, key) => key.toLowerCase().startsWith(prefix));
}

/**
 * Print option.
 *
 * @param {string} optName - Name of the option.
 * @param {boolean} isOptEnabled - Is the option enabled?
 */
function printOpt(optName, isOptEnabled) {
  // eslint-disable-next-line no-console
  console.log(chalk`• [${isOptEnabled ? '{green.bold ✔}' : ' '}] ${optName}`);
}

module.exports = (
  env,
  {
    mode = 'development',
    generateBundleAnalysisReport = false,
  } = {},
) => {
  // eslint-disable-next-line no-console
  console.log(chalk`Building for {cyan.bold ${mode}}`);
  printOpt('Bundle analysis report', generateBundleAnalysisReport);

  const appEnv = getAppEnvironment();

  // Served from the root by webpack-dev-server in development and relative path in packaged mode.
  const publicPath = mode === 'production' ? './' : '/';

  // Point sourcemap entries to original disk location (format as URL on Windows).
  const devtoolModuleFilenameTemplate = info => path
    .relative('./src/renderer', info.absoluteResourcePath)
    .replace(/\\/g, '/');

  const output = mode === 'production' ? {
    path: path.join(__dirname, './.dist/renderer'),
    filename: 'js/[name].[contenthash].min.js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate,
  } : {
    path: path.join(__dirname, './.dev/renderer'),
    filename: 'js/bundle.min.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate,
  };

  return {
    mode,

    // Target electron renderer process (does not bundle electron etc.).
    target: 'electron-renderer',

    devtool: mode === 'production'
      ? 'source-map'
      : 'inline-source-map',

    // Only show errors.
    stats: 'minimal',

    // App entry point.
    entry: [
      mode === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/renderer/index.jsx',
    ].filter(Boolean),

    output,

    module: {
      rules: [
        // JavaScript.
        babelRule,
        eslintRule,

        // Sass, less and css.
        makeCssRule({ mode }),
        makeCssModulesRule({ mode }),
        makeSassRule({ mode }),
        makeSassModulesRule({ mode }),
        sassVariablesRule,

        // Assets.
        assetsRule,
        // App svg files (specific loader to have the actual <svg> tag in the DOM).
        svgReactRule,

        // Gettext PO files for i18n.
        poRule,
      ],
    },

    resolve: {
      // Resolve absolute imports using these paths (in this order).
      modules: [
        './src/renderer/',
        './node_modules/',
      ],

      alias: {
        shared: path.resolve(__dirname, 'src/shared'),
        modules: path.resolve(__dirname, 'src/modules'),
      },

      extensions: [
        '.json',
        '.mjs',
        '.js',
        '.jsx',
      ],

      plugins: [
        // Prevent importing files outside of src (or node_modules/) except package.json.
        new ModuleScopePlugin('./src/', ['./package.json']),
      ],
    },

    plugins: [
      // Extract CSS to an external stylesheet in packaged mode.
      mode === 'production' && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].min.css',
        ignoreOrder: true,
      }),

      // Generate index.html linking to the generated bundles (js and css).
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/renderer/index.html.ejs',
      }),

      // Define specific environment variables in the bundle.
      new webpack.DefinePlugin({
        // process.env.NODE_ENV is required by many packages.
        'process.env.NODE_ENV': JSON.stringify(mode),
        // Expose variables specific to the app.
        // These values are static (defined at build time).
        // For runtime values, use a bridge between main and renderer process.
        ...transform(
          appEnv,
          (transformed, value, key) => {
            transformed[`process.env.${key}`] = value;
          },
        ),
      }),

      ignoreMomentLocales,

      // HMR plugin.
      mode === 'development' && new webpack.HotModuleReplacementPlugin(),

      // Throw error when a required path does not match the case of the actual path.
      new CaseSensitivePathsWebpackPlugin(),

      // Trigger a new build when a node module package is installed.
      mode === 'development' && new WatchMissingNodeModulesPlugin(path.resolve('./node_modules/')),

      // Lint SCSS files.
      new StyleLintPlugin(),

      // If needed, generate a report to analyze why the bundle is large.
      generateBundleAnalysisReport && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(path.join(__dirname, '.reports/bundle-analyzer-report.html')),
      }),
    ].filter(Boolean),

    // Uglify JS and CSS bundles.
    optimization: {
      minimizer: [
        // JS uglifier.
        new TerserWebpackPlugin({
          sourceMap: true,
        }),
        // CSS uglifier.
        new OptimizeCssAssetsWebpackPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },

    // Dev server.
    devServer: mode === 'development'
      ? {
        publicPath,

        contentBase: './.dev/renderer/',
        watchContentBase: true,
        watchOptions: {
          ignored: /node_modules/,
        },

        // Only show errors.
        stats: 'minimal',

        // Enable HMR.
        hot: true,
        // Since react-dev-utils now uses native WebSockets, we need to specify explicitly to use
        // WebSockets instead of sock-js.
        transportMode: 'ws',
        injectClient: false,

        // Serve index.html on 404.
        historyApiFallback: {
          // Paths with dots should still use the history fallback.
          // See https://github.com/facebookincubator/create-react-app/issues/387.
          disableDotRule: true,
        },

        // Use 8080 port as default.
        // Allow users to override via environment.
        port: +(process.env[`${process.env.ENV_PREFIX}WDS_PORT`] || 8080),

        /**
         * @param {object} app - App.
         */
        before(app) {
          // This lets us open files from the runtime error overlay.
          app.use(errorOverlayMiddleware());
          // This service worker file is effectively a 'no-op' that will reset any
          // previous service worker registered for the same host:port combination.
          // We do this in development to avoid hitting the production cache if
          // it used the same host and port.
          // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
          app.use(noopServiceWorkerMiddleware(''));
        },
      }
      : undefined,
  };
};
