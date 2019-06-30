// eslint wants me to put this in production dependencies...
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/en';

import messages from 'locales/messages.json';

addLocaleData(localeData);

const mockStore = configureStore({});

const mockState = {
  app: {},
  data: {},
  intl: {
    locale: 'en',
    messages: messages.en,
  },
  nodes: {},
  notifications: [],
};

export default mockStore(mockState);
