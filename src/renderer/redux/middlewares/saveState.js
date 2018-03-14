import { send } from 'services/ipc';
import { SAVE_STATE } from 'common/events';

/**
 * Redux middleware to save the state to a file everytime there is an action.
 */
export default () => {
  let lastRequest;
  let isIdle = true;

  /**
   * Send the SAVE_STATE request to main process.
   * If there was another action before the file was saved, save the new tree.
   *
   * @param {Object} tree - The state.
   */
  function saveState(tree) {
    return send(SAVE_STATE, tree)
      .then(() => {
        if (lastRequest) {
          // Reset the last request before sending the save request.
          const nextTree = lastRequest;
          lastRequest = null;
          return saveState(nextTree);
        }

        isIdle = true;
        return null;
      });
  }

  return store => next => (action) => {
    // If the state is being saved, keep the new tree in memory but don't try to save again.
    if (!isIdle) {
      const result = next(action);
      lastRequest = store.getState();
      return result;
    }

    const result = next(action);
    isIdle = false;
    saveState(store.getState());
    return result;
  };
};
