import { saveState } from 'services/state';

/**
 * Redux middleware creator to save the state to a file everytime there is an action.
 *
 * @example
 * const middleware = makeSaveState();
 * const store = createStore(reducers, applyMiddleware(middleware));
 * @returns {object} The calculated state.
 */
export default () => store => next => (action) => {
  const result = next(action);
  /**
   * @todo
   * @assignee sylvainar
   * Persist your "nodes" key instead of the app key I used as a placeholder.
   * Also, please initialise the "node" keys when register is hit.
   */
  // Only persist "nodes" property of the state, if it exists.
  if (store.getState().app.authenticated) {
    saveState(store.getState().nodes);
  }
  return result;
};
