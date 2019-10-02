import { createSelector } from 'reselect';
import { buildTree, getEligibleNewParents } from 'services/node';

export const selectNodesMap = state => state.nodes;

export const selectNodesTree = createSelector(
  state => state.nodes,
  nodes => buildTree(nodes),
);

export const selectEligibleNewParents = createSelector(
  [
    (state, nodeId) => nodeId,
    selectNodesMap,
  ],
  getEligibleNewParents,
);
