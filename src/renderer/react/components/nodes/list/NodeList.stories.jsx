import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { selectNodesTree } from 'redux/stores/nodes/selector';
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

const nodesTree = selectNodesTree({ nodes: nodesMap });

storiesOf('Components/Nodes', module)
  .add(
    'Node list',
    () => (
      <NodeList
        nodesMap={nodesMap}
        nodesTree={nodesTree}
        onAddChildNode={boolean('with edition controls', true) && action('node added')}
        onEditNode={boolean('with edition controls', true) && action('node edited')}
        onDeleteNode={boolean('with edition controls', true) && action('node deleted')}
      />
    ),
    { notes: 'Render the tree of nodes, with controls.' },
  );
