import { app, dialog, shell } from 'electron';

const name = app.getName();
const version = app.getVersion();

export default {
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
       * @param {object} item - The item clicked.
       * @param {object} focusedWindow - The windows currently focused.
       */
      click(item, focusedWindow) {
        if (!focusedWindow) {
          return;
        }
        const { webContents } = focusedWindow;

        if (webContents.isDevToolsOpened()) {
          webContents.closeDevTools();
        } else {
          webContents.openDevTools({ mode: 'detach' });
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
