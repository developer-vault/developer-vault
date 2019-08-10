// eslint wants me to put this in production dependencies...
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';

import messagesEn from 'locales/en/messages.po';

const mockStore = configureStore({});

const mockState = {
  app: {},
  data: {},
  intl: {
    locale: 'en',
    messages: messagesEn,
  },
  nodes: {},
  notifications: [],
};

export default mockStore(mockState);
