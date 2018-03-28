const { SET_KEY, SAVE_STATE, LOAD_STATE } = require('common/events');

const { storeFilePath, storeFileEncryptionAlgorithm } = require('../config/constants');
const { on, removeListener } = require('../ipc');
const { encryptToFile, decryptFromFile } = require('./encrypt');

let KEY;

/**
 * Set the key.
 *
 * @param {string} key - The key as an utf8 string.
 */
function onSetKey(key) {
  KEY = key;
}

/**
 * Handler function for the LOAD_STATE event.
 *
 * @async
 * @param {string} key - Key used at encryption, as an utf8 string.
 * @returns {Object} The state, or null if none saved.
 */
function onLoadState(key) {
  return decryptFromFile(key, storeFileEncryptionAlgorithm, storeFilePath);
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
   * @param {Object} state - State tree.
   */
  this.onSaveState = (state) => {
    if (this.currentPromise) {
      this.pendingSave = state;
      return this.currentPromise;
    }

    this.currentPromise = encryptToFile(state, KEY, storeFileEncryptionAlgorithm, storeFilePath)
      .then(() => {
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

const saveStateHandler = new SaveStateHandler();

/** Register the callbacks. */
function register() {
  on(SET_KEY, onSetKey);
  on(SAVE_STATE, saveStateHandler.onSaveState);
  on(LOAD_STATE, onLoadState);
}

/** Unregister the callbacks. */
function cleanup() {
  removeListener(SET_KEY, onSetKey);
  removeListener(SAVE_STATE, saveStateHandler.onSaveState);
  removeListener(LOAD_STATE, onLoadState);
}

module.exports = {
  register,
  cleanup,
  saveStateHandler,
};
