import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { nodeShape } from 'react/shapes/node';

import NodeManagerListElement from './NodeManagerListElement';

export default class NodeManagerList extends React.PureComponent {
  static propTypes = {
    onAddNode: PropTypes.func,
    onEditNode: PropTypes.func,
    nodeList: PropTypes.objectOf(nodeShape),
  };

  static defaultProps = {
    onAddNode: noop,
    onEditNode: noop,
    nodeList: {},
  };

  /**
   * Proxies the onAddNode function.
   *
   * This way, the onAddNode from parents receives a null value
   * instead of the event from the clicked button.
   */
  onAddNode = () => this.props.onAddNode();

  /** Render component. */
  render() {
    const { nodeList, onEditNode } = this.props;

    return (
      <React.Fragment>
        <h1>List</h1>
        {Object.values(nodeList).map(node => (
          <NodeManagerListElement
            node={node}
            key={node.id}
            onEditNode={onEditNode}
          />
        ))}
        <button onClick={this.onAddNode}>Add</button>
      </React.Fragment>
    );
  }
}
