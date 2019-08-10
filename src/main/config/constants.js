import path from 'path';

import { app } from 'electron';

export default {
  STORE: {
    /** Path to the file where the store is saved. */
    PATH: path.join(app.getPath('userData'), 'store.dvdb'),
    /** Encryption algorithm used to encrypt the store file. */
    ENCRYPTION_ALGORITHM: 'aes-256-cbc',
  },
};
