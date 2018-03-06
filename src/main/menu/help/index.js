const { app, dialog, shell } = require('electron');

const name = app.getName();
const version = app.getVersion();

module.exports = {
  role: 'help',
  submenu: [
    {
      label: 'Repository',
      /**
       * On click, open repository url using system default browser.
       */
      click() {
        shell.openExternal('https://github.com/developer-vault/developer-vault');
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Toggle Dev Tools',
      /**
       * On Click, toggle developer tools.
       *
       * @param {Object} item - The item clicked.
       * @param {Object} focusedWindow - The windows currently focused.
       */
      click(item, focusedWindow) {
        if (!focusedWindow) {
          return;
        }
        const { webContents: { isDevToolsOpened, closeDevTools, openDevTools } } = focusedWindow;

        if (isDevToolsOpened()) {
          closeDevTools();
        } else {
          openDevTools({ mode: 'detach' });
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'About',
      /**
       * On click, open dialog.
       */
      click() {
        dialog.showMessageBox({
          title: `About ${name}`,
          message: `${name} - ${version}`,
          details: `
          Thanks :
          - Sentry for the free OSS organization.
          -
          Licensed under MIT License`,
          buttons: [],
        });
      },
    },
  ],
};
