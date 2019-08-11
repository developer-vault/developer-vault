/** From http://lollyrock.com/articles/nodejs-encryption/. */

import {
  scrypt,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'crypto';
import { promisify } from 'util';

import fse from 'fs-extra';

const scryptPromise = promisify(scrypt);

/**
 * Encrypt the state with the given key.
 *
 * @param {object} state - State tree.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @param {string} salt - Salt paired with the key (hex string).
 * @param {string} iv - Initialization vector of encryption (hex string).
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @returns {string} The state encrypted, as an utf8 string.
 */
export async function encrypt(state, key, salt, iv, algorithm) {
  const derivedKey = await scryptPromise(key, salt, 32);
  const cipher = createCipheriv(algorithm, derivedKey, Buffer.from(iv, 'hex'));
  return cipher.update(JSON.stringify(state), 'utf8', 'base64') + cipher.final('base64');
}

/**
 * Decrypt the state with the given key, salt, iv and algorithm.
 *
 * @param {object} encryptedState - Encrypted state, as an utf8 string.
 * @param {string} key - Key used to encrypt, as an utf8 string.
 * @param {string} salt - Salt paired with the key (hex string).
 * @param {string} iv - Initialization vector of encryption (hex string).
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @returns {object} The state tree, decrypted.
 */
export async function decrypt(encryptedState, key, salt, iv, algorithm) {
  const derivedKey = await scryptPromise(key, salt, 32);
  const decipher = createDecipheriv(algorithm, derivedKey, Buffer.from(iv, 'hex'));
  const decrypted = decipher.update(encryptedState, 'base64', 'utf8') + decipher.final('utf8');
  return JSON.parse(decrypted);
}

/**
 * Encrypt the state and write to a file.
 *
 * @async
 * @param {object} state - State tree.
 * @param {string} version - Current app version.
 * @param {string} key - Key to encrypt, as an utf8 string.
 * @param {string} salt - Salt paired with the key (hex string).
 * @param {string} iv - Initialization vector of encryption (hex string).
 * @param {string} algorithm - Algorithm used to encrypt the state.
 * @param {string} storeFilePath - Path to the file where to write.
 */
export async function persistEncryptedState(
  state,
  version,
  key,
  salt,
  iv,
  algorithm,
  storeFilePath,
) {
  const encryptedState = await encrypt(state, key, salt, iv, algorithm);

  const fileContent = JSON.stringify({
    version,
    salt,
    iv,
    state: encryptedState,
  });

  return fse.writeFile(
    storeFilePath,
    fileContent,
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
 * @returns {object} The decrypted state, or null if the file does not exist.
 */
export async function decryptFromFile(key, algorithm, storeFilePath) {
  let fileContent;
  try {
    fileContent = await fse.readFile(storeFilePath, { encoding: 'utf8' });
  } catch (err) {
    // If the file does not exist, return null.
    if (err.code === 'ENOENT') {
      return null;
    }

    // Otherwise, rethrow the error.
    throw err;
  }

  const {
    version,
    salt,
    iv,
    state: encrypted,
  } = JSON.parse(fileContent);

  return {
    version,
    salt,
    iv,
    state: await decrypt(encrypted, key, salt, iv, algorithm),
  };
}

/**
 * Generate a random salt.
 *
 * @returns {string} The generated salt.
 */
export function generateRandomSalt() {
  return randomBytes(8).toString('hex');
}

/**
 * Generate a random initialization vector.
 *
 * @returns {string} The generated IV.
 */
export function generateRandomIV() {
  return randomBytes(16).toString('hex');
}
