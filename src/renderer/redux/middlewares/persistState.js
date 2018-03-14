import throttle from 'lodash/debounce';

import { send } from 'services/ipc';
import { SAVE_STATE } from 'common/events';

/**
 * Redux middleware creator to save the state to a file everytime there is an action.
 *
 * @example const middleware = makeSaveState();
 */
export default () => {
  // Only save the state every second if there are numerous actions being dispatched.
  const throttledSaveState = throttle(
    tree => send(SAVE_STATE, tree),
    1000,
  );

  // Return Redux middleware
  return store => next => (action) => {
    const result = next(action);
    throttledSaveState(store.getState());
    return result;
  };
};
