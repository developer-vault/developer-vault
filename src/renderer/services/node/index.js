/* eslint-disable import/prefer-default-export */
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
