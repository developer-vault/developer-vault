import { ipcMain } from 'electron';
import { uniqueId } from 'lodash';

export const send = async (channel, ...args) => {
  // forge unique id
  const id = uniqueId(`ipc_${channel}_`);

  // send an ipc request
  const promise = new Promise((resolve, reject) => {
    // send request
    ipcMain.send(channel, {
      id,
      payload: args,
    });

    // wait for resolution or rejection
    ipcMain.once(`${id}/result`, (event, data) => {
      if (data.type === 'resolve') {
        resolve(data.payload);
      } else {
        reject(data.payload);
      }
    });
  });

  try {
    return await promise;
  } catch (err) {
    throw err;
  }
};

export const responseMessageHandler = callback => async (event, { id, payload } = {}) => {
  try {
    return event.sender.send(`${id}/result`, {
      id,
      type: 'resolve',
      payload: await callback(...payload),
    });
  } catch (err) {
    return event.sender.send(`${id}/result`, {
      id,
      type: 'reject',
      payload: err,
    });
  }
};

export const on = (channel, callback) => ipcMain.on(channel, responseMessageHandler(callback));

export const removeListener = ipcMain.removeListener.bind(ipcMain);
