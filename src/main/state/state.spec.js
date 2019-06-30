import mockFs from 'mock-fs';
import fse from 'fs-extra';

import { saveStateHandler } from './index';
import { persistEncryptedState } from './encrypt';

jest.mock('./encrypt');
jest.mock('../config/constants');

beforeAll(() => {
  mockFs({
    '/appData/developer-vault': {
      store: 'previousState',
    },
  });
});

afterAll(() => {
  // Clean up.
  mockFs.restore();
});

describe('State persistence', () => {
  describe('OnSaveState', () => {
    it('saves the last state when called multiple times', async () => {
      saveStateHandler.onSaveState({ a: 1 });
      saveStateHandler.onSaveState({ a: 2 });
      saveStateHandler.onSaveState({ a: 3 });

      // The saveStateHandler.currentPromise should only resolve
      // when subsequent calls to onSaveState have been resolved.
      const promise = saveStateHandler.currentPromise;
      saveStateHandler.onSaveState({ a: 4 });
      await promise;

      const fileContent = await fse.readFile('/appData/developer-vault/store', { encoding: 'utf8' });

      // The method should have been called on the first call, then on the last.
      expect(persistEncryptedState).toHaveBeenCalledTimes(2);

      // The content of the save file should be the last state requested to be saved.
      expect(JSON.parse(fileContent)).toEqual({ a: 4 });
    });
  });
});
