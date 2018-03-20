import * as nodeService from 'renderer/services/node';

export const ACTIONS = {
  CREATE: 'NODES/CREATE',
  UPDATE: 'NODES/UPDATE',
  REMOVE: 'NODES/REMOVE',
};

export const create = node => ({
  type: ACTIONS.CREATE,
  node: nodeService.create(node),
});

export const update = (nodeId, node) => ({
  type: ACTIONS.UPDATE,
  nodeId,
  node,
});

export const remove = nodeId => ({
  type: ACTIONS.REMOVE,
  nodeId,
});
