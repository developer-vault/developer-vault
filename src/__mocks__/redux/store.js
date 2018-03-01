// eslint wants me to put this in production dependencies...
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';

const mockStore = configureStore({});

const mockState = {};

export default mockStore(mockState);
