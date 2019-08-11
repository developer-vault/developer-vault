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

  /**
   * Mock of electron app.getVersion.
   *
   * @returns {string} Hardcoded version.
   */
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

export const ipcRenderer = {
  /**
   * Mock of ipcRenderer.removeListener.
   */
  removeListener() { },
};
