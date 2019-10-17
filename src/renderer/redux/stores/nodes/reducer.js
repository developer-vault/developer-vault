import { addModuleOnNode, deleteSubTree, editModuleOnNode, deleteModuleOnNode } from 'services/node';

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

    case ACTIONS.ADD_MODULE:
      return {
        ...state,
        [action.nodeId]: addModuleOnNode(state[action.nodeId], action.module),
      };

    case ACTIONS.EDIT_MODULE:
      return {
        ...state,
        [action.nodeId]: editModuleOnNode(state[action.nodeId], action.module),
      };

    case ACTIONS.DELETE_MODULE:
      return {
        ...state,
        [action.nodeId]: deleteModuleOnNode(state[action.nodeId], action.moduleId),
      };
    default:
      return state;
  }
};
