// eslint wants me to put this in production dependencies...
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';

import messages from 'i18n/messages.json';

const mockStore = configureStore({});

const mockState = {
  intl: {
    locale: 'en',
    messages: messages.en,
  },
};

export default mockStore(mockState);
