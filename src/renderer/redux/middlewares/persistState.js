import { throttle } from 'lodash';

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
    /**
     * @todo
     * @assignee sylvainar
     * Persist your "nodes" key instead of the app key I used as a placeholder.
     * Also, please initialise the "node" keys when register is hit.
     */
    // Only persist "nodes" property of the state, if it exists.
    if (store.getState().app) {
      throttledSaveState(store.getState().app);
    }
    return result;
  };
};
