import { isInitialized } from 'services/state';

export const ACTIONS = {
  IS_INITIALIZED: 'APP/IS_INITIALIZED',
};

export const IS_INITIALIZED = initialized => ({
  type: ACTIONS.IS_INITIALIZED,
  initialized,
});

export const isInitializedAction = () =>
  async dispatch => dispatch(IS_INITIALIZED(await isInitialized()));
