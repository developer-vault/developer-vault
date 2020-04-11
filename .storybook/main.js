module.exports = {
  stories: [
    '../src/renderer/react/**/*.stories.{js,jsx,mdx}',
  ],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-notes',
    'storybook-addon-intl',
  ],
};
