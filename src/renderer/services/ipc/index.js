import { uniqueId } from 'lodash';

const { ipcRenderer } = window && window.electron;

export const send = async (channel, ...args) => {
  const id = uniqueId(`ipc_${channel}_`);

  const promise = new Promise((resolve, reject) => {
    // request
    ipcRenderer.send(
      channel,
      {
        id,
        payload: args,
      },
    );

    // handle first answer
    ipcRenderer.once(`${id}/resolve`, (event, data) => {
      resolve(data.payload);
    });
    ipcRenderer.once(`${id}/reject`, (event, data) => {
      reject(data.payload);
    });
  });

  try {
    return await promise;
  } catch (err) {
    throw err;
  }
};

export const responseMessageHandler = callback => async (event, { id, payload }) => {
  try {
    return event.sender.send(`${id}/resolve`, {
      id,
      payload: await callback(payload),
    });
  } catch (err) {
    return event.sender.send(`${id}/reject`, {
      id,
      payload: err,
    });
  }
};

export const on = (channel, callback) => ipcRenderer.on(channel, responseMessageHandler(callback));

