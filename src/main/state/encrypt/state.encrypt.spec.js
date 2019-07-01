import mockFs from 'mock-fs';
import fs from 'fs-extra';

import {
  encrypt,
  decrypt,
  persistEncryptedState,
  decryptFromFile,
} from './index';

const payload = {
  a: 1,
  b: 2,
};

const version = '1.0.0';
const key = 'this is my key';
const salt = 'foobarfoobarfoobar';
const iv = 'eabf1dbe316a2539177336938ee20606';
const ALGORITHM = 'aes-256-cbc';

const encrypted = 'j4xzNa6FFl6OGk8rXWD0wA==';

const decryptedFileContent = {
  version,
  salt,
  iv,
  state: payload,
};

const encryptedFileContent = JSON.stringify({
  version,
  salt,
  iv,
  state: encrypted,
});

beforeAll(() => {
  mockFs({
    '/appData/developer-vault': {
      store: 'previousState',
      old: encryptedFileContent,
    },
  });
});

afterAll(() => {
  // Clean up.
  mockFs.restore();
});

describe('State encryption', () => {
  describe('Encrypt / decrypt', () => {
    it('encrypts the state', () => {
      expect(encrypt(payload, key, salt, iv, ALGORITHM)).toBe(encrypted);
    });

    it('decrypts the state', () => {
      expect(decrypt(encrypted, key, salt, iv, ALGORITHM)).toEqual(payload);
    });

    it('throws an error if the key is invalid', () => {
      expect(() => decrypt(encrypted, 'this is an invalid key', salt, iv, ALGORITHM))
        .toThrowError('error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt');
    });
  });

  describe('Save to file', () => {
    it('saves the state to a file', async () => {
      await persistEncryptedState(payload, version, key, salt, iv, ALGORITHM, '/appData/developer-vault/store');
      expect(await fs.readFile('/appData/developer-vault/store', { encoding: 'utf8' }))
        .toBe(encryptedFileContent);
    });

    it('creates the file if it does not exist', async () => {
      await persistEncryptedState(payload, version, key, salt, iv, ALGORITHM, '/appData/developer-vault/newFile');
      expect(await fs.readFile('/appData/developer-vault/store', { encoding: 'utf8' }))
        .toBe(encryptedFileContent);
    });
  });

  describe('Load from file', () => {
    it('loads the state from the save file', async () => {
      expect(await decryptFromFile(key, ALGORITHM, '/appData/developer-vault/old'))
        .toEqual(decryptedFileContent);
    });

    it('returns null if the file does not exist', async () => {
      expect(await decryptFromFile(key, ALGORITHM, '/appData/developer-vault/fileThatDoesNotExist'))
        .toBeNull();
    });

    it('throws if the path is invalid', async () => {
      expect.assertions(1);
      await expect(decryptFromFile(key, ALGORITHM, '/appData/developer-vault')).rejects
        .toThrowError('EBADF, bad file descriptor');
    });
  });
});
