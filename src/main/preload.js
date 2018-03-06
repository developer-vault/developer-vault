// eslint does not allow me to put electron in devDependencies
// electron-builder does not allow me to put electron in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const { EventEmitter } = require('events');

window.electron = {
  ipcRenderer,
  EventEmitter,
};

