import { send } from 'services/ipc';
import { IS_INITIALIZED, SET_KEY } from 'common/events';

export const isInitialized = () => send(IS_INITIALIZED);

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
