const { SET_KEY, SAVE_STATE, LOAD_STATE } = require('common/events');

const { saveFilePath } = require('../config/constants');
const { on, removeEventListener } = require('../ipc');
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
 * Handler function for the SAVE_STATE event.
 *
 * @async
 * @param {Object} state - State tree.
 */
function onSaveState(state) {
  return encryptToFile(state, KEY, saveFilePath);
}

/**
 * Handler function for the LOAD_STATE event.
 *
 * @async
 * @param {string} key - Key used at encryption, as an utf8 string.
 * @returns {Object} The state, or null if none saved.
 */
function onLoadState(key) {
  return decryptFromFile(key, saveFilePath);
}

/** Register the callbacks. */
function register() {
  on(SET_KEY, onSetKey);
  on(SAVE_STATE, onSaveState);
  on(LOAD_STATE, onLoadState);
}

/** Unregister the callbacks. */
function cleanup() {
  removeEventListener(SET_KEY, onSetKey);
  removeEventListener(SAVE_STATE, onSaveState);
  removeEventListener(LOAD_STATE, onLoadState);
}

module.exports = {
  register,
  cleanup,
};
