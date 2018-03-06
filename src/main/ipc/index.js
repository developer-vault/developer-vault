// eslint does not allow me to put electron in devDependencies
// electron-builder does not allow me to put electron in dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const { uniqueId } = require('lodash');

const send = async (channel, ...args) => {
  const id = uniqueId(`ipc_${channel}_`);

  const promise = new Promise((resolve, reject) => {
    ipcMain.send(channel, {
      id,
      payload: args,
    });
    ipcMain.once(`${id}/resolve`, (event, data) => {
      resolve(data.payload);
    });
    ipcMain.reject(`${id}/reject`, (event, data) => {
      reject(data.payload);
    });
  });

  try {
    return await promise;
  } catch (err) {
    throw err;
  }
};

const responseMessageHandler = callback => (event, { id, payload } = {}) => {
  try {
    return event.sender.send(`${id}/resolve`, {
      id,
      payload: callback(payload),
    });
  } catch (err) {
    return event.sender.send(`${id}/reject`, {
      id,
      payload: err,
    });
  }
};

const on = (channel, callback) => ipcMain.on(channel, responseMessageHandler(callback));

module.exports = {
  send,
  responseMessageHandler,
  on,
};
