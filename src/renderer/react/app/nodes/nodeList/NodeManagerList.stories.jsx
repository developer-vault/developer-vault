import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NodeManagerList from './NodeManagerList';

const nodes = {
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

storiesOf('App/Nodes', module)
  .add(
    'Node manager list',
    () => (
      <NodeManagerList
        nodeList={nodes}
        onAddNode={action('node added')}
        onEditNode={action('node edited')}
        onDeleteNode={action('node deleted')}
      />
    ),
    { notes: 'Render the tree of nodes, with controls.' },
  );
