import { send } from 'services/ipc';
import { IS_INITIALIZED, GET_STORE_FILE_PATH, SET_KEY } from 'common/events';

/**
 * Asks main process if application was initialized.
 * Meaning, is the user locally registered ?
 *
 * @returns {Promise<bool>} - Is the app initialized ?
 */
export const isInitialized = () => send(IS_INITIALIZED);

/**
 * Gets the store file path used by developer-vault.
 *
 * @returns {Promise<string>} - The store file path.
 */
export const getStoreFilePath = () => send(GET_STORE_FILE_PATH);

/**
 * Sends the password to main process.
 *
 * @param {string} key - The user password.
 * @returns {Promise<void>} - The promise to await.
 */
export const setKey = key => send(SET_KEY, key);
