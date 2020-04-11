const path = require('path');

const {
  makeCssRule,
  makeCssModulesRule,
  makeSassRule,
  makeSassModulesRule,
  sassVariablesRule,
  assetsRule,
  svgReactRule,
  poRule,
} = require('../.webpack/rules');

module.exports = ({ config }) => {
  // Default config does not implicitly resolve .jsx files.
  config.resolve.extensions.push('.jsx');

  config.resolve.modules.push(path.resolve(__dirname, '../src/renderer'));
  config.resolve.alias.shared = path.resolve(__dirname, '../src/shared');

  // This makes the alias only work when importing from 'react' exactly.
  // This will work as long as storybook does not import from react like 'react/lib/x'.
  config.resolve.alias.react$ = config.resolve.alias.react;
  delete config.resolve.alias.react;

  config.devServer = { stats: 'minimal' };

  // Default config only transforms .js files.
  config.module.rules[0].test = /\.jsx?$/i;

  config.module.rules = [
    // JS/JSX.
    config.module.rules[0],
    config.module.rules[2],

    // MDX.
    config.module.rules[3],
    config.module.rules[4],

    // Source loader.
    config.module.rules[5],

    // Raw loader.
    config.module.rules[1],

    // Files (mp3 etc.).
    config.module.rules[8],

    makeCssRule(),
    makeCssModulesRule(),
    makeSassRule(),
    makeSassModulesRule(),
    sassVariablesRule,

    assetsRule,
    svgReactRule,

    // Gettext PO files for i18n.
    poRule,
  ];

  return config;
};
