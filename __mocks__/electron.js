export const app = {
  /**
   * Mock of electron app.getPath.
   *
   * @param {string} name - Ignored.
   * @returns {string} The corresponding path.
   */
  getPath(name) {
    switch (name) {
      default:
        return '';
    }
  },
};

export const ipcMain = {
  /**
   * Mock of ipcMain.removeListener.
   */
  removeListener() { },
};