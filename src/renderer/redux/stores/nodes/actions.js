import * as nodeService from 'services/node';

export const ACTIONS = {
  CREATE: 'NODES/CREATE',
  UPDATE: 'NODES/UPDATE',
  REMOVE: 'NODES/REMOVE',
  ADD_MODULE: 'NODES/ADD_MODULE',
  EDIT_MODULE: 'NODES/EDIT_MODULE',
  DELETE_MODULE: 'NODES/DELETE_MODULE',
};

/**
 * Create a node.
 *
 * @param {object} node - Node to create.
 * @returns {object} - Action.
 */
export const create = node => ({
  type: ACTIONS.CREATE,
  node: nodeService.create(node),
});

/**
 * Update a node.
 *
 * @param {object} node - Updated node.
 * @returns {object} - Action.
 */
export const update = node => ({
  type: ACTIONS.UPDATE,
  node,
});

/**
 * Delete a node.
 *
 * @param {object} node - Node to delete.
 * @returns {object} - Action.
 */
export const remove = node => ({
  type: ACTIONS.REMOVE,
  node,
});

/**
 * Add a module to a node.
 *
 * @param {string} nodeId - Node id.
 * @param {string} module - Module.
 * @param {string} module.type - Module type.
 * @param {string} module.name - Module name.
 * @param {object} module.options - Options to set on the module.
 * @returns {object} - Action.
 */
export const addModule = (nodeId, { type, name, options }) => ({
  type: ACTIONS.ADD_MODULE,
  nodeId,
  module: {
    type,
    name,
    options,
  },
});

/**
 * Edit a module on a node.
 *
 * @param {string} nodeId - Node id.
 * @param {string} module - Module.
 * @param {string} module.id - Module id.
 * @param {string} module.name - Module name.
 * @param {object} module.options - Options to set on the module.
 * @returns {object} - Action.
 */
export const editModule = (nodeId, { id, name, options }) => ({
  type: ACTIONS.EDIT_MODULE,
  nodeId,
  module: {
    id,
    name,
    options,
  },
});

/**
 * Delete a module on a node.
 *
 * @param {string} nodeId - Node id.
 * @param {string} moduleId - Module id.
 * @returns {object} - Action.
 */
export const deleteModule = (nodeId, moduleId) => ({
  type: ACTIONS.DELETE_MODULE,
  nodeId,
  moduleId,
});
