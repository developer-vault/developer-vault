import { createSelector } from 'reselect';
import { memoize } from 'lodash';
import { buildTree, getEligibleNewParents } from 'services/node';

export const selectNodesMap = state => state.nodes;

export const selectNodesTree = createSelector(
  state => state.nodes,
  nodes => buildTree(nodes),
);

export const selectEligibleNewParents = createSelector(
  selectNodesMap,
  nodesMap => memoize(
    nodeId => getEligibleNewParents(nodeId, nodesMap),
  ),
);
