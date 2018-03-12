/** From http://lollyrock.com/articles/nodejs-encryption/. */

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypt the state with the given key.
 *
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt.
 * @returns {string} The state encrypted, as an utf-8 string.
 */
function encrypt(state, key) {
  const cipher = crypto.createCipher(ALGORITHM, key);
  return cipher.update(JSON.stringify(state), 'utf8', 'base64') + cipher.final('base64');
}

/**
 * Decrypt the state with the given key.
 *
 * @param {Object} encryptedState - Encrypted state, as an utf8 string.
 * @param {string} key - Key used to encrypt.
 * @returns {Object} The state tree, decrypted.
 */
function decrypt(encryptedState, key) {
  const decipher = crypto.createDecipher(ALGORITHM, key);
  const decrypted = decipher.update(encryptedState, 'base64', 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted);
}

module.exports = {
  encrypt,
  decrypt,
};
