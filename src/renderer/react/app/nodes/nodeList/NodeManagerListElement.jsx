import React from 'react';
import PropTypes from 'prop-types';
import { nodeShape } from 'react/shapes/node';

export default class NodeManagerListElement extends React.PureComponent {
  static propTypes = {
    /** Current node. */
    node: nodeShape,
    /** Called when edit button is clicked. */
    onEditNode: PropTypes.func,
    /** Called when delete button is clicked. */
    onDeleteNode: PropTypes.func,
  };

  static defaultProps = {
    node: null,
    onEditNode: null,
    onDeleteNode: null,
  };

  /** Called when edit button is clicked. */
  onEditNode = () => this.props.onEditNode(this.props.node);

  /** Called when delete button is clicked. */
  onDeleteNode = () => this.props.onDeleteNode(this.props.node);

  /** Render component. */
  render() {
    const { node, onEditNode, onDeleteNode } = this.props;
    return (
      <div>
        {node.label}
        {onEditNode && <button onClick={this.onEditNode}>Edit</button>}
        {onDeleteNode && <button onClick={this.onDeleteNode}>Delete</button>}
      </div>
    );
  }
}
