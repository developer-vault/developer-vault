import path from 'path';

import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import { makeMenu } from './menu';
import { register as registerStateIpc, saveStateHandler } from './state';

/**
 * FIXME this will be set to true by default in Electron 9 and removed in Electron 11.
 */
app.allowRendererProcessReuse = true;

/**
 * Add developer tools to renderer window.
 *
 * @async
 */
async function init() {
  await Promise.all([
    !app.isPackaged && installExtension(REACT_DEVELOPER_TOOLS),
    !app.isPackaged && installExtension(REDUX_DEVTOOLS),
  ].filter(Boolean));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/**
 * Creates main window.
 */
async function createWindow() {
  await init();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // And load the index.html of the app.
  if (app.isPackaged) {
    mainWindow.loadFile(path.resolve(app.getAppPath(), './renderer/index.html'));
  } else {
    mainWindow.loadURL(`http://localhost:${process.env.VAULT_WDS_PORT}`);
  }

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
