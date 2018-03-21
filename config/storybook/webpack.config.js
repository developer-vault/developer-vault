process.env.NODE_ENV = 'development';
const devConfig = require('../webpack.config.dev');

process.env.NODE_ENV = 'production';
const prodConfig = require('../webpack.config.prod');

const paths = require('../paths');
const loaders = require('../webpack/loaders')(paths);

module.exports = (storybookConfig, storybookEnv) => {
  const config = storybookEnv === 'PRODUCTION' ? prodConfig : devConfig;

  // todo use prod config
  // I had to import myself all rules as it looks like storybook does not know "oneOf"
  storybookConfig.module.rules = [
    loaders.linter,
    loaders.urlLoader,
    loaders.json,
    loaders.js,
    loaders.css({ isDev: true }),
    loaders.cssModules({ isDev: true }),
    loaders.sass({ isDev: true }),
    loaders.sassModules({ isDev: true }),
    loaders.sassVariables,
    loaders.files,
  ];

  storybookConfig.resolve.modules = (storybookConfig.resolve.modules || []).concat(config.resolve.modules);
  storybookConfig.resolve.alias = Object.assign(storybookConfig.resolve.alias || {}, config.resolve.alias);

  storybookConfig.plugins = (storybookConfig.plugins || []).concat([
    loaders.extractTextPlugin,
  ]);

  return storybookConfig;
};
