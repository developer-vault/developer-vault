import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

export default combineReducers({

  /**
   * Is the store file created ?
   * Should be initialized before application is mounted.
   *
   * @param {bool} state - Current state.
   * @param {Object} action - The dispatched action.
   * @returns {bool} - Is the store file created ?
   */
  initialized: (state = false, action) => {
    switch (action.type) {
      case ACTIONS.IS_INITIALIZED:
        return action.initialized;
      default:
        return state;
    }
  },

  /**
   * The store file path on the user fs.
   *
   * @param {string} state - Current state.
   * @param {Object} action - The dispatched action.
   * @returns {string} - The store file path.
   */
  storeFilePath: (state = '', action) => {
    switch (action.type) {
      case ACTIONS.GET_STORE_FILE_PATH:
        return action.storeFilePath;
      default:
        return state;
    }
  },

  /**
   * Is the user authenticated ?
   * Should be used to know if the user registered / logged in.
   *
   * @param {bool} state - The current state.
   * @param {Object} action - The dispatched action.
   * @returns {bool} - Has the user registered / logged in ?
   */
  authenticated: (state = false, action) => {
    switch (action.type) {
      case ACTIONS.REGISTER:
      case ACTIONS.LOGIN:
        return true;
      default:
        return state;
    }
  },

});
