const { ipcRenderer } = require('electron');
const { EventEmitter } = require('events');

// This file is loaded by the renderer process.
// eslint-disable-next-line no-undef
window.electron = {
  ipcRenderer,
  EventEmitter,
};
