import uuid from 'uuid/v4';
import { flattenDeep, omitBy } from 'lodash';

/**
 * Given a node, wrap it in an object with uuid as key.
 *
 * @param {object} node - Node.
 * @returns {object} - Wrapped node.
 */
export const create = node => ({ ...node, id: uuid() });

/**
 * Recursive function finding children for each node.
 *
 * @param {string | null} nodeId - Id of the node.
 * @param {object} nodesHashmap - Hashmap of nodes.
 * @returns {object[]} - Array of nodes with child in it.
 */
export const fetchChildrenRecursively = (nodeId, nodesHashmap) => Object.values(nodesHashmap)
  .filter(node => node.parentId === nodeId)
  .map(node => ({
    ...node,
    children: fetchChildrenRecursively(node.id, nodesHashmap),
  }));

/**
 * Given the hashmap of nodes, build the tree.
 *
 * Init recursion by getting all nodes without parent.
 *
 * @param {object} nodes - Nodes hashmap.
 * @returns {Array} - Tree.
 * @see index.spec.js for implementation and data structure.
 */
export const buildTree = nodes => fetchChildrenRecursively(null, nodes);

/**
 * Browse a subtree in order to find all elements.
 *
 * @param {object[]} subtree - Subtree.
 * @returns {string[]} - All ids we could find in subtree.
 */
export const listAllElementIdsInSubtree = (subtree) => {
  // Recursively get children and add them in an array.
  const allChildrenNested = (subtree || []).map(node => ((node.children || []).length > 0
    ? [node.id, ...listAllElementIdsInSubtree(node.children)]
    : [node.id]));

  // And flatten everything in order to get a list.
  return flattenDeep(allChildrenNested);
};

/**
 * Given a node id and the node hashmap, get ids of descendants.
 *
 * @param {string} nodeId - Node id.
 * @param {object} nodes - Node hashmap.
 * @returns {string[]} - Descendants ids.
 */
export const listDescendants = (nodeId, nodes) => {
  const subtree = fetchChildrenRecursively(nodeId, nodes);
  return listAllElementIdsInSubtree(subtree);
};

/**
 * Remove a node and all its descendants from hashmap.
 *
 * @param {string} nodeId - Id of the targeted node.
 * @param {object} nodes - Node hashmap.
 * @returns {object} - New node hashmap.
 */
export const deleteSubTree = (nodeId, nodes) => {
  // Mark all descendants and the node itself.
  const markedForDeletion = [...listDescendants(nodeId, nodes), nodeId];
  const filterFunction = node => markedForDeletion.includes(node.id);

  return omitBy(nodes, filterFunction);
};

/**
 * Returns all nodes that can be current node
 * new parent without causing an infinite recursion.
 *
 * @param {string} nodeId - Id of the targeted node.
 * @param {object} nodes - Node hashmap.
 * @returns {string[]} - Ids of eligible nodes.
 */
export const getEligibleNewParents = (nodeId, nodes) => {
  const allNodeIds = Object.keys(nodes);

  if (!nodeId) {
    // No nodeId was passed, it means that all
    // node could be a parent (we're in a creation).
    return allNodeIds;
  }

  // Non available parents are current node and all its descendants.
  const nonAvailableParents = [nodeId, ...listDescendants(nodeId, nodes)];

  // Invert the list by returning all that are not non-available.
  return allNodeIds
    .filter(currentNodeId => !nonAvailableParents.includes(currentNodeId));
};
