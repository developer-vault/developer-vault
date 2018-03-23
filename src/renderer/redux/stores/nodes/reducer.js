import { omit } from 'lodash';
import { ACTIONS } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return { ...state, ...action.node };
    case ACTIONS.UPDATE:
      return { ...state, [action.node.id]: action.node };
    case ACTIONS.REMOVE:
      return omit(state, action.node.id);
    default:
      return state;
  }
};
