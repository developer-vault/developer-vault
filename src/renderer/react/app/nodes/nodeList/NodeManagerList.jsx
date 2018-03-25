import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { createSelector } from 'reselect';

import { nodeShape } from 'react/shapes/node';

import NodeManagerListElement from './NodeManagerListElement';
import { memoizedBuildTree } from '../nodes.reselect';

export default class NodeManagerList extends React.PureComponent {
  static propTypes = {
    /** Called when a node is created. */
    onAddNode: PropTypes.func,
    /** Called when a node is edited. */
    // RESELECT
    // eslint-disable-next-line react/no-unused-prop-types
    onEditNode: PropTypes.func,
    // RESELECT
    // eslint-disable-next-line react/no-unused-prop-types
    onDeleteNode: PropTypes.func,
    /** Hashmap of nodes. */
    // RESELECT
    // eslint-disable-next-line react/no-unused-prop-types
    nodeList: PropTypes.objectOf(nodeShape),
  };

  static defaultProps = {
    onAddNode: noop,
    onEditNode: noop,
    onDeleteNode: noop,
    nodeList: {},
  };

  /**
   * Proxies the onAddNode function.
   *
   * This way, the onAddNode from parent component receives a null
   * value instead of the event from the clicked button.
   */
  onAddRootNode = () => this.props.onAddNode(null);

  /**
   * Proxies the onAddNode function.
   *
   * Give the parentId of the clicked node.
   *
   * @param {Object} node - Selected node.
   */
  onAddChildNode = node => this.props.onAddNode(node.id);

  /**
   * Builds the rendering tree of nodes.
   *
   * @param {Object[]} treeElements - An array of nodes.
   * @param {Object} nodeList - Nodes hashmap.
   * @param {func} onAddChildNode - Callback for node creation.
   * @param {func} onEditNode - Callback for node edition.
   * @param {func} onDeleteNode - Callback for node deletion.
   * @returns {Object} - JSX render.
   */
  renderChildren = (treeElements, nodeList, onAddChildNode, onEditNode, onDeleteNode) => (
    <ul>
      {treeElements.map(node => (
        <li key={node.id}>
          <NodeManagerListElement
            node={nodeList[node.id]}
            onAddChildNode={onAddChildNode}
            onEditNode={onEditNode}
            onDeleteNode={onDeleteNode}
          />
          {(node.children || []).length > 0
          && this.renderChildren(
            node.children,
            nodeList,
            onAddChildNode,
            onEditNode,
            onDeleteNode,
          )}
        </li>
      ))}
    </ul>
  );

  /**
   * Wrap renderChildren in a selector.
   */
  renderTree = createSelector(
    props => props.nodeList,
    props => props.onAddNode,
    props => props.onEditNode,
    props => props.onDeleteNode,
    (nodeList, onAddNode, onEditNode, onDeleteNode) => {
      const tree = memoizedBuildTree(nodeList);
      return this.renderChildren(tree, nodeList, this.onAddChildNode, onEditNode, onDeleteNode);
    },
  );

  /** Render component. */
  render() {
    return (
      <React.Fragment>
        <h1>List</h1>
        {this.renderTree(this.props)}
        <button onClick={this.onAddRootNode}>Add</button>
      </React.Fragment>
    );
  }
}
