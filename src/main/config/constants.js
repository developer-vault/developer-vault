const path = require('path');

const { app } = require('electron');

module.exports = {
  /** Path to the file where the store is saved. */
  storeFilePath: path.join(app.getPath('userData'), 'store.dvdb'),
  /** Encryption algorithm used to encrypt the store file. */
  storeFileEncryptionAlgorithm: 'aes-256-cbc',
};
