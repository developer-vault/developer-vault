import { uniqueId } from 'lodash';
import { ipcRenderer } from 'electron';

export const send = async (channel, ...args) => {
  const id = uniqueId(`ipc_${channel}_`);

  return new Promise((resolve, reject) => {
    // request
    ipcRenderer.send(
      channel,
      {
        id,
        payload: args,
      },
    );

    // wait for resolution or rejection
    ipcRenderer.once(`${id}/result`, (event, data) => {
      if (data.type === 'resolve') {
        resolve(data.payload);
      } else {
        reject(data.payload);
      }
    });
  });
};

export const responseMessageHandler = callback => async (event, { id, payload }) => {
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

export const on = (channel, callback) => ipcRenderer.on(channel, responseMessageHandler(callback));
