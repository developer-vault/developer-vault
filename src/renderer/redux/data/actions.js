import { setKey } from 'services/state';

export const ACTIONS = {
  REGISTER: 'DATA/REGISTER',
};

export const REGISTER = storeFilePath => ({
  type: ACTIONS.REGISTER,
  storeFilePath,
});

export const register = key => async dispatch => dispatch(REGISTER(await setKey(key)));
