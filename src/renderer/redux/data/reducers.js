import { ACTIONS } from './actions';

export default (state = null, action) => {
  switch (action.type) {
    case ACTIONS.REGISTER:
      return { storeFilePath: action.storeFilePath };
    default:
      return state;
  }
};
