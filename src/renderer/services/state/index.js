import { send } from 'services/ipc';
import EVENTS from 'shared/events';

/**
 * Asks main process if application was initialized.
 * Meaning, is the user locally registered?
 *
 * @async
 * @returns {boolean} - Is the app initialized?
 */
export const isInitialized = () => send(EVENTS.IS_INITIALIZED);

/**
 * Gets the store file path used by developer-vault.
 *
 * @async
 * @returns {string} - The store file path.
 */
export const getStoreFilePath = () => send(EVENTS.GET_STORE_FILE_PATH);

/**
 * Sends the password to main process.
 *
 * @async
 * @param {string} key - The user password.
 */
export const setKey = (key) => send(EVENTS.SET_KEY, key);

/**
 * Persist state.
 *
 * @async
 * @param {object} state - The state to persist.
 */
export const saveState = (state) => send(EVENTS.SAVE_STATE, state);

/**
 * Loads persisted state.
 *
 * @async
 * @param {string} key - The user password.
 * @returns {object} - The persisted state.
 */
export const loadState = (key) => send(EVENTS.LOAD_STATE, key);
