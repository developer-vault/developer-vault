import uuid from 'uuid/v4';

/**
 * Given a node, wrap it in an object with uuid as key.
 *
 * @param {Object} node - Node.
 * @returns {Object} - Wrapped node.
 */
export const create = (node) => {
  const uniqueId = uuid();
  return {
    [uniqueId]: { ...node, id: uniqueId },
  };
};

/**
 * Given the hashmap of nodes, build the tree.
 *
 * @param {Object} nodes - Nodes hashmap.
 * @returns {Array} - Tree.
 * @see index.spec.js for implementation and data structure.
 */
export const buildTree = (nodes) => {
  /**
   * Recursive function finding children for each node.
   *
   * @param {string | null} nodeId - Id of the node.
   * @param {Object} nodesHashmap - Hashmap of nodes.
   * @returns {Object[]} - Array of nodes with child in it.
   */
  const fetchChildren = (nodeId, nodesHashmap) => Object.values(nodesHashmap)
    .filter(node => node.parentId === nodeId)
    .map(node => ({
      ...node,
      children: fetchChildren(node.id, nodesHashmap),
    }));

  // Init recursion by getting all nodes without parent.
  return fetchChildren(null, nodes);
};
