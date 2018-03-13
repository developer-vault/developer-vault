const { SAVE_STATE, LOAD_STATE } = require('common/events');

const { saveFilePath } = require('../config/constants');
const { on, removeEventListener } = require('../ipc');
const { encryptToFile, decryptFromFile } = require('./encrypt');

/**
 * Handler function for the SAVE_STATE event.
 *
 * @async
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 */
function onSaveState(state, key) {
  return encryptToFile(state, key, saveFilePath);
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
  on(SAVE_STATE, onSaveState);
  on(LOAD_STATE, onLoadState);
}

/** Unregister the callbacks. */
function cleanup() {
  removeEventListener(SAVE_STATE, onSaveState);
  removeEventListener(LOAD_STATE, onLoadState);
}

module.exports = {
  register,
  cleanup,
};
