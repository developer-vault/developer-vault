// eslint wants me to put this in production dependencies...
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/en';

import messages from 'i18n/messages.json';

addLocaleData(localeData);

const mockStore = configureStore({});

const mockState = {
  intl: {
    locale: 'en',
    messages: messages.en,
  },
  nodes: {},
};

export default mockStore(mockState);
