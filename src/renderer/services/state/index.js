import { send } from 'services/ipc';
import { SET_KEY } from 'common/events';

/**
 * Sends the password to main process.
 *
 * @param {string} key - The user password.
 * @returns {Promise<void>} - The promise to await.
 */
export const setKey = key => send(SET_KEY, key);

export default {
  setKey,
};
