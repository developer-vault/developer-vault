import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

export default combineReducers({
  initialized: (state = false, action) => {
    switch (action.type) {
      case ACTIONS.IS_INITIALIZED:
        return action.initialized;
      default:
        return state;
    }
  },
});
