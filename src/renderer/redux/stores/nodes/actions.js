import * as nodeService from 'services/node';

export const ACTIONS = {
  CREATE: 'NODES/CREATE',
  UPDATE: 'NODES/UPDATE',
  REMOVE: 'NODES/REMOVE',
};

export const create = (node) => ({
  type: ACTIONS.CREATE,
  node: nodeService.create(node),
});

export const update = (node) => ({
  type: ACTIONS.UPDATE,
  node,
});

export const remove = (node) => ({
  type: ACTIONS.REMOVE,
  node,
});
