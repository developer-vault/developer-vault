import { createSelector } from 'reselect';
import { buildTree } from 'services/node';

export const getNodesMap = state => state.nodes;

export const getNodesTree = createSelector(
  state => state.nodes,
  nodes => buildTree(nodes),
);
