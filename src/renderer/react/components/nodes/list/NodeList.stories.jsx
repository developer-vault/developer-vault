import React from 'react';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { getNodesTree } from 'redux/stores/nodes/selector';
import NodeList from './NodeList';

const nodesMap = {
  node1: {
    id: 'node1',
    label: 'node1',
    parentId: null,
  },
  node2: {
    id: 'node2',
    label: 'node2',
    parentId: null,
  },
  node11: {
    id: 'node11',
    label: 'node11',
    parentId: 'node1',
  },
  node12: {
    id: 'node12',
    label: 'node12',
    parentId: 'node1',
  },
  node121: {
    id: 'node121',
    label: 'node121',
    parentId: 'node12',
  },
  node122: {
    id: 'node122',
    label: 'node122',
    parentId: 'node12',
  },
};

const nodesTree = getNodesTree({ nodes: nodesMap });

storiesOf('Components/Nodes', module)
  .add('Node list', withNotes('Render the tree of nodes, with controls.')(() => (
    <NodeList
      nodesMap={nodesMap}
      nodesTree={nodesTree}
      onAddChildNode={action('node added')}
      onEditNode={action('node edited')}
      onDeleteNode={action('node deleted')}
    />
  )));
