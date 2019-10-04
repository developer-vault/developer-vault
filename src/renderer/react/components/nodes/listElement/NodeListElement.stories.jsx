import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import NodeListElement from './NodeListElement';

const node = {
  id: 'node1',
  label: 'node1',
  parentId: null,
};

storiesOf('Components/Nodes', module)
  .add(
    'Node list element',
    () => (
      <NodeListElement
        node={node}
        onAddChildNode={boolean('with edition controls', true) && action('onAddChildNode')}
        onEditNode={boolean('with edition controls', true) && action('onEditNode')}
        onDeleteNode={boolean('with edition controls', true) && action('onDeleteNode')}
      />
    ),
    { notes: 'A single node element, with controls if needed.' },
  );
