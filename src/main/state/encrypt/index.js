/** From http://lollyrock.com/articles/nodejs-encryption/. */

const crypto = require('crypto');

const fse = require('fs-extra');

const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypt the state with the given key.
 *
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @returns {string} The state encrypted, as an utf8 string.
 */
function encrypt(state, key) {
  const cipher = crypto.createCipher(ALGORITHM, key);
  return cipher.update(JSON.stringify(state), 'utf8', 'base64') + cipher.final('base64');
}

/**
 * Decrypt the state with the given key.
 *
 * @param {Object} encryptedState - Encrypted state, as an utf8 string.
 * @param {string} key - Key used to encrypt, as an utf8 string.
 * @returns {Object} The state tree, decrypted.
 */
function decrypt(encryptedState, key) {
  const decipher = crypto.createDecipher(ALGORITHM, key);
  const decrypted = decipher.update(encryptedState, 'base64', 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted);
}

/**
 * Encrypt the state and write to a file.
 *
 * @async
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @param {string} saveFilePath - Path to the file where to write.
 */
function encryptToFile(state, key, saveFilePath) {
  const encrypted = encrypt(state, key);

  return fse.writeFile(
    saveFilePath,
    encrypted,
    {
      encoding: 'utf8',
    },
  );
}

/**
 * Decrypt the state from the save file.
 *
 * @async
 * @param {string} key - Key used to encrypt, as an utf8 string.
 * @param {string} saveFilePath - Path to the file where the store is saved.
 * @returns {Object} The decrypted state, or null if the file does not exist.
 */
async function decryptFromFile(key, saveFilePath) {
  let encrypted;
  try {
    encrypted = await fse.readFile(saveFilePath, { encoding: 'utf8' });
  } catch (err) {
    // If the file does not exist, return null.
    if (err.code === 'ENOENT') {
      return null;
    }

    // Otherwise, rethrow the error.
    throw err;
  }

  return decrypt(encrypted, key);
}

module.exports = {
  encrypt,
  decrypt,
  encryptToFile,
  decryptFromFile,
};
