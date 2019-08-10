import {
  isInitialized,
  getStoreFilePath,
  setKey,
  loadState,
} from 'services/state';

export const ACTIONS = {
  IS_INITIALIZED: 'APP/IS_INITIALIZED',
  GET_STORE_FILE_PATH: 'APP/GET_STORE_FILE_PATH',
  REGISTER: 'APP/REGISTER',
  LOGIN: 'APP/LOGIN',
};

export const IS_INITIALIZED = initialized => ({
  type: ACTIONS.IS_INITIALIZED,
  initialized,
});

export const isInitializedAction
  = () => async dispatch => dispatch(IS_INITIALIZED(await isInitialized()));

export const GET_STORE_FILE_PATH = storeFilePath => ({
  type: ACTIONS.IS_INITIALIZED,
  storeFilePath,
});

export const getStoreFilePathAction
  = () => async dispatch => dispatch(GET_STORE_FILE_PATH(await getStoreFilePath()));

export const REGISTER = () => ({
  type: ACTIONS.REGISTER,
});

export const registerAction = key => async dispatch => dispatch(REGISTER(await setKey(key)));

export const LOGIN = state => ({
  type: ACTIONS.LOGIN,
  state,
});

export const loginAction = key => async dispatch => dispatch(LOGIN(await loadState(key)));
