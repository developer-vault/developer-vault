const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = [
  {
    loader: 'babel-loader',
  },
];

const eslintLoader = [
  {
    loader: 'eslint-loader',
    options: {
      // Do not stop the build on a lint error.
      emitWarning: true,
    },
  },
];

const makeCssLoader = ({
  mode = 'development',
  enableModules = false,
  importLoaders = 0,
} = {}) => ([
  {
    loader: mode === 'production'
      // In production, extract css to an external stylesheet to allow caching.
      ? MiniCssExtractPlugin.loader
      // In development, use the style-loader (faster and allows MHR).
      : 'style-loader',

    options: {
      esModule: true,
    },
  },
  {
    loader: 'css-loader',
    options: {
      esModule: true,
      sourceMap: true,
      importLoaders,
      modules: enableModules
        ? {
          localIdentName: mode === 'production'
            // In production, only set the hash of the class name.
            ? '[hash:base64:8]'
            // In development, add the actual class name to the hash to make it easier to debug.
            : '[local]--[hash:base64:8]',
        }
        : undefined,
    },
  },
]);

const makeSassLoader = ({
  mode,
  enableModules,
  importLoaders = 0,
} = {}) => ([
  ...makeCssLoader({
    enableModules,
    mode,
    importLoaders: importLoaders + 2,
  }),
  {
    // This loader will resolve URLs relative to the source file.
    // (otherwise they will be relative to the built destination file and URLs will not work).
    loader: 'resolve-url-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions: {
        includePaths: [
          path.resolve(__dirname, '../src/renderer/'),
          path.resolve(__dirname, '../node_modules/'),
        ],
      },
    },
  },
]);

const sassVariablesLoader = [
  {
    loader: 'sass-extract-loader',
    options: {
      plugins: ['sass-extract-js'],
      includePaths: [
        path.resolve(__dirname, '../src/renderer/'),
        path.resolve(__dirname, '../node_modules/'),
      ],
    },
  },
];

const assetsLoader = [
  {
    loader: 'file-loader',
    options: {
      name: 'static/[name].[hash:8].[ext]',
    },
  },
];

const svgReactLoader = [
  {
    // Export a React component.
    loader: 'svg-react-loader',
  },
  {
    loader: 'image-webpack-loader',
    options: {
      // Optimize svg files.
      svgo: {
        plugins: [
          // Keep the viewbox and remove the hardcoded dimensions
          // to be able to set the dimensions via css.
          { removeViewBox: false },
          { removeDimensions: true },

          // Removing ids breaks some svgs.
          { cleanupIDs: false },
        ],
      },
    },
  },
];

const poLoader = [
  {
    // react-intl-po-loader returns a json object.
    loader: 'json-loader',
  },
  {
    loader: 'react-intl-po-loader',
    options: {
      po2json: {
        fuzzy: true,
      },
    },
  },
];

module.exports = {
  babelLoader,
  eslintLoader,
  makeCssLoader,
  makeSassLoader,
  sassVariablesLoader,
  assetsLoader,
  svgReactLoader,
  poLoader,
};
