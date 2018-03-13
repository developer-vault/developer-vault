const { endsWith } = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const flexbugFixes = require('postcss-flexbugs-fixes');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = (paths) => {
  const extractCss = new ExtractTextPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
  });

  const urlLoader = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  };

  const json = {
    test: /\.json$/i,
    loader: 'json-loader',
  };

  const js = {
    test: /\.jsx?$/i,
    loader: 'babel-loader',
    include: paths.appSrc,
    options: {
      cacheDirectory: true,
    },
  };

  const linter = {
    enforce: 'pre',
    test: /\.jsx?$/i,
    loader: 'eslint-loader',
    include: paths.appSrc,
    options: {
      configFile: paths.eslint,
      formatter: eslintFormatter,
      eslintPath: require.resolve('eslint'),

      // when throwing errors, webpack does not build
      emitWarning: true,
      // fix: true,
    },
  };

  const sassVariables = {
    test: /\.variables\.scss$/i,
    loader: 'sass-variable-loader',
  };

  const files = {
    test: /\.(png|jpg|jpeg|ico|gif|svg|eot|otf|ttf|woff|woff2|mp4)$/i,
    loader: 'file-loader',
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  };

  const cssLoader = ({ isDev, hasModules }) => ({
    loader: 'css-loader',
    options: {
      modules: hasModules,
      minimize: !isDev,
      sourceMap: true,
      localIdentName: isDev ? '[local]--[hash:base64:5]' : undefined,
    },
  });

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => ([
        flexbugFixes,
        pixrem(),
        autoprefixer({
          browsers: [
            '> 1%',
          ],
        }),
      ]),
    },
  };

  const resolveUrlLoader = {
    loader: 'resolve-url-loader',
  };

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [
        paths.appSrc,
        paths.appNodeModules,
      ],
    },
  };

  const css = ({ isDev, extractTextPluginOptions }) => ({
    test: input => endsWith(input, '.css') && !endsWith(input, '.module.css'),
    use: extractCss.extract(Object.assign({
      use: [
        cssLoader({
          isDev,
          hasModules: false,
        }),
        postCssLoader,
      ],
    }, extractTextPluginOptions)),
  });

  const cssModules = ({ isDev, extractTextPluginOptions }) => ({
    test: /\.module\.css$/i,
    use: extractCss.extract(Object.assign({
      use: [
        cssLoader({
          isDev,
          hasModules: true,
        }),
        postCssLoader,
      ],
    }, extractTextPluginOptions)),
  });

  const sass = ({ isDev, extractTextPluginOptions }) => ({
    test: input => endsWith(input, '.scss') && !endsWith(input, '.module.scss') && !endsWith(input, '.variables.scss'),
    use: extractCss.extract(Object.assign({
      use: [
        cssLoader({
          isDev,
          hasModules: false,
        }),
        postCssLoader,
        resolveUrlLoader,
        sassLoader,
      ],
    }, extractTextPluginOptions)),
  });

  const sassModules = ({ isDev, extractTextPluginOptions }) => ({
    test: /\.module\.scss$/i,
    use: extractCss.extract(Object.assign({
      use: [
        cssLoader({
          isDev,
          hasModules: true,
        }),
        postCssLoader,
        resolveUrlLoader,
        sassLoader,
      ],
    }, extractTextPluginOptions)),
  });

  return {
    urlLoader,
    json,
    js,
    linter,
    sassVariables,
    files,
    css,
    cssModules,
    sass,
    sassModules,
    extractTextPlugin: extractCss,
  };
};
