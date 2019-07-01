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

  getVersion() {
    return '1.0.0';
  },
};

export const ipcMain = {
  /**
   * Mock of ipcMain.removeListener.
   */
  removeListener() { },
};
