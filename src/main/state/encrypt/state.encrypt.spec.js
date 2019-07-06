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

const key = 'this is my key';
const ALGORITHM = 'aes-256-cbc';

const encrypted = '/4i5YVt2YANISN9kTRYz9A==';

beforeAll(() => {
  mockFs({
    '/appData/developer-vault': {
      store: 'previousState',
      old: encrypted,
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
      expect(encrypt(payload, key, ALGORITHM)).toBe(encrypted);
    });

    it('decrypts the state', () => {
      expect(decrypt(encrypted, key, ALGORITHM)).toEqual(payload);
    });

    it('throws an error if the key is invalid', () => {
      expect(() => decrypt(encrypted, 'this is an invalid key', ALGORITHM))
        .toThrowError('error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt');
    });
  });

  describe('Save to file', () => {
    it('saves the state to a file', async () => {
      await persistEncryptedState(payload, key, ALGORITHM, '/appData/developer-vault/store');
      expect(await fs.readFile('/appData/developer-vault/store', { encoding: 'utf8' }))
        .toBe(encrypted);
    });

    it('creates the file if it does not exist', async () => {
      await persistEncryptedState(payload, key, ALGORITHM, '/appData/developer-vault/newFile');
      expect(await fs.readFile('/appData/developer-vault/store', { encoding: 'utf8' }))
        .toBe(encrypted);
    });
  });

  describe('Load from file', () => {
    it('loads the state from the save file', async () => {
      expect(await decryptFromFile(key, ALGORITHM, '/appData/developer-vault/old'))
        .toEqual(payload);
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
