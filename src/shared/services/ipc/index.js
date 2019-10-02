import { uniqueId } from 'lodash';

export const responseMessageHandler = callback => async (event, { id, payload } = {}) => {
  try {
    return event.sender.send(
      `${id}/result`,
      {
        id,
        type: 'resolve',
        payload: await callback(...payload),
      },
    );
  } catch (err) {
    return event.sender.send(
      `${id}/result`,
      {
        id,
        type: 'reject',
        payload: err,
      },
    );
  }
};

export const makeIpcPromiseWrapper = (ipc) => {
  const send = async (channel, ...args) => {
    // Forge unique id.
    const id = uniqueId(`ipc_${channel}_`);

    // Send an ipc request.
    return new Promise((resolve, reject) => {
      // Send request.
      ipc.send(
        channel,
        {
          id,
          payload: args,
        },
      );

      // wait for resolution or rejection
      ipc.once(`${id}/result`, (event, data) => {
        if (data.type === 'resolve') {
          resolve(data.payload);
        } else {
          reject(data.payload);
        }
      });
    });
  };

  const on = (channel, callback) => ipc.on(channel, responseMessageHandler(callback));

  const removeListener = ipc.removeListener.bind(ipc);

  return {
    send,
    on,
    removeListener,
  };
};
