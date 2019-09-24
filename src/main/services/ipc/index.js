import { ipcMain } from 'electron';

import { makeIpcPromiseWrapper } from 'shared/services/ipc';

export { responseMessageHandler } from 'shared/services/ipc';
export const {
  send,
  on,
  removeListener,
} = makeIpcPromiseWrapper(ipcMain);
