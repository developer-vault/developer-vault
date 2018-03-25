import React from 'react';
import PropTypes from 'prop-types';
import { nodeShape } from 'react/shapes/node';

export default class NodeManagerListElement extends React.PureComponent {
  static propTypes = {
    /** Current node. */
    node: nodeShape,
    /** Called when edit button is clicked. */
    onAddChildNode: PropTypes.func,
    /** Called when edit button is clicked. */
    onEditNode: PropTypes.func,
    /** Called when delete button is clicked. */
    onDeleteNode: PropTypes.func,
  };

  static defaultProps = {
    node: null,
    onAddChildNode: null,
    onEditNode: null,
    onDeleteNode: null,
  };

  /** Called when edit button is clicked. */
  onAddChildNode = () => this.props.onAddChildNode(this.props.node);

  /** Called when edit button is clicked. */
  onEditNode = () => this.props.onEditNode(this.props.node);

  /** Called when delete button is clicked. */
  onDeleteNode = () => this.props.onDeleteNode(this.props.node);

  /** Render component. */
  render() {
    const {
      node,
      onAddChildNode,
      onEditNode,
      onDeleteNode,
    } = this.props;
    return (
      <div>
        {node.label}
        {onAddChildNode && <button onClick={this.onAddChildNode}>AddChild</button>}
        {onEditNode && <button onClick={this.onEditNode}>Edit</button>}
        {onDeleteNode && <button onClick={this.onDeleteNode}>Delete</button>}
      </div>
    );
  }
}
