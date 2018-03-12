// eslint does not allow me to put electron in devDependencies
// electron-builder does not allow me to put electron in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

window.electron = {
  ipcRenderer,
};
