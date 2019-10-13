import { combineReducers } from 'redux';

import { ACTIONS } from './constants';

export default combineReducers({
  locale: (state = '', action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_LOCALE:
        return action.payload.locale;
      default:
        return state;
    }
  },

  messages: (state = {}, action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_LOCALE:
        return action.payload.messages;
      default:
        return state;
    }
  },
});
