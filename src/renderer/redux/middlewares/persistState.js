import { send } from 'services/ipc';

/**
 * Redux middleware creator to save the state to a file everytime there is an action.
 *
 * @example
 * const middleware = makeSaveState();
 * const store = createStore(reducers, applyMiddleware(middleware));
 */
export default () => store => next => (action) => {
  const result = next(action);
  send(store.getState());
  return result;
};
