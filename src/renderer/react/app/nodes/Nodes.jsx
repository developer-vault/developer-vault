import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import NodeManager from './manager/NodeManager';
import NodeWorkZone from './workzone/NodeWorkZone';

const withNodeSelector = withStateHandlers(
  { activeNodeId: null },
  {
    onActiveNode: () => node => ({ activeNodeId: node.id }),
  },
);

const enhancer = compose(
  withNodeSelector,
);

const Nodes = ({
  activeNodeId,
  onActiveNode,
}) => (
  <div>
    <NodeManager
      onActiveNode={onActiveNode}
      activeNodeId={activeNodeId}
    />
    <NodeWorkZone
      activeNodeId={activeNodeId}
    />
  </div>
);

Nodes.displayName = 'Nodes';

Nodes.propTypes = {
  activeNodeId: PropTypes.string,
  onActiveNode: PropTypes.func.isRequired,
};

Nodes.defaultProps = {
  activeNodeId: null,
};

export default enhancer(Nodes);
