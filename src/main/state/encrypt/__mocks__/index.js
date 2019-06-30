import fse from 'fs-extra';

/**
 * Write to a file without encrypting.
 * Use with mock-fs.
 *
 * @async
 *
 * @param {object} state - State.
 * @param {string} key - Ignored.
 * @param {string} algorithm - Ignored.
 * @param {string} storeFilePath - Path where the file will be written.
 */
export const persistEncryptedState = jest.fn((
  state,
  key,
  algorithm,
  storeFilePath,
) => fse.writeFile(
  storeFilePath,
  JSON.stringify(state),
  { encoding: 'utf8' },
));

/**
 * Read the state from the save file. The data is not encrypted.
 *
 * @async
 *
 * @param {string} key - Ignored.
 * @param {string} algorithm - Ignored.
 * @param {string} storeFilePath - Path to the file where the store is saved.
 * @returns {object} The decrypted state, or null if the file does not exist.
 */
export const decryptFromFile = jest.fn(async (
  key,
  algorithm,
  storeFilePath,
) => {
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

  return JSON.parse(encrypted);
});
