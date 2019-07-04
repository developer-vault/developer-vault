const path = require('path');

const { endsWith } = require('lodash');

const {
  babelLoader,
  eslintLoader,
  makeCssLoader,
  makeLessLoader,
  makeSassLoader,
  sassVariablesLoader,
  assetsLoader,
  svgReactLoader,
  poLoader,
} = require('./loaders');

// Transpile using babel.
const babelRule = {
  test: /\.jsx?$/i,
  exclude: /(node_modules)/i,
  use: babelLoader,
};

// Eslint.
const eslintRule = {
  test: /\.jsx?$/i,
  // Make sure that they are linted BEFORE they are transformed by babel.
  enforce: 'pre',
  // Do not lint files in node_modules.
  exclude: /(node_modules)/i,
  use: eslintLoader,
};

const makeCssRule = ({ mode } = {}) => ({
  test: file => (
    /**
     * @todo
     * @assignee anyone
     * Remove the reapop test when removing reapop-theme-wybo.
     */
    !/reapop-theme-wybo[\/\\].+\.css$/.test(file)
    && !endsWith(file, '.module.css')
    && endsWith(file, '.css')
  ),
  use: makeCssLoader({ mode }),
});

const makeCssModulesRule = ({ mode } = {}) => ({
  test: file => (
    /**
     * @todo
     * @assignee anyone
     * Remove the reapop test when removing reapop-theme-wybo.
     */
    /reapop-theme-wybo[\/\\].+\.css$/.test(file)
    || endsWith(file, '.module.css')
  ),
  use: makeCssLoader({ mode, enableModules: true }),
});

const makeSassRule = ({ mode } = {}) => ({
  test: file => (
    !endsWith(file, '.module.scss')
    && !endsWith(file, '.variables.scss')
    && endsWith(file, '.scss')
  ),
  use: makeSassLoader({ mode }),
});

const makeSassModulesRule = ({ mode } = {}) => ({
  test: /\.module\.scss$/i,
  use: makeSassLoader({ mode, enableModules: true }),
});

const sassVariablesRule = {
  test: /\.variables\.scss$/i,
  use: sassVariablesLoader,
};

// Rule for assets file and NODE_MODULES svg.
const assetsRule = {
  test: /(node_modules[\/\\].+\.svg)|(\.(jpg|jpeg|bmp|png|gif|eot|otf|ttf|woff|woff2|ico|pdf))$/i,
  use: assetsLoader,
};

// Rule for app svg files.
const svgReactRule = {
  test: /\.svg$/i,
  exclude: /node_modules/i,
  use: svgReactLoader,
};

const poRule = {
  test: /\.po$/i,
  use: poLoader,
};

module.exports = {
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
};
