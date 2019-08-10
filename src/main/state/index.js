import fse from 'fs-extra';

import EVENTS from 'shared/events';

import CONFIG from '../config/constants';
import { on, removeListener } from '../services/ipc';

import { persistEncryptedState, decryptFromFile } from './encrypt';

let KEY;

/**
 * Is user registered ?
 * That would mean that the app is initialized and that the store file exists.
 *
 * @async
 * @param {string} storeFilePath - Where to find the store file.
 * @returns {boolean} Whether the store file exists.
 */
export function isInitialized(storeFilePath) {
  return fse.pathExists(storeFilePath);
}

/**
 * Set the key.
 * Used to register the user.
 * Sets the key only if app was not initialized.
 *
 * @param {string} key - The key as an utf8 string.
 */
function onSetKey(key) {
  if (!isInitialized(CONFIG.STORE.PATH)) {
    KEY = key;
  }
}

/**
 * Handler function getting the store file path.
 *
 * @returns {string} - The store file path.
 */
function onGetStoreFilePath() {
  return CONFIG.STORE.PATH;
}

/**
 * Handler function for the "IS_INITIALIZED" event.
 *
 * @returns {boolean} Whether the user has once registered.
 */
function onIsInitialized() {
  return isInitialized(CONFIG.STORE.PATH);
}

/**
 * Handler function for the LOAD_STATE event.
 *
 * @async
 * @param {string} key - Key used at encryption, as an utf8 string.
 * @returns {object} The state, or null if none saved.
 */
function onLoadState(key) {
  try {
    const state = decryptFromFile(
      key,
      CONFIG.STORE.ENCRYPTION_ALGORITHM,
      CONFIG.STORE.PATH,
    );

    // If no error was thrown, we can save the key for later updates.
    KEY = key;
    return state;
  } catch (err) {
    // If an error was thrown, key was not correct. We unset it
    // to prevent unlucky encryption with a wrong key !
    KEY = undefined;
    throw err;
  }
}

/**
 * Create a onSaveState handler.
 * Used to keep track of pending save requests that must be fulfilled before exiting the app.
 *
 * @class
 */
function SaveStateHandler() {
  this.pendingSave = null;
  this.currentPromise = null;

  /**
   * Handler function for the SAVE_STATE event.
   *
   * @async
   * @param {object} state - State tree.
   * @returns {Promise} Reference to the current Promise.
   */
  this.onSaveState = (state) => {
    if (this.currentPromise) {
      this.pendingSave = state;
      return this.currentPromise;
    }

    this.currentPromise = persistEncryptedState(
      state,
      KEY,
      CONFIG.STORE.ENCRYPTION_ALGORITHM,
      CONFIG.STORE.PATH,
    ).then(() => {
      this.currentPromise = null;

      if (this.pendingSave) {
        const tree = this.pendingSave;
        this.pendingSave = null;
        return this.onSaveState(tree);
      }

      return null;
    });

    return this.currentPromise;
  };
}

export const saveStateHandler = new SaveStateHandler();

/** Register the callbacks. */
export function register() {
  on(EVENTS.IS_INITIALIZED, onIsInitialized);
  on(EVENTS.GET_STORE_FILE_PATH, onGetStoreFilePath);
  on(EVENTS.SET_KEY, onSetKey);
  on(EVENTS.SAVE_STATE, saveStateHandler.onSaveState);
  on(EVENTS.LOAD_STATE, onLoadState);
}

/** Unregister the callbacks. */
export function cleanup() {
  removeListener(EVENTS.IS_INITIALIZED, onIsInitialized);
  removeListener(EVENTS.GET_STORE_FILE_PATH, onGetStoreFilePath);
  removeListener(EVENTS.SET_KEY, onSetKey);
  removeListener(EVENTS.SAVE_STATE, saveStateHandler.onSaveState);
  removeListener(EVENTS.LOAD_STATE, onLoadState);
}
