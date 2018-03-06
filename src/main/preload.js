const { EventEmitter } = require('events');
const { ipcRenderer } = require('electron');

window.electron = {
  ipcRenderer,
  EventEmitter,
};

