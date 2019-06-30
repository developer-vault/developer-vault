import { transform } from 'lodash';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Provider as StoreProvider } from 'react-redux';

import { BREAKPOINTS_MAP } from '../src/renderer/config/style';
import store from '../src/renderer/__mocks__/redux/store';

import '../src/renderer/style/main.scss';
import './storybook.scss';

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

// Add mock store.
addDecorator(getStory => (
  <StoreProvider store={store}>
    {getStory()}
  </StoreProvider>
));

function loadStories() {
  const req = require.context('../src/renderer/react', true, /\.stories\.jsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
