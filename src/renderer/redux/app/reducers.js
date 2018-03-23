import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

export default combineReducers({
  storeFilePath: (state = '', action) => {
    switch (action.type) {
      case ACTIONS.REGISTER:
        return action.storeFilePath;
      default:
        return state;
    }
  },
});
