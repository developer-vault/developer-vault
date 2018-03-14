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

    // wait for resolution or rejection
    ipcRenderer.once(`${id}/result`, (event, data) => {
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
