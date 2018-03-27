// eslint does not allow me to put electron in devDependencies
// electron-builder does not allow me to put electron in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');
// app - Module to control application life.
// BrowserWindow - Module to create native browser window.
const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');

// Allow using `require('common/events'); from inside main process
require('app-module-path').addPath(path.join(__dirname, '..'));

const { makeMenu } = require('./menu');
const { register: registerStateIpc, saveStateHandler } = require('./state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/**
 * Creates main window.
 */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  makeMenu();
  registerStateIpc();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Emitted when calling app.quit(), or when window-all-closed is not defined.
app.on('will-quit', (event) => {
  // If there is a save pending, stop exiting and wait before the save is complete.
  if (saveStateHandler.currentPromise) {
    event.preventDefault();
    saveStateHandler.currentPromise.then(() => app.quit());
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
