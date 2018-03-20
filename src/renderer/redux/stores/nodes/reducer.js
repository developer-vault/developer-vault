import { omit } from 'lodash';
import { ACTIONS } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return { ...state, ...action.node };
    case ACTIONS.UPDATE:
      return { ...state, [action.nodeId]: action.node };
    case ACTIONS.REMOVE:
      return omit(state, action.nodeId);
    default:
      return state;
  }
};
