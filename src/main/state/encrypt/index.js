/** From http://lollyrock.com/articles/nodejs-encryption/. */

const crypto = require('crypto');

const fse = require('fs-extra');

/**
 * Is user registered ?
 * That would mean that the app is initialized and that the store file exists.
 *
 * @async
 * @param {string} storeFilePath - Where to find the store file.
 * @returns {bool} Whether the store file exists.
 */
function isInitialized(storeFilePath) {
  return fse.pathExists(storeFilePath);
}

/**
 * Encrypt the state with the given key.
 *
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @returns {string} The state encrypted, as an utf8 string.
 */
function encrypt(state, key, algorithm) {
  const cipher = crypto.createCipher(algorithm, key);
  return cipher.update(JSON.stringify(state), 'utf8', 'base64') + cipher.final('base64');
}

/**
 * Decrypt the state with the given key.
 *
 * @param {Object} encryptedState - Encrypted state, as an utf8 string.
 * @param {string} key - Key used to encrypt, as an utf8 string.
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @returns {Object} The state tree, decrypted.
 */
function decrypt(encryptedState, key, algorithm) {
  const decipher = crypto.createDecipher(algorithm, key);
  const decrypted = decipher.update(encryptedState, 'base64', 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted);
}

/**
 * Encrypt the state and write to a file.
 *
 * @async
 * @param {Object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @param {string} storeFilePath - Path to the file where to write.
 */
function persistEncryptedState(state, key, algorithm, storeFilePath) {
  const encrypted = encrypt(state, key, algorithm);

  return fse.writeFile(
    storeFilePath,
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
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @param {string} storeFilePath - Path to the file where the store is saved.
 * @returns {Object} The decrypted state, or null if the file does not exist.
 */
async function decryptFromFile(key, algorithm, storeFilePath) {
  let encrypted;
  try {
    encrypted = await fse.readFile(storeFilePath, { encoding: 'utf8' });
  } catch (err) {
    // If the file does not exist, return null.
    if (err.code === 'ENOENT') {
      return null;
    }

    // Otherwise, rethrow the error.
    throw err;
  }

  return decrypt(encrypted, key, algorithm);
}

module.exports = {
  isInitialized,
  encrypt,
  decrypt,
  persistEncryptedState,
  decryptFromFile,
};
