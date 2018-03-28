import { ACTIONS as APP_ACTIONS } from 'redux/stores/app/actions';

export default (state = null, action) => {
  switch (action.type) {
    case APP_ACTIONS.REGISTER:
      return {};
    case APP_ACTIONS.LOGIN:
      return action.state || {};
    default:
      return state;
  }
};
