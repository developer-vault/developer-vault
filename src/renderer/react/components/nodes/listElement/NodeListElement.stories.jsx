import React from 'react';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import NodeListElement from './NodeListElement';

const node = {
  id: 'node1',
  label: 'node1',
  parentId: null,
};

storiesOf('Components/Nodes', module)
  .add('Node list element', withNotes('A single node element, with controls if needed.')(() => (
    <NodeListElement
      node={node}
      onAddChildNode={action('onAddChildNode')}
      onEditNode={action('onEditNode')}
      onDeleteNode={action('onDeleteNode')}
    />
  )));
