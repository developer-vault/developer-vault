import { deleteSubTree } from 'services/node';

import { ACTIONS as APP_ACTIONS } from 'redux/stores/app/actions';
import { ACTIONS } from './actions';

export default (state = null, action) => {
  switch (action.type) {
    case APP_ACTIONS.REGISTER:
      return {};
    case APP_ACTIONS.LOGIN:
      return action.state || {};

    case ACTIONS.CREATE:
    case ACTIONS.UPDATE:
      return { ...state, [action.node.id]: action.node };
    case ACTIONS.REMOVE:
      return deleteSubTree(action.node.id, state);

    default:
      return state;
  }
};
