import { deleteSubTree } from 'services/node';

import { ACTIONS } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return { ...state, ...action.node };
    case ACTIONS.UPDATE:
      return { ...state, [action.node.id]: action.node };
    case ACTIONS.REMOVE:
      return deleteSubTree(action.node.id, state);
    default:
      return state;
  }
};
