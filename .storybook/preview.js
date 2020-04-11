import React from 'react';
import { transform } from 'lodash';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { BREAKPOINTS_MAP } from '../src/renderer/config/style';
import store from '../src/renderer/__mocks__/redux/store';

import '../src/renderer/style/main.scss';
import './storybook.scss';

addParameters({
  options: {
    // First hierarchy in story name becomes the root in the UI.
    showRoots: true,
  },
});

// Set the configuration of react-intl for storybook.
const loadLocales = () => {
  const req = require.context('../src/renderer/locales', true, /index\.js$/i);

  return transform(
    req.keys(),
    (localesMap, filename) => {
      const localeName = filename
        .replace(/^\.\//, '')
        .split('/')[0];

      localesMap[localeName] = req(filename).default;
    },
    {},
  );
};

const localesMap = loadLocales();

setIntlConfig({
  locales: Object.keys(localesMap),
  defaultLocale: 'en',
  getMessages: locale => localesMap[locale].messages,
});

addDecorator(withIntl);

// Add breakpoints viewports to the list of devices.
addParameters({
  viewport: {
    defaultViewport: 'responsive',

    viewports: {
      // Default is responsive (behaves as if no viewport selected).
      responsive: {
        type: 'desktop',
        name: 'Responsive',
        styles: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          margin: 0,
          border: 0,
        },
      },

      // Add default devices viewports.
      ...INITIAL_VIEWPORTS,

      // Add app breakpoints as desktop viewports.
      ...transform(
        BREAKPOINTS_MAP,
        (result, bpMaxWidth, bpName) => {
          result[bpName] = {
            type: 'desktop',
            name: `${bpName} (${bpMaxWidth}px) -- custom breakpoint`,
            styles: {
              width: `${bpMaxWidth}px`,
              // Otherwise addon-viewport does not fill the device height.
              height: '100%',
              margin: 0,
            },
          };
        },
      ),
    },
  },
});

// Add knobs.
addDecorator(withKnobs);

// Add a mock redux store for each stories.
addDecorator(getStory => <StoreProvider store={store}>{getStory()}</StoreProvider>);
// Add a router context for each stories (navigation will be ignored).
addDecorator(getStory => <MemoryRouter store={store}>{getStory()}</MemoryRouter>);
